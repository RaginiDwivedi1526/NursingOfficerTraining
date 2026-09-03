import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement,
  LineElement, Tooltip, Legend, Filler
} from 'chart.js';
import {
  ArrowRight, Sparkles, ChevronDown, Send, BrainCircuit,
  FileText, CheckCircle2, Map, FlipHorizontal2, Plus,
  Play, BarChart3, Clock, Star, Crown, MessagesSquare
} from 'lucide-react';
import './StudentAILearning.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler);

const TOOLS = [
  {
    name: 'AI Tutor',
    desc: 'Get instant answers, explanations and concept clarity.',
    icon: '🤖',
    bg: '#e0e7ff',
    btnLabel: 'Start Chat',
    btnColor: { background: '#4f46e5', color: '#fff' },
  },
  {
    name: 'AI Notes Maker',
    desc: 'Summarize any topic into smart notes in seconds.',
    icon: '📝',
    bg: '#dcfce7',
    btnLabel: 'Create Notes',
    btnColor: { background: '#16a34a', color: '#fff' },
  },
  {
    name: 'AI MCQ Generator',
    desc: 'Generate topic-wise MCQs with explanations.',
    icon: '❓',
    bg: '#ffedd5',
    btnLabel: 'Generate MCQs',
    btnColor: { background: '#ea580c', color: '#fff' },
  },
  {
    name: 'AI Mind Map',
    desc: 'Visualize any topic with AI generated mind maps.',
    icon: '🗺️',
    bg: '#eff6ff',
    btnLabel: 'Create Mind Map',
    btnColor: { background: '#2563eb', color: '#fff' },
  },
  {
    name: 'AI Flashcards',
    desc: 'Smart flashcards that help you revise better.',
    icon: '🃏',
    bg: '#fdf4ff',
    btnLabel: 'Create Flashcards',
    btnColor: { background: '#9333ea', color: '#fff' },
  },
];

const SESSIONS = [
  {
    title: 'Explain the nursing management of shock',
    desc: 'Detailed explanation with nursing interventions and care plan.',
    time: 'Today, 10:30 AM',
    dur: '12 min',
    bg: '#e0e7ff',
    color: '#4f46e5',
    icon: <BrainCircuit size={18} />,
  },
  {
    title: 'Generate 20 MCQs on pharmacology - diuretics',
    desc: '20 MCQs generated with answers and rationales.',
    time: 'Today, 09:15 AM',
    dur: '8 min',
    bg: '#ffedd5',
    color: '#ea580c',
    icon: <CheckCircle2 size={18} />,
  },
  {
    title: 'Short notes on community health nursing',
    desc: 'Well structured short notes generated.',
    time: 'Yesterday, 07:45 PM',
    dur: '6 min',
    bg: '#dcfce7',
    color: '#16a34a',
    icon: <FileText size={18} />,
  },
  {
    title: 'Make a mind map on fluid & electrolyte balance',
    desc: 'Mind map generated successfully.',
    time: 'Yesterday, 06:20 PM',
    dur: '5 min',
    bg: '#eff6ff',
    color: '#2563eb',
    icon: <Map size={18} />,
  },
];

const RECOS = [
  {
    type: 'AI Suggested Topic',
    name: 'Acid Base Balance',
    priority: 'High Priority',
    pClass: 'p-high',
    btnLabel: 'Study Now',
    btnClass: 'reco-purple',
    bg: '#e0e7ff', color: '#4f46e5', icon: <BrainCircuit size={18} />
  },
  {
    type: 'Practice More',
    name: 'Pharmacology MCQs',
    priority: 'Medium Priority',
    pClass: 'p-med',
    btnLabel: 'Start Practice',
    btnClass: 'reco-orange',
    bg: '#ffedd5', color: '#ea580c', icon: <CheckCircle2 size={18} />
  },
  {
    type: 'Revise Concepts',
    name: 'Anatomy – Heart',
    priority: 'Medium Priority',
    pClass: 'p-med',
    btnLabel: 'Revise Now',
    btnClass: 'reco-blue',
    bg: '#eff6ff', color: '#2563eb', icon: <FileText size={18} />
  },
];

const chartData = {
  labels: ['21 May', '22 May', '23 May', '24 May', '25 May', '26 May', '27 May'],
  datasets: [{
    label: 'Concepts Learned',
    data: [10, 14, 8, 20, 16, 24, 18],
    borderColor: '#4f46e5',
    backgroundColor: 'rgba(79, 70, 229, 0.06)',
    tension: 0.4,
    fill: true,
    pointRadius: 4,
    pointBackgroundColor: '#fff',
    pointBorderColor: '#4f46e5',
    pointBorderWidth: 2,
  }]
};
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: {
    y: { beginAtZero: true, ticks: { font: { size: 10 } }, grid: { color: '#f1f5f9' } },
    x: { grid: { display: false }, ticks: { font: { size: 10 } } }
  }
};

