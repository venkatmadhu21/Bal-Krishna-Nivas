const mongoose = require('mongoose');
const FamilyMember = require('../models/FamilyMember');

// MongoDB connection
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/bal-krishna-nivas';
    console.log('Connecting to MongoDB at:', mongoURI);
    
    await mongoose.connect(mongoURI);
    console.log('MongoDB Connected Successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

const fixFamilyData = async () => {
  try {
    await connectDB();
    
    console.log('Adding missing family members...\n');
    
    // Missing spouses and family members to add
    const missingMembers = [
      // Missing spouses
      {
        name: "Wife Of Balwant R Gogte",
        vansh: "061MW",
        gender: "Female",
        serNo: 4,
        sonDaughterCount: 1,
        spouse: { name: "Balwant R Gogte", serNo: 3 },
        fatherSerNo: null,
        motherSerNo: null,
        childrenSerNos: [9],
        level: 2
      },
      {
        name: "Wife Of Ganesh R Gogte",
        vansh: "061MW",
        gender: "Female",
        serNo: 6,
        sonDaughterCount: 1,
        spouse: { name: "Ganesh R Gogte", serNo: 5 },
        fatherSerNo: null,
        motherSerNo: null,
        childrenSerNos: [11],
        level: 2
      },
      {
        name: "Wife Of Hari R Gogte",
        vansh: "061MW",
        gender: "Female",
        serNo: 8,
        sonDaughterCount: 3,
        spouse: { name: "Hari R Gogte", serNo: 7 },
        fatherSerNo: null,
        motherSerNo: null,
        childrenSerNos: [13, 15, 17],
        level: 2
      },
      // Missing children
      {
        name: "Son Of Balwant R Gogte",
        vansh: "061MH",
        gender: "Male",
        serNo: 9,
        sonDaughterCount: 0,
        spouse: { name: "Wife Of Son Of Balwant R Gogte", serNo: 10 },
        fatherSerNo: 3,
        motherSerNo: 4,
        childrenSerNos: [],
        level: 3
      },
      {
        name: "Wife Of Son Of Balwant R Gogte",
        vansh: "061MW",
        gender: "Female",
        serNo: 10,
        sonDaughterCount: 0,
        spouse: { name: "Son Of Balwant R Gogte", serNo: 9 },
        fatherSerNo: null,
        motherSerNo: null,
        childrenSerNos: [],
        level: 3
      },
      {
        name: "Son Of Ganesh R Gogte",
        vansh: "061MH",
        gender: "Male",
        serNo: 11,
        sonDaughterCount: 0,
        spouse: { name: "Wife Of Son Of Ganesh R Gogte", serNo: 12 },
        fatherSerNo: 5,
        motherSerNo: 6,
        childrenSerNos: [],
        level: 3
      },
      {
        name: "Wife Of Son Of Ganesh R Gogte",
        vansh: "061MW",
        gender: "Female",
        serNo: 12,
        sonDaughterCount: 0,
        spouse: { name: "Son Of Ganesh R Gogte", serNo: 11 },
        fatherSerNo: null,
        motherSerNo: null,
        childrenSerNos: [],
        level: 3
      },
      // Missing spouse records for level 3
      {
        name: "Wife Of Pandurang H Gogte",
        vansh: "061MW",
        gender: "Female",
        serNo: 14,
        sonDaughterCount: 0,
        spouse: { name: "Pandurang H Gogte", serNo: 13 },
        fatherSerNo: null,
        motherSerNo: null,
        childrenSerNos: [],
        level: 3
      },
      {
        name: "Wife Of Bhagwan H Gogte",
        vansh: "061MW",
        gender: "Female",
        serNo: 16,
        sonDaughterCount: 4,
        spouse: { name: "Bhagwan H Gogte", serNo: 15 },
        fatherSerNo: null,
        motherSerNo: null,
        childrenSerNos: [19, 21, 23, 25],
        level: 3
      },
      {
        name: "Husband of Vijaya H Gogte",
        vansh: "061MH",
        gender: "Male",
        serNo: 18,
        sonDaughterCount: 3,
        spouse: { name: "Vijaya H Gogte", serNo: 17 },
        fatherSerNo: null,
        motherSerNo: null,
        childrenSerNos: [27, 29, 31],
        level: 3
      },
      // Missing spouse records for level 4
      {
        name: "Husband Of Vishaka V Marathe",
        vansh: "061MH",
        gender: "Male",
        serNo: 20,
        sonDaughterCount: 1,
        spouse: { name: "Vishaka V Marathe", serNo: 19 },
        fatherSerNo: null,
        motherSerNo: null,
        childrenSerNos: [],
        level: 4
      },
      {
        name: "Wife Of Girish B Gogte",
        vansh: "061MW",
        gender: "Female",
        serNo: 22,
        sonDaughterCount: 2,
        spouse: { name: "Girish B Gogte", serNo: 21 },
        fatherSerNo: null,
        motherSerNo: null,
        childrenSerNos: [],
        level: 4
      },
      {
        name: "Wife Of Vishwanath B Gogte",
        vansh: "061MW",
        gender: "Female",
        serNo: 24,
        sonDaughterCount: 2,
        spouse: { name: "Vishwanath B Gogte", serNo: 23 },
        fatherSerNo: null,
        motherSerNo: null,
        childrenSerNos: [],
        level: 4
      },
      {
        name: "Wife Of Umesh B Gogte",
        vansh: "061MW",
        gender: "Female",
        serNo: 26,
        sonDaughterCount: 3,
        spouse: { name: "Umesh B Gogte", serNo: 25 },
        fatherSerNo: null,
        motherSerNo: null,
        childrenSerNos: [],
        level: 4
      },
      {
        name: "Husband Of Sharad D Godbole",
        vansh: "061MH",
        gender: "Male",
        serNo: 28,
        sonDaughterCount: 0,
        spouse: { name: "Vaijayanthi M Sathe", serNo: 27 },
        fatherSerNo: null,
        motherSerNo: null,
        childrenSerNos: [],
        level: 4
      },
      {
        name: "Wife Of Sharad D Godbole",
        vansh: "061MW",
        gender: "Female",
        serNo: 30,
        sonDaughterCount: 1,
        spouse: { name: "Sharad D Godbole", serNo: 29 },
        fatherSerNo: null,
        motherSerNo: null,
        childrenSerNos: [],
        level: 4
      },
      {
        name: "Wife Of Hemant D Godbole",
        vansh: "061MW",
        gender: "Female",
        serNo: 32,
        sonDaughterCount: 1,
        spouse: { name: "Hemant D Godbole", serNo: 31 },
        fatherSerNo: null,
        motherSerNo: null,
        childrenSerNos: [],
        level: 4
      }
    ];
    
    // Add missing members
    for (const memberData of missingMembers) {
      try {
        // Check if member already exists
        const existingMember = await FamilyMember.findOne({ serNo: memberData.serNo });
        if (existingMember) {
          console.log(`Member ${memberData.name} (${memberData.serNo}) already exists, skipping...`);
          continue;
        }
        
        const newMember = new FamilyMember(memberData);
        await newMember.save();
        console.log(`✓ Added: ${memberData.name} (${memberData.serNo})`);
      } catch (error) {
        console.error(`✗ Failed to add ${memberData.name} (${memberData.serNo}):`, error.message);
      }
    }
    
    // Fix spouse reference for Sharad D Godbole (should reference serNo 30, not 20)
    console.log('\nFixing spouse references...');
    await FamilyMember.findOneAndUpdate(
      { serNo: 29 },
      { $set: { 'spouse.serNo': 30 } }
    );
    console.log('✓ Fixed Sharad D Godbole spouse reference');
    
    // Verify the fixes
    console.log('\n=== VERIFICATION ===');
    const allMembers = await FamilyMember.find().sort({ serNo: 1 });
    console.log(`Total family members after fixes: ${allMembers.length}`);
    
    const existingSerNos = new Set(allMembers.map(m => m.serNo));
    console.log('All SerNos:', Array.from(existingSerNos).sort((a, b) => a - b));
    
    // Check if all references are now valid
    let missingReferences = 0;
    for (const member of allMembers) {
      if (member.spouse && member.spouse.serNo && !existingSerNos.has(member.spouse.serNo)) {
        console.log(`Still missing spouse: ${member.name} (${member.serNo}) -> ${member.spouse.serNo}`);
        missingReferences++;
      }
      if (member.childrenSerNos) {
        for (const childSerNo of member.childrenSerNos) {
          if (!existingSerNos.has(childSerNo)) {
            console.log(`Still missing child: ${member.name} (${member.serNo}) -> ${childSerNo}`);
            missingReferences++;
          }
        }
      }
    }
    
    if (missingReferences === 0) {
      console.log('✓ All references are now valid!');
    } else {
      console.log(`✗ Still have ${missingReferences} missing references`);
    }
    
  } catch (error) {
    console.error('Error fixing family data:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\nDatabase connection closed');
  }
};

fixFamilyData();