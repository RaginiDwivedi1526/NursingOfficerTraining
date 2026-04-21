const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Test = require('./models/Test');

dotenv.config();

const checkTests = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to DB');
    const tests = await Test.find({}, '_id title');
    console.log(`Found ${tests.length} tests:`);
    tests.forEach(t => console.log(`ID: ${t._id} | Title: ${t.title}`));
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

checkTests();
