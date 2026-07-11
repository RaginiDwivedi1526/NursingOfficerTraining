const fs = require('fs');
const path = require('path');
const Test = require('./models/Test');

function parseQuestionsFile(filePath) {
  if (!fs.existsSync(filePath)) return [];
  
  const content = fs.readFileSync(filePath, 'utf8');
  const blocks = content.split(/---\s*(?:\(?source\s+)?image\s+\d+\)?\s*---/i);
  
  const questions = [];
  let currentQuestion = null;
  
  for (let i = 1; i < blocks.length; i++) {
    const block = blocks[i].trim();
    if (!block) continue;
    
    const isQuestionBlock = block.match(/^[O©vVYXx\[\]]\s*\d+\./m) && !block.includes('Educational objective:');
    const isExplanationBlock = block.includes('Educational objective:') || block.includes('Explanation');
    
    if (isQuestionBlock && !isExplanationBlock) {
      currentQuestion = { questionText: '', options: [], correctAnswer: -1, explanation: '', topic: 'Mental Health (Psychiatric) Nursing' };
      const lines = block.split('\n').map(l => l.trim()).filter(l => l);
      let qText = [];
      let inOptions = false;
      
      for (const line of lines) {
        const optionMatch = line.match(/^[O©vVYXx\[\]]\s*(\d+)\.\s*(.*)/);
        if (optionMatch) {
          inOptions = true;
          currentQuestion.options.push(optionMatch[2].replace(/\s*\(\d+%\)$/, '').trim());
          if (line.match(/^[©vVY]/)) {
            currentQuestion.correctAnswer = parseInt(optionMatch[1]) - 1;
          }
        } else if (!inOptions) {
          qText.push(line);
        } else {
          currentQuestion.options[currentQuestion.options.length - 1] += ' ' + line.replace(/\s*\(\d+%\)$/, '').trim();
        }
      }
      currentQuestion.questionText = qText.join(' ');
      questions.push(currentQuestion);
    } else if (isExplanationBlock && currentQuestion) {
      currentQuestion.explanation = block;
      const lines = block.split('\n').map(l => l.trim()).filter(l => l);
      for (const line of lines) {
        const optionMatch = line.match(/^[©vVY]\s*(\d+)\./);
        if (optionMatch) {
          currentQuestion.correctAnswer = parseInt(optionMatch[1]) - 1;
        }
      }
    }
  }
  
  // Return all correctly parsed questions
  return questions.filter(q => q.questionText && q.options.length > 0);
}

async function parseAndSeed() {
  try {
    const file1 = path.join(__dirname, '../PSYCHIATRY_UWorld_Questions_001-100.txt');
    const file2 = path.join(__dirname, '../PSYCHIATRY_UWorld_Questions_101-142.txt');
    
    const questions1 = parseQuestionsFile(file1);
    const questions2 = parseQuestionsFile(file2);
    const allQuestions = [...questions1, ...questions2];
    
    console.log(`[PARSE] Extracted ${allQuestions.length} total questions from both files`);
    
    const mock1Questions = allQuestions.slice(0, 100);
    const mock2Questions = allQuestions.slice(100);
    
    // Clear old versions
    await Test.deleteMany({ title: /AIIMS NORCET - Psychiatry Mock Test/ });
    
    if (mock1Questions.length > 0) {
      await Test.create({
        title: "AIIMS NORCET - Psychiatry Mock Test 1",
        topic: "AIIMS CRE & NORCET",
        difficulty: "hard",
        duration: mock1Questions.length * 1.5,
        examType: "nursing_officer",
        questions: mock1Questions
      });
      console.log(`✅ Added Mock Test 1 to DB with ${mock1Questions.length} questions!`);
    }
    
    if (mock2Questions.length > 0) {
      await Test.create({
        title: "AIIMS NORCET - Psychiatry Mock Test 2",
        topic: "AIIMS CRE & NORCET",
        difficulty: "hard",
        duration: mock2Questions.length * 1.5,
        examType: "nursing_officer",
        questions: mock2Questions
      });
      console.log(`✅ Added Mock Test 2 to DB with ${mock2Questions.length} questions!`);
    }

    
  } catch (err) {
    console.error('Parse error', err);
  }
}

module.exports = parseAndSeed;
