const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const SALT_WORK_FACTOR = 10;

const userSchema = new Schema({
  // Required
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastVisited: {
    type: Date,
    default: Date.now
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  birthday: {
    type: Date
  },
  email: {
    type: String
  },
  slackUrl: {
    type: String,
    default: ''
  },
  promUrl: {
    type: String,
    default: ''
  },
  settings: {
    colorMode: {
      type: String,
      default: 'light'
    },
    language: {
      type: String,
      default: 'English'
    }
  },
  oAuthProvider: {
    type: String,
    default: 'none'
  }
});

// Pre-save hook to encrypt password using bcrypt.hash() 
userSchema.pre("save", async function (next) {
  try {
    // Only hash the password if it has been modified (or is new)
    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
