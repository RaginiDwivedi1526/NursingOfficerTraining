const axios = require('axios');

const chat = async (messages, maxTokens = 300) => {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey || apiKey === 'your_openai_api_key_here') {
    return 'AI analysis unavailable. Please configure your API key.';
  }
  
  const isGeminiKey = apiKey.startsWith('AIza');
  
  if (isGeminiKey) {
    const modelsToTry = maxTokens > 1000 ? ['gemini-1.5-pro', 'gemini-1.5-flash'] : ['gemini-1.5-flash'];
    
    for (const model of modelsToTry) {
      try {
        console.log(`[AI] Trying model: ${model}, maxTokens: ${maxTokens}`);
        const response = await axios.post(
          'https://generativelanguage.googleapis.com/v1beta/openai/chat/completions',
          {
            model,
            messages,
            temperature: 0.7,
            max_tokens: maxTokens
          },
          {
            headers: {
              'Authorization': `Bearer ${apiKey}`,
              'Content-Type': 'application/json'
            }
          }
        );
        return response.data.choices[0].message.content;
      } catch (error) {
        const errorMsg = error.response?.data?.error?.message || error.message;
        console.error(`[AI] Model ${model} failed: ${errorMsg}`);
        if (model === modelsToTry[modelsToTry.length - 1]) {
          return `ERROR: ${error.response?.status || ''} ${errorMsg}`;
        }
      }
    }
  } else {
    const { OpenAI } = require('openai');
    const openai = new OpenAI({ apiKey });
    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages,
        temperature: 0.7,
        max_tokens: maxTokens
      });
      return response.choices[0].message.content;
    } catch (error) {
      return `ERROR: ${error.message}`;
    }
  }
};

const complete = async (prompt, maxTokens = 200) => {
  return chat([{ role: 'user', content: prompt }], maxTokens);
};

module.exports = { chat, complete };
