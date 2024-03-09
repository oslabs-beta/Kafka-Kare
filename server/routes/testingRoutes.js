const express = require("express");
const router = express.Router();
const User = require("../models/userModel.js");

// Route for getting all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length === 0) return res.status(200).json({ message: 'no users have signed up' })
    else if (users.length > 0) return res.status(200).json(users);
  } catch (err) {
    console.error('Error fetching users from MongoDB: ', err);
    return res.status(500).send('Failed to fetch all users');
  }
})

module.exports = router;