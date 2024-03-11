const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const SALT_WORK_FACTOR = 10;

const userSchema = new Schema({
  // Required
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  slackUrl: {
    type: String,
  },
  promUrl: {
    type: String,
  }
});

// Pre-save hook to encrypt password using bcrypt.hash() 
userSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
