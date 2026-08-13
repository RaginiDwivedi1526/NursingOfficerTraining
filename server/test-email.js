require('dotenv').config();
const sendEmail = require('./utils/sendEmail');

async function test() {
  try {
    await sendEmail({
      email: 'raginidwivedi050@gmail.com',
      subject: 'Test Email',
      message: 'This is a test'
    });
    console.log('SUCCESS');
  } catch (err) {
    console.log('ERROR:', err);
  }
}
test();
