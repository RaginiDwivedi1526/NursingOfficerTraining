const express = require('express');
const { protect } = require('../middleware/auth');
const { chat } = require('../services/openaiService');
const TestResult = require('../models/TestResult');
const Test = require('../models/Test');
const router = express.Router();

// POST /api/ai/ask — Explain a specific MCQ question
router.post('/ask', protect, async (req, res) => {
  try {
    const { questionText, options, correctAnswer, userQuery } = req.body;

    const prompt = `Nursing exam MCQ: ${questionText}
Options: ${options?.map((o, i) => `${String.fromCharCode(65 + i)}) ${o}`).join(', ')}
Correct answer: ${String.fromCharCode(65 + correctAnswer)}
Student asks: ${userQuery || 'Why is this the correct answer?'}
Give a clear educational explanation in 3–4 sentences.
Start by affirming the correct answer. Use simple English. End with a memory tip.`;

    const answer = await chat([{ role: 'user', content: prompt }], 300);
    res.json({ answer });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/ai/chat — General doubt solver chat
router.post('/chat', protect, async (req, res) => {
  try {
    const { messages } = req.body;

    const systemMsg = {
      role: 'system',
      content: `You are an expert nursing exam tutor for Indian nursing officer (NORCET, AIIMS, ESIC, RRB) and NCLEX exams.
Answer in clear, simple English. Use examples when helpful.
Keep answers under 120 words unless asked for more.
Be warm, encouraging, and exam-focused.`
    };

    const allMessages = [systemMsg, ...messages.slice(-10)]; // keep last 10 for context
    const reply = await chat(allMessages, 400);
    res.json({ reply });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
