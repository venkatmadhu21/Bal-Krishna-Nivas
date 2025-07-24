const mongoose = require('mongoose');

const FamilyMemberSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  dateOfBirth: {
    type: Date
  },
  dateOfDeath: {
    type: Date
  },
  gender: {
    type: String,
    enum: ['Male', 'Female'],
    required: true
  },
  profilePicture: {
    type: String,
    default: ''
  },
  occupation: {
    type: String,
    trim: true
  },
  maritalStatus: {
    type: String,
    enum: ['Single', 'Married', 'Divorced', 'Widowed'],
    default: 'Single'
  },
  spouse: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FamilyMember'
  },
  father: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FamilyMember'
  },
  mother: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FamilyMember'
  },
  children: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FamilyMember'
  }],
  siblings: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FamilyMember'
  }],
  generation: {
    type: Number,
    required: true,
    default: 1
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  isAlive: {
    type: Boolean,
    default: true
  },
  biography: {
    type: String,
    maxlength: 1000
  },
  achievements: [{
    title: String,
    description: String,
    date: Date
  }],
  address: {
    street: String,
    city: String,
    state: String,
    pincode: String,
    country: { type: String, default: 'India' }
  }
}, {
  timestamps: true
});

// Index for better query performance
FamilyMemberSchema.index({ generation: 1 });
FamilyMemberSchema.index({ father: 1, mother: 1 });

module.exports = mongoose.model('FamilyMember', FamilyMemberSchema);