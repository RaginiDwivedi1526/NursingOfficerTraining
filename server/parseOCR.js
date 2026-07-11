const fs = require('fs');
const path = require('path');
const Test = require('./models/Test');

function parseQuestionsFile(filePath) {
  if (!fs.existsSync(filePath)) return [];
  
  const content = fs.readFileSync(filePath, 'utf8');
  const questions = [];
  
  // Split by the big QUESTION X headers
  const questionChunks = content.split(/#{10,}\s*QUESTION\s+\d+\s*#{10,}/i);
  console.log(`[DEBUG] File ${filePath} has ${questionChunks.length - 1} question chunks`);
  
  for (let i = 1; i < questionChunks.length; i++) {
    const chunk = questionChunks[i].trim();
    if (!chunk) continue;
    
    // Split the chunk into images
    const imageBlocks = chunk.split(/---\s*(?:\(?source\s+)?image\s+\d+\)?\s*---/i).filter(b => b.trim());
    if (imageBlocks.length === 0) continue;
    
    // The first image block is ALWAYS the question
    const questionBlock = imageBlocks[0].trim();
    let currentQuestion = { questionText: '', options: [], correctAnswer: -1, explanation: '', topic: 'Mental Health (Psychiatric) Nursing' };
    
    const qLines = questionBlock.split('\n').map(l => l.trim()).filter(l => l);
    let qText = [];
    let inOptions = false;
    
    for (const line of qLines) {
      const optionMatch = line.match(/^[O©vVYXx\[\]]\s*(\d+)\.\s*(.*)/);
      if (optionMatch) {
        inOptions = true;
        currentQuestion.options.push(optionMatch[2].replace(/\s*\(\d+%\)$/, '').trim());
        if (line.startsWith('Y') || line.startsWith('©') || line.includes('©')) {
          currentQuestion.correctAnswer = parseInt(optionMatch[1]) - 1;
        }
      } else if (!inOptions) {
        if (!line.match(/^[#=\[\]]+$/) && !line.match(/^NEW NOTES/i) && !line.match(/^#+$/)) {
          qText.push(line);
        }
      } else {
        currentQuestion.options[currentQuestion.options.length - 1] += ' ' + line.replace(/\s*\(\d+%\)$/, '').trim();
      }
    }
    currentQuestion.questionText = qText.join(' ');
    
    // The rest of the image blocks form the explanation
    if (imageBlocks.length > 1) {
      currentQuestion.explanation = imageBlocks.slice(1).join('\n\n').trim();
      
      // Try to find the correct answer in the explanation blocks
      if (currentQuestion.correctAnswer === -1) {
        const expLines = currentQuestion.explanation.split('\n');
        for (const line of expLines) {
          if (line.match(/^[Y©vV]\s*(\d+)\./)) {
            const match = line.match(/^[Y©vV]\s*(\d+)\./);
            currentQuestion.correctAnswer = parseInt(match[1]) - 1;
            break;
          }
        }
      }
    }
    
    if (currentQuestion.questionText && currentQuestion.options.length > 0) {
      questions.push(currentQuestion);
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
    
    // Dump to debug.json for inspection
    const debugOutput = allQuestions.filter(q => q.questionText.length > 500).map(q => q.questionText);
    fs.writeFileSync(path.join(__dirname, 'debug.json'), JSON.stringify(debugOutput, null, 2));
    
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