export default function AILearning() {
  const { user } = useAuth();
  const [query, setQuery] = useState('');
  const firstName = user?.name?.split(' ')[0] || 'Priya';

  return (
    <div className="sail-container">

      {/* Header */}
      <div className="sail-header">
        <div className="sail-title">
          <div>
            <h1><Sparkles size={22} color="#8b5cf6" /> AI Learning</h1>
            <p>Your personal AI tutor that learns with you and helps you master every concept.</p>
          </div>
        </div>
        <div className="sail-quick-chips">
          <div className="sail-chip"><div className="sail-chip-icon" style={{background:'#e0e7ff',color:'#4f46e5'}}>🤖</div><div className="sail-chip-text"><div className="sail-chip-title">AI Tutor</div><div className="sail-chip-sub">Ask & Learn</div></div></div>
          <div className="sail-chip"><div className="sail-chip-icon" style={{background:'#dcfce7',color:'#16a34a'}}>📝</div><div className="sail-chip-text"><div className="sail-chip-title">AI Notes Maker</div><div className="sail-chip-sub">Summarize Any Topic</div></div></div>
          <div className="sail-chip"><div className="sail-chip-icon" style={{background:'#ffedd5',color:'#ea580c'}}>❓</div><div className="sail-chip-text"><div className="sail-chip-title">AI MCQ Generator</div><div className="sail-chip-sub">Practice Smart</div></div></div>
          <div className="sail-chip"><div className="sail-chip-icon" style={{background:'#eff6ff',color:'#2563eb'}}>🗺️</div><div className="sail-chip-text"><div className="sail-chip-title">AI Mind Map</div><div className="sail-chip-sub">Visualize Concepts</div></div></div>
        </div>
      </div>

      {/* Hero Split */}
      <div className="sail-hero">
        {/* AI Chat */}
        <div className="sail-chat-card">
          <div className="sail-chat-inner">
            <div className="sail-ai-mascot">🤖</div>
            <div className="sail-greeting">Hi {firstName}! 👋</div>
            <div className="sail-sub-greeting">
              I'm your AI Learning Assistant.<br/>How can I help you today?
            </div>
            <div className="sail-input-row">
              <input
                className="sail-chat-input"
                type="text"
                placeholder="Ask me anything about nursing..."
                value={query}
                onChange={e => setQuery(e.target.value)}
              />
              <button className="sail-send-btn"><Send size={18} /></button>
            </div>
            <div className="sail-try-row">
              <div className="sail-try-label">Try asking:</div>
              <div className="sail-try-chip" onClick={() => setQuery('Explain fluid & electrolyte balance')}>Explain fluid & electrolyte balance</div>
              <div className="sail-try-chip" onClick={() => setQuery('Write short notes on pharmacology')}>Write short notes on pharmacology</div>
              <div className="sail-try-chip" onClick={() => setQuery('MCQs on community health nursing')}>MCQs on community health nursing</div>
            </div>
          </div>
        </div>

        {/* Overview */}
        <div className="sail-overview-card">
          <div className="sail-overview-head">
            <div className="sail-overview-title">Your AI Learning Overview</div>
            <div className="sail-overview-filter">This Week <ChevronDown size={12} /></div>
          </div>
          <div className="sail-stats-row">
            <div className="sail-ov-stat">
              <div className="sail-ov-val">18</div>
              <div className="sail-ov-trend up">↑ 20% vs last week</div>
              <div className="sail-ov-lbl">AI Sessions</div>
            </div>
            <div className="sail-ov-stat">
              <div className="sail-ov-val">56</div>
              <div className="sail-ov-trend up">↑ 15% vs last week</div>
              <div className="sail-ov-lbl">Questions Asked</div>
            </div>
            <div className="sail-ov-stat">
              <div className="sail-ov-val">24</div>
              <div className="sail-ov-trend up">↑ 18% vs last week</div>
              <div className="sail-ov-lbl">Concepts Learned</div>
            </div>
            <div className="sail-ov-stat">
              <div className="sail-ov-val">12%</div>
              <div className="sail-ov-trend up">↑ 8% vs last week</div>
              <div className="sail-ov-lbl">Accuracy Improved</div>
            </div>
          </div>

          <div className="sail-topics-title">Most Asked Topics</div>
          {[
            { name: 'Pharmacology', pct: 28, color: '#4f46e5' },
            { name: 'Medical Surgical Nursing', pct: 24, color: '#3b82f6' },
            { name: 'Community Health Nursing', pct: 18, color: '#10b981' },
            { name: 'Anatomy & Physiology', pct: 15, color: '#f97316' },
            { name: 'Mental Health Nursing', pct: 15, color: '#ec4899' },
          ].map((t, i) => (
            <div className="sail-topic-row" key={i}>
              <div className="sail-topic-rank">{i + 1}</div>
              <div className="sail-topic-name">{t.name}</div>
              <div className="sail-topic-track"><div className="sail-topic-fill" style={{width:`${t.pct}%`, background: t.color}}></div></div>
              <div className="sail-topic-pct">{t.pct}%</div>
            </div>
          ))}

          <div className="sail-chart-area">
            <div className="sail-chart-lbl">Learning Trend</div>
            <div style={{height: 80}}>
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>

      {/* AI Tools */}
      <div className="sail-tools-section">
        <div className="sail-tools-title"><Sparkles size={20} color="#8b5cf6" /> Powerful AI Learning Tools</div>
        <div className="sail-tools-row">
          {TOOLS.map((tool, idx) => (
            <div className="sail-tool-card" key={idx}>
              <div className="sail-tool-icon" style={{background: tool.bg, fontSize: 24}}>{tool.icon}</div>
              <div className="sail-tool-name">{tool.name}</div>
              <div className="sail-tool-desc">{tool.desc}</div>
              <button className="sail-tool-btn" style={tool.btnColor}>{tool.btnLabel} <ArrowRight size={12} /></button>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Split */}
      <div className="sail-bottom">
        {/* Recent Sessions */}
        <div className="sail-sessions-card">
          <div className="sail-sessions-head">
            <div className="sail-sessions-title">Recent AI Sessions</div>
            <div className="sail-view-all">View All <ArrowRight size={12} /></div>
          </div>
          {SESSIONS.map((s, idx) => (
            <div className="sail-session-item" key={idx}>
              <div className="sail-session-icon" style={{background: s.bg, color: s.color}}>{s.icon}</div>
              <div className="sail-session-body">
                <div className="sail-session-title">{s.title}</div>
                <div className="sail-session-desc">{s.desc}</div>
              </div>
              <div className="sail-session-right">
                <div className="sail-session-time">{s.time}</div>
                <div style={{display:'flex',alignItems:'center',gap:8}}>
                  <div className="sail-session-dur">{s.dur}</div>
                  <div style={{cursor:'pointer',color:'#94a3b8'}}>⋯</div>
                </div>
                <div className="sail-session-status done">Completed</div>
              </div>
            </div>
          ))}
          <button className="sail-ask-btn"><Plus size={14} /> Ask New Question</button>
        </div>

        {/* Right Sidebar */}
        <div className="sail-right-sidebar">
          <div className="sail-reco-card">
            <div className="sail-reco-head">
              <div className="sail-reco-title">Recommended for You</div>
              <div className="sail-view-all">View All <ArrowRight size={12} /></div>
            </div>
            <div className="sail-reco-sub">Based on your performance & weak areas</div>
            {RECOS.map((r, idx) => (
              <div className="sail-reco-item" key={idx}>
                <div className="sail-reco-icon" style={{background: r.bg, color: r.color}}>{r.icon}</div>
                <div className="sail-reco-body">
                  <div className="sail-reco-type">{r.type}</div>
                  <div className="sail-reco-name">{r.name}</div>
                </div>
                <span className={`sail-priority ${r.pClass}`}>{r.priority}</span>
                <button className={`sail-reco-act ${r.btnClass}`}>{r.btnLabel}</button>
              </div>
            ))}
          </div>

          <div className="sail-upgrade-card">
            <div className="sail-upgrade-title">Upgrade Your AI Learning</div>
            <div className="sail-upgrade-sub">Unlock advanced AI features for deeper learning.</div>
            <div className="sail-upgrade-feat"><CheckCircle2 size={14} color="#7c3aed"/> Unlimited AI Conversations</div>
            <div className="sail-upgrade-feat"><CheckCircle2 size={14} color="#7c3aed"/> Advanced Notes & Summaries</div>
            <div className="sail-upgrade-feat"><CheckCircle2 size={14} color="#7c3aed"/> Smart Performance Insights</div>
            <div className="sail-upgrade-feat"><CheckCircle2 size={14} color="#7c3aed"/> Personalized Study Plan</div>
            <button className="sail-upgrade-btn"><Crown size={14} /> Upgrade Now <ArrowRight size={12} /></button>
            <div className="sail-upgrade-crown">👑</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="sail-footer-bar">
        <div className="sail-footer-left">
          <span style={{fontSize: 32}}>🤖</span>
          <div>
            <div>AI + You = Success 💜</div>
            <div className="sail-footer-sub">The more you ask, the more I learn and the better I help you!</div>
          </div>
        </div>
        <button className="sail-how-btn"><Play size={14} fill="white" /> How AI Learning Works?</button>
      </div>

    </div>
  );
}
