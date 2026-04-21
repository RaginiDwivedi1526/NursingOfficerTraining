const OpenAI = require('openai');

const getAIAnalysis = async (performanceData) => {
  // If no API key, return a mock analysis
  if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your_openai_api_key_here') {
    return generateMockAnalysis(performanceData);
  }

  try {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const prompt = `You are an expert nursing exam preparation coach. Analyze the following student performance data and provide actionable improvement suggestions.

Student Performance Data:
- Overall Score: ${performanceData.overallScore}%
- Total Tests Attempted: ${performanceData.totalTests}
- Topic-wise Performance:
${performanceData.topicPerformance.map(t => `  - ${t.topic}: ${t.accuracy}% (${t.correctAnswers}/${t.totalQuestions} correct)`).join('\n')}
- Weekly Score Trend: ${performanceData.weeklyScores.map(w => `Week ${w.week}: ${w.score}%`).join(', ')}

Please respond in this exact JSON format:
{
  "aiSuggestion": "A 2-3 sentence personalized summary of their performance and main areas to focus on",
  "strongTopics": ["topic1", "topic2"],
  "weakTopics": ["topic1", "topic2"],
  "improvementTips": ["tip1", "tip2", "tip3", "tip4"],
  "recommendedTests": [
    { "topic": "topic_name", "difficulty": "easy/medium/hard", "reason": "why this test" }
  ],
  "studyPlan": {
    "daily": [
      { "topic": "topic_name", "action": "what to do", "duration": "time" }
    ],
    "weekly": [
      { "week": 1, "focus": "focus area", "targets": "what to achieve" }
    ]
  }
}`;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 1000
    });

    const content = response.choices[0].message.content;
    return JSON.parse(content);
  } catch (error) {
    console.error('OpenAI API Error:', error.message);
    return generateMockAnalysis(performanceData);
  }
};

// Fallback mock analysis when no API key
const generateMockAnalysis = (data) => {
  const weak = data.topicPerformance
    .filter(t => t.accuracy < 60)
    .map(t => t.topic);
  const strong = data.topicPerformance
    .filter(t => t.accuracy >= 70)
    .map(t => t.topic);

  const mainWeak = weak[0] || 'General Nursing';

  return {
    aiSuggestion: `You are ${weak.length > 0 ? 'weak' : 'performing well'} in ${weak.join(', ') || 'no specific area'}. ${weak.length > 0 ? `Focus on ${mainWeak}, especially core concepts. Revise key chapters and attempt 20 MCQs daily for the next 7 days.` : 'Keep up the good work and maintain consistency.'}`,
    strongTopics: strong,
    weakTopics: weak,
    improvementTips: [
      `Revise Topic: ${mainWeak}`,
      'Practice: 20 MCQs daily on weak areas',
      'Watch: Related recorded lectures',
      'Take: Topic-wise tests on weak subjects',
      'Review: Previous test mistakes and explanations'
    ],
    recommendedTests: weak.map(topic => ({
      topic,
      difficulty: 'easy',
      reason: `Your accuracy in ${topic} is below 60%. Start with easy level.`
    })),
    studyPlan: {
      daily: [
        { topic: mainWeak, action: 'Read theory notes', duration: '45 mins' },
        { topic: mainWeak, action: 'Practice MCQs', duration: '30 mins' },
        { topic: strong[0] || 'Revision', action: 'Quick revision', duration: '20 mins' }
      ],
      weekly: [
        { week: 1, focus: mainWeak, targets: 'Complete all chapters and attempt 100 MCQs' },
        { week: 2, focus: weak[1] || mainWeak, targets: 'Improve accuracy to 65%+' },
        { week: 3, focus: 'Full Mock Test', targets: 'Attempt 2 full-length mock tests' }
      ]
    }
  };
};

module.exports = { getAIAnalysis };
