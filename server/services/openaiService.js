const axios = require('axios');

const chat = async (messages, maxTokens = 300) => {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey || apiKey === 'your_openai_api_key_here') {
    return 'AI analysis unavailable. Please configure your API key.';
  }
  
  const isGeminiKey = apiKey.startsWith('AIza');
  
  if (isGeminiKey) {
    const endpointsToTry = [
      { url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, name: 'gemini-1.5-flash (v1beta)' },
      { url: `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`, name: 'gemini-1.5-flash (v1)' },
      { url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, name: 'gemini-2.0-flash' },
      { url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-8b:generateContent?key=${apiKey}`, name: 'gemini-1.5-flash-8b' },
      { url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, name: 'gemini-2.5-flash' },
      { url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${apiKey}`, name: 'gemini-1.5-pro' }
    ];
    
    const systemMsg = messages.find(m => m.role === 'system');
    const userAndAssistantMsgs = messages.filter(m => m.role !== 'system');

    const contents = userAndAssistantMsgs.map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }]
    }));

    if (contents.length === 0 && systemMsg) {
      contents.push({
        role: 'user',
        parts: [{ text: systemMsg.content }]
      });
    }

    const payload = {
      contents,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: maxTokens
      }
    };

    if (systemMsg && contents.length > 0 && contents[0].parts[0].text !== systemMsg.content) {
      payload.systemInstruction = {
        parts: [{ text: systemMsg.content }]
      };
    }

    for (const endpoint of endpointsToTry) {
      try {
        console.log(`[AI] Trying Gemini model: ${endpoint.name}, maxTokens: ${maxTokens}`);
        const response = await axios.post(
          endpoint.url,
          payload,
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
        const text = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          return text;
        }
      } catch (error) {
        const errorMsg = error.response?.data?.error?.message || error.message;
        console.error(`[AI] Gemini model ${endpoint.name} failed (${error.response?.status || 'Network'}): ${errorMsg}`);
        if (endpoint === endpointsToTry[endpointsToTry.length - 1]) {
          return `ERROR: ${error.response?.status || ''} ${errorMsg}`;
        }
      }
    }
  } else {
    const { OpenAI } = require('openai');
    const openai = new OpenAI({ apiKey });
    const openAiModels = ['gpt-4o-mini', 'gpt-3.5-turbo'];
    
    for (const model of openAiModels) {
      try {
        console.log(`[AI] Trying OpenAI model: ${model}`);
        const response = await openai.chat.completions.create({
          model,
          messages,
          temperature: 0.7,
          max_tokens: maxTokens
        });
        return response.choices[0].message.content;
      } catch (error) {
        console.error(`[AI] OpenAI model ${model} failed: ${error.message}`);
        if (model === openAiModels[openAiModels.length - 1]) {
          return `ERROR: ${error.message}`;
        }
      }
    }
  }
};

const complete = async (prompt, maxTokens = 200) => {
  return chat([{ role: 'user', content: prompt }], maxTokens);
};

module.exports = { chat, complete };
