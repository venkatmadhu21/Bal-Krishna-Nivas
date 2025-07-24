const express = require('express');
const FamilyMember = require('../models/FamilyMember');
const auth = require('../middleware/auth');
const { body, validationResult } = require('express-validator');

const router = express.Router();

// @route   GET api/family
// @desc    Get all family members
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const familyMembers = await FamilyMember.find()
      .populate('father', 'firstName lastName')
      .populate('mother', 'firstName lastName')
      .populate('spouse', 'firstName lastName')
      .populate('children', 'firstName lastName')
      .sort({ generation: 1, createdAt: 1 });
    
    res.json(familyMembers);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/family/:id
// @desc    Get family member by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const familyMember = await FamilyMember.findById(req.params.id)
      .populate('father', 'firstName lastName profilePicture dateOfBirth')
      .populate('mother', 'firstName lastName profilePicture dateOfBirth')
      .populate('spouse', 'firstName lastName profilePicture dateOfBirth')
      .populate('children', 'firstName lastName profilePicture dateOfBirth')
      .populate('siblings', 'firstName lastName profilePicture dateOfBirth');

    if (!familyMember) {
      return res.status(404).json({ message: 'Family member not found' });
    }

    res.json(familyMember);
  } catch (error) {
    console.error(error.message);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Family member not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route   POST api/family
// @desc    Add family member
// @access  Private (Admin only)
router.post('/', [
  auth,
  body('firstName', 'First name is required').notEmpty(),
  body('lastName', 'Last name is required').notEmpty(),
  body('gender', 'Gender is required').isIn(['Male', 'Female']),
  body('generation', 'Generation is required').isNumeric()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const {
      firstName,
      lastName,
      dateOfBirth,
      dateOfDeath,
      gender,
      profilePicture,
      occupation,
      maritalStatus,
      father,
      mother,
      spouse,
      generation,
      biography,
      achievements,
      address
    } = req.body;

    const familyMember = new FamilyMember({
      firstName,
      lastName,
      dateOfBirth,
      dateOfDeath,
      gender,
      profilePicture,
      occupation,
      maritalStatus,
      father,
      mother,
      spouse,
      generation,
      biography,
      achievements,
      address,
      isAlive: !dateOfDeath
    });

    await familyMember.save();

    // Update parent's children array
    if (father) {
      await FamilyMember.findByIdAndUpdate(father, {
        $addToSet: { children: familyMember._id }
      });
    }
    if (mother) {
      await FamilyMember.findByIdAndUpdate(mother, {
        $addToSet: { children: familyMember._id }
      });
    }

    // Update spouse relationship
    if (spouse) {
      await FamilyMember.findByIdAndUpdate(spouse, {
        spouse: familyMember._id
      });
    }

    // Update siblings
    if (father || mother) {
      const siblings = await FamilyMember.find({
        $and: [
          { _id: { $ne: familyMember._id } },
          {
            $or: [
              { father: father },
              { mother: mother }
            ]
          }
        ]
      });

      const siblingIds = siblings.map(s => s._id);
      
      // Add siblings to new member
      familyMember.siblings = siblingIds;
      await familyMember.save();

      // Add new member to siblings
      await FamilyMember.updateMany(
        { _id: { $in: siblingIds } },
        { $addToSet: { siblings: familyMember._id } }
      );
    }

    const populatedMember = await FamilyMember.findById(familyMember._id)
      .populate('father', 'firstName lastName')
      .populate('mother', 'firstName lastName')
      .populate('spouse', 'firstName lastName');

    res.json(populatedMember);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT api/family/:id
// @desc    Update family member
// @access  Private (Admin only)
router.put('/:id', auth, async (req, res) => {
  try {
    const familyMember = await FamilyMember.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    ).populate('father', 'firstName lastName')
     .populate('mother', 'firstName lastName')
     .populate('spouse', 'firstName lastName');

    if (!familyMember) {
      return res.status(404).json({ message: 'Family member not found' });
    }

    res.json(familyMember);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route   DELETE api/family/:id
// @desc    Delete family member
// @access  Private (Admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const familyMember = await FamilyMember.findById(req.params.id);

    if (!familyMember) {
      return res.status(404).json({ message: 'Family member not found' });
    }

    // Remove from related members
    await FamilyMember.updateMany(
      { children: req.params.id },
      { $pull: { children: req.params.id } }
    );

    await FamilyMember.updateMany(
      { siblings: req.params.id },
      { $pull: { siblings: req.params.id } }
    );

    await FamilyMember.updateOne(
      { spouse: req.params.id },
      { $unset: { spouse: 1 } }
    );

    await FamilyMember.findByIdAndDelete(req.params.id);

    res.json({ message: 'Family member deleted' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/family/tree/generations
// @desc    Get family tree organized by generations
// @access  Private
router.get('/tree/generations', auth, async (req, res) => {
  try {
    const familyMembers = await FamilyMember.find()
      .populate('father', 'firstName lastName')
      .populate('mother', 'firstName lastName')
      .populate('spouse', 'firstName lastName')
      .populate('children', 'firstName lastName')
      .sort({ generation: 1, firstName: 1 });

    // Group by generation
    const generationMap = {};
    familyMembers.forEach(member => {
      if (!generationMap[member.generation]) {
        generationMap[member.generation] = [];
      }
      generationMap[member.generation].push(member);
    });

    res.json(generationMap);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;