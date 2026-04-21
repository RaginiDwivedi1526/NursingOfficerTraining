import { useState } from 'react';
import { Bot, Brain, MessageCircle, Send, X, Zap } from 'lucide-react';
import { askAI } from '../../services/api';
import './AskAIButton.css';

function AskAIButton({ question, options, correctAnswer }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [displayed, setDisplayed] = useState('');
  const [loading, setLoading] = useState(false);

  const typeText = (text) => {
    let i = 0;
    setDisplayed('');
    const interval = setInterval(() => {
      setDisplayed(prev => prev + text[i]);
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 18);
  };

  const handleAsk = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setResponse('');
    setDisplayed('');
    try {
      const { data } = await askAI({
        questionText: question,
        options,
        correctAnswer,
        userQuery: query
      });
      setResponse(data.answer);
      typeText(data.answer);
    } catch (err) {
      setResponse('AI analysis unavailable. Please try again.');
      setDisplayed('AI analysis unavailable. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button className="ask-ai-btn" onClick={() => setOpen(true)}>
        <Bot size={16} color="#7c3aed" />
        <span>Ask AI</span>
      </button>

      {open && (
        <div className="aai-overlay" onClick={() => setOpen(false)}>
          <div className="aai-drawer" onClick={e => e.stopPropagation()}>
            <div className="aai-drawer-header">
              <Bot size={20} color="#7c3aed" />
              <span>Ask AI about this Question</span>
              <button className="aai-close" onClick={() => setOpen(false)}><X size={18} /></button>
            </div>

            <div className="aai-question-preview">{question}</div>

            {displayed && (
              <div className="aai-response">
                <Brain size={16} color="#7c3aed" className="brain-spin-icon" />
                <p>{displayed}</p>
              </div>
            )}

            <div className="aai-input-row">
              <MessageCircle size={16} color="var(--gray)" />
              <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Type your doubt..." onKeyDown={e => e.key === 'Enter' && handleAsk()} />
              <button onClick={handleAsk} disabled={loading} className="aai-send">
                <Send size={16} color="var(--navy)" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AskAIButton;
