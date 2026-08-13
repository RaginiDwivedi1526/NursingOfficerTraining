/**
 * One-time migration: strip [Topic Name] bracket prefixes and other
 * AI-generated prefixes from all existing question texts in MongoDB.
 *
 * Run with:  node cleanQuestionPrefixes.js
 */

require('dotenv').config();
const mongoose = require('mongoose');
const Test = require('./models/Test');

const stripQuestionPrefix = (text) => {
  if (!text) return text;
  let cleaned = text.trim();

  // Remove [Any Topic Name] bracket prefix at the start
  cleaned = cleaned.replace(/^\[[^\]]+\]\s*/i, '');

  // Remove plain topic prefix followed by : or - e.g. "Emergency Nursing: ..."
  cleaned = cleaned.replace(/^[A-Za-z &()/-]{3,60}\s*[-–:]\s+(?=[A-Z])/, '');

  // Remove Q-number prefixes: "Q1.", "Q1:", "Question 1.", "1.", "1)"
  cleaned = cleaned.replace(/^(Question\s*\d+|Q\s*\d+)[.:\s]+/i, '');
  cleaned = cleaned.replace(/^\d+[.):]\s+/, '');

  return cleaned.trim();
};

async function main() {
  await mongoose.connect(process.env.MONGODB_URI || process.env.MONGO_URI);
  console.log('✅ Connected to MongoDB');

  const tests = await Test.find({});
  console.log(`📦 Found ${tests.length} tests to process...`);

  let totalFixed = 0;

  for (const test of tests) {
    let modified = false;

    for (const q of test.questions) {
      const original = q.questionText;
      const cleaned = stripQuestionPrefix(original);

      if (cleaned !== original) {
        console.log(`  ✂️  [${test.topic}] "${original.substring(0, 80)}"  →  "${cleaned.substring(0, 60)}"`);
        q.questionText = cleaned;
        modified = true;
        totalFixed++;
      }
    }

    if (modified) {
      await test.save();
    }
  }

  console.log(`\n✅ Done! Cleaned ${totalFixed} questions across ${tests.length} tests.`);
  await mongoose.disconnect();
}

main().catch(err => {
  console.error('❌ Error:', err);
  process.exit(1);
});
