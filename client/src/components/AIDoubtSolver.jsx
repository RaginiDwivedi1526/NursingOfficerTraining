import { useState, useRef, useEffect } from 'react';
import { Bot, Brain, MessageCircle, Send, X, GraduationCap, ShieldCheck, Zap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { chatAI } from '../services/api';
import './AIDoubtSolver.css';

function AIDoubtSolver() {
  const { user, isPro } = useAuth();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(() => {
    const saved = sessionStorage.getItem('ai_chat_history');
    return saved ? JSON.parse(saved) : [{ role: 'assistant', content: "Hi! I'm your nursing tutor. Ask me anything about your exams." }];
  });
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, typing]);
  useEffect(() => { sessionStorage.setItem('ai_chat_history', JSON.stringify(messages)); }, [messages]);

  if (!user) return null;

  const handleSend = async () => {
    if (!input.trim() || typing) return;
    const userMsg = { role: 'user', content: input.trim() };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput('');
    setTyping(true);
    try {
      const { data } = await chatAI({ messages: updated });
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I could not process that. Please try again.' }]);
    } finally { setTyping(false); }
  };

  const userIsPro = isPro();

  return (
    <>
      <button className="ai-float-btn" onClick={() => setOpen(true)}>
        <Bot size={22} color="white" />
        <span className="ai-float-label">Ask AI</span>
      </button>

      {open && (
        <div className="aids-overlay" onClick={() => setOpen(false)}>
          <div className="aids-panel" onClick={e => e.stopPropagation()}>
            <div className="aids-header">
              <Bot size={20} color="var(--purple)" />
              <div>
                <span className="aids-title">AI Doubt Solver</span>
                <span className="aids-sub"><GraduationCap size={12} /> Nursing Tutor</span>
              </div>
              <button className="aids-close" onClick={() => setOpen(false)}><X size={18} /></button>
            </div>

            {!userIsPro ? (
              <div className="aids-teaser">
                <div className="aids-teaser-badge"><Zap size={14} color="var(--gold)" /> Pro Feature</div>
                <div className="aids-sample-chat">
                  <div className="aids-sample-user">You: "Why is Ringer's better than NS for burns?"</div>
                  <div className="aids-sample-ai"><ShieldCheck size={14} color="var(--success)" /> "Ringer's Lactate is preferred because it closely resembles the electrolyte composition of blood plasma..."</div>
                  <div className="aids-sample-user">You: "Explain loop diuretics"</div>
                  <div className="aids-sample-ai"><ShieldCheck size={14} color="var(--success)" /> "Loop diuretics like furosemide act on the ascending limb of Loop of Henle..."</div>
                </div>
                <a href="/pricing" className="aids-upgrade"><Zap size={14} color="var(--gold)" /> Upgrade to Pro →</a>
              </div>
            ) : (
              <>
                <div className="aids-messages">
                  {messages.map((msg, i) => (
                    <div key={i} className={`aids-msg ${msg.role === 'user' ? 'aids-msg-user' : 'aids-msg-ai'}`}>
                      {msg.role === 'assistant' && <Brain size={12} color="var(--purple)" className="brain-spin-icon" />}
                      <span>{msg.content}</span>
                    </div>
                  ))}
                  {typing && (
                    <div className="aids-msg aids-msg-ai aids-typing">
                      <div className="typing-dot" /><div className="typing-dot" /><div className="typing-dot" />
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>

                <div className="aids-input-row">
                  <MessageCircle size={16} color="var(--gray)" />
                  <input value={input} onChange={e => setInput(e.target.value)} placeholder="Ask anything..." onKeyDown={e => e.key === 'Enter' && handleSend()} />
                  <button onClick={handleSend} disabled={typing} className="aids-send"><Send size={16} color="var(--navy)" /></button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default AIDoubtSolver;
