const { chat } = require('./services/openaiService');
require('dotenv').config();

(async () => {
  try {
    console.log("Testing chat...");
    const res = await chat([{ role: 'user', content: 'Say hello in JSON { "msg": "hello" }' }], 4000);
    console.log("Response:", res);
  } catch (err) {
    console.error("Error:", err);
  }
})();
