const express = require('express');
const FamilyMember = require('../models/FamilyMember');
const auth = require('../middleware/auth');
const { body, validationResult } = require('express-validator');

const router = express.Router();

// @route   GET api/family
// @desc    Get all family members
// @access  Public (temporarily for testing)
router.get('/', async (req, res) => {
  try {
    const familyMembers = await FamilyMember.find()
      .sort({ level: 1, serNo: 1 });
    
    res.json(familyMembers);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/family/member/:serNo
// @desc    Get family member by serial number
// @access  Public (temporarily for testing)
router.get('/member/:serNo', async (req, res) => {
  try {
    const serNo = parseInt(req.params.serNo);
    const familyMember = await FamilyMember.findOne({ serNo });

    if (!familyMember) {
      return res.status(404).json({ message: 'Family member not found' });
    }

    res.json(familyMember);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/family/member/:serNo/children
// @desc    Get all children of a family member
// @access  Public (temporarily for testing)
router.get('/member/:serNo/children', async (req, res) => {
  try {
    const serNo = parseInt(req.params.serNo);
    const familyMember = await FamilyMember.findOne({ serNo });

    if (!familyMember) {
      return res.status(404).json({ message: 'Family member not found' });
    }

    const children = await FamilyMember.find({ 
      serNo: { $in: familyMember.childrenSerNos } 
    });

    res.json(children);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/family/member/:serNo/parents
// @desc    Get parents of a family member
// @access  Public (temporarily for testing)
router.get('/member/:serNo/parents', async (req, res) => {
  try {
    const serNo = parseInt(req.params.serNo);
    const familyMember = await FamilyMember.findOne({ serNo });

    if (!familyMember) {
      return res.status(404).json({ message: 'Family member not found' });
    }

    const father = await FamilyMember.findOne({ serNo: familyMember.fatherSerNo });
    const mother = await FamilyMember.findOne({ serNo: familyMember.motherSerNo });

    const parents = {
      father: father || null,
      mother: mother || null
    };

    res.json(parents);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/family/tree/:serNo
// @desc    Get full descendant tree of a family member
// @access  Public (temporarily for testing)
router.get('/tree/:serNo', async (req, res) => {
  try {
    const serNo = parseInt(req.params.serNo);
    console.log(`Fetching family tree for serNo: ${serNo}`);
    
    const rootMember = await FamilyMember.findOne({ serNo });

    if (!rootMember) {
      console.log(`Family member with serNo ${serNo} not found`);
      return res.status(404).json({ message: 'Family member not found' });
    }
    
    console.log(`Found root member: ${rootMember.name} (${rootMember.serNo})`);
    console.log(`Children SerNos: ${rootMember.childrenSerNos.join(', ')}`);

    // Recursive function to build the family tree
    async function buildFamilyTree(member) {
      if (!member.childrenSerNos || member.childrenSerNos.length === 0) {
        console.log(`Member ${member.name} (${member.serNo}) has no children`);
        return [];
      }
      
      console.log(`Finding children for ${member.name} (${member.serNo}): ${member.childrenSerNos.join(', ')}`);
      
      const children = await FamilyMember.find({ 
        serNo: { $in: member.childrenSerNos } 
      }).sort({ serNo: 1 });
      
      console.log(`Found ${children.length} children for ${member.name} (${member.serNo})`);

      const childrenWithDescendants = [];
      for (const child of children) {
        console.log(`Processing child: ${child.name} (${child.serNo})`);
        const childWithDescendants = child.toObject();
        childWithDescendants.children = await buildFamilyTree(child);
        childrenWithDescendants.push(childWithDescendants);
      }

      return childrenWithDescendants;
    }

    const rootWithDescendants = rootMember.toObject();
    rootWithDescendants.children = await buildFamilyTree(rootMember);
    
    console.log(`Returning family tree with root: ${rootWithDescendants.name} (${rootWithDescendants.serNo})`);
    console.log(`Root has ${rootWithDescendants.children.length} immediate children`);

    res.json(rootWithDescendants);
  } catch (error) {
    console.error('Error building family tree:', error);
    res.status(500).send('Server error');
  }
});

// @route   GET api/family/members
// @desc    Get family members by level
// @access  Public (temporarily for testing)
router.get('/members', async (req, res) => {
  try {
    const { level } = req.query;
    
    let query = {};
    if (level) {
      query.level = parseInt(level);
    }
    
    const familyMembers = await FamilyMember.find(query)
      .sort({ serNo: 1 });
    
    res.json(familyMembers);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/family/raw-data
// @desc    Get all family members with their raw data structure
// @access  Public (temporarily for testing)
router.get('/raw-data', async (req, res) => {
  try {
    console.log('Fetching raw family data from database');
    
    const familyMembers = await FamilyMember.find()
      .sort({ serNo: 1 });
    
    console.log(`Found ${familyMembers.length} family members`);
    
    // Log a sample of the data
    if (familyMembers.length > 0) {
      const sample = familyMembers[0].toObject();
      console.log('Sample data structure:', JSON.stringify(sample, null, 2));
    }
    
    res.json(familyMembers);
  } catch (error) {
    console.error('Error fetching raw data:', error);
    res.status(500).send('Server error');
  }
});

// @route   POST api/family
// @desc    Add family member
// @access  Public (temporarily for testing)
router.post('/', [
  body('name', 'Name is required').notEmpty(),
  body('gender', 'Gender is required').isIn(['Male', 'Female']),
  body('serNo', 'Serial number is required').isNumeric(),
  body('level', 'Level is required').isNumeric()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const {
      name,
      vansh,
      gender,
      serNo,
      sonDaughterCount,
      spouse,
      fatherSerNo,
      motherSerNo,
      childrenSerNos,
      level,
      dateOfBirth,
      dateOfDeath,
      profilePicture,
      occupation,
      biography,
      achievements,
      address
    } = req.body;

    // Check if serNo already exists
    const existingMember = await FamilyMember.findOne({ serNo });
    if (existingMember) {
      return res.status(400).json({ message: 'Serial number already exists' });
    }

    const familyMember = new FamilyMember({
      name,
      vansh,
      gender,
      serNo,
      sonDaughterCount: sonDaughterCount || 0,
      spouse,
      fatherSerNo,
      motherSerNo,
      childrenSerNos: childrenSerNos || [],
      level,
      dateOfBirth,
      dateOfDeath,
      profilePicture,
      occupation,
      biography,
      achievements,
      address
    });

    await familyMember.save();

    // Update parent's children array if parents exist
    if (fatherSerNo) {
      await FamilyMember.findOneAndUpdate(
        { serNo: fatherSerNo },
        { $addToSet: { childrenSerNos: serNo } }
      );
    }
    if (motherSerNo) {
      await FamilyMember.findOneAndUpdate(
        { serNo: motherSerNo },
        { $addToSet: { childrenSerNos: serNo } }
      );
    }

    res.json(familyMember);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT api/family/member/:serNo
// @desc    Update family member
// @access  Public (temporarily for testing)
router.put('/member/:serNo', async (req, res) => {
  try {
    const serNo = parseInt(req.params.serNo);
    const familyMember = await FamilyMember.findOneAndUpdate(
      { serNo },
      { $set: req.body },
      { new: true }
    );

    if (!familyMember) {
      return res.status(404).json({ message: 'Family member not found' });
    }

    res.json(familyMember);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route   DELETE api/family/member/:serNo
// @desc    Delete family member
// @access  Public (temporarily for testing)
router.delete('/member/:serNo', async (req, res) => {
  try {
    const serNo = parseInt(req.params.serNo);
    const familyMember = await FamilyMember.findOne({ serNo });

    if (!familyMember) {
      return res.status(404).json({ message: 'Family member not found' });
    }

    // Remove from parent's children array
    if (familyMember.fatherSerNo) {
      await FamilyMember.findOneAndUpdate(
        { serNo: familyMember.fatherSerNo },
        { $pull: { childrenSerNos: serNo } }
      );
    }
    if (familyMember.motherSerNo) {
      await FamilyMember.findOneAndUpdate(
        { serNo: familyMember.motherSerNo },
        { $pull: { childrenSerNos: serNo } }
      );
    }

    await FamilyMember.findOneAndDelete({ serNo });

    res.json({ message: 'Family member deleted' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;