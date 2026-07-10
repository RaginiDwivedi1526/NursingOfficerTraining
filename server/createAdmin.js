const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const makeAdmin = async () => {
  try {
    const emailToUpgrade = process.argv[2];
    
    if (!emailToUpgrade) {
      console.log('Please provide an email address. Example: node createAdmin.js your@email.com');
      process.exit(1);
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to DB');

    const user = await User.findOne({ email: emailToUpgrade });
    
    if (!user) {
      console.log(`User with email ${emailToUpgrade} not found! Please register on the website first.`);
      process.exit(1);
    }

    user.role = 'admin';
    await user.save();
    
    console.log(`✅ Success! ${emailToUpgrade} is now an Admin.`);
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

makeAdmin();
