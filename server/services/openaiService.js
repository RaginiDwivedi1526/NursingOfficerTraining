const OpenAI = require('openai');

let openai = null;
if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'your_openai_api_key_here') {
  const isGeminiKey = process.env.OPENAI_API_KEY.startsWith('AIza');
  const baseURL = isGeminiKey ? 'https://generativelanguage.googleapis.com/v1beta/openai/' : undefined;
  
  openai = new OpenAI({ 
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: baseURL
  });
}

const chat = async (messages, maxTokens = 300) => {
  if (!openai) return 'AI analysis unavailable. Please configure your API key.';
  
  const isGeminiKey = process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY.startsWith('AIza');
  
  // For large generation tasks, try pro first, fall back to flash
  const modelsToTry = isGeminiKey
    ? (maxTokens > 1000 ? ['gemini-1.5-pro', 'gemini-1.5-flash'] : ['gemini-1.5-flash'])
    : ['gpt-4o-mini'];

  for (const model of modelsToTry) {
    try {
      console.log(`[AI] Trying model: ${model}, maxTokens: ${maxTokens}`);
      const response = await openai.chat.completions.create({
        model,
        messages,
        temperature: 0.7,
        max_tokens: maxTokens
      });
      return response.choices[0].message.content;
    } catch (error) {
      console.error(`[AI] Model ${model} failed: ${error.message}`);
      if (model === modelsToTry[modelsToTry.length - 1]) {
        // Last model also failed
        return `ERROR: ${error.message}`;
      }
      // Try next model
    }
  }
};

const complete = async (prompt, maxTokens = 200) => {
  return chat([{ role: 'user', content: prompt }], maxTokens);
};

module.exports = { chat, complete };
