import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCATHistory } from '../services/api';
import { 
  BrainCircuit, ShieldCheck, Activity, Award, ArrowRight, 
  TrendingUp, BarChart2, Layers, Zap, Clock, CheckCircle2, AlertTriangle
} from 'lucide-react';
import './CATDashboard.css';

export default function CATDashboard() {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const { data } = await getCATHistory();
      setHistory(data || []);
    } catch (err) {
      console.error('[CAT Landing] Failed to fetch CAT history:', err);
    } finally {
      setLoading(false);
    }
  };

  const passes = history.filter(h => h.result === 'PASSED').length;
  const passRate = history.length > 0 ? Math.round((passes / history.length) * 100) : 0;

  return (
    <div className="cat-landing-container">
      {/* Banner */}
      <div className="cat-hero-banner">
        <div className="cat-hero-content">
          <div className="cat-hero-tag">
            <BrainCircuit size={18} />
            <span>Official Computer Adaptive Testing (CAT) Engine</span>
          </div>
          <h1>Archer & UWorld Style Computer Adaptive NCLEX Exam</h1>
          <p>
            Experience true Computer Adaptive Testing (CAT). The system begins at a Base level, continuously evaluates your performance in real-time, scales question difficulty up to Peak Level on correct answers, and measures your statistical confidence against the passing standard.
          </p>

          <div className="cat-hero-actions">
            <button className="cat-launch-btn" onClick={() => navigate('/cat-test/live')}>
              <Zap size={20} /> Launch Computer Adaptive Test (CAT) <ArrowRight size={20} />
            </button>
          </div>
        </div>

        <div className="cat-hero-card">
          <div className="cat-model-title">How the CAT Algorithm Works</div>
          <ul className="cat-model-list">
            <li>
              <div className="bullet-num">1</div>
              <div><strong>Base Level Start:</strong> Starts at Level 2 (Base passing benchmark).</div>
            </li>
            <li>
              <div className="bullet-num">2</div>
              <div><strong>Adaptive Scaling:</strong> Correct answers elevate questions to Level 3 (Hard) & Level 4 (Peak).</div>
            </li>
            <li>
              <div className="bullet-num">3</div>
              <div><strong>Dynamic Re-calibration:</strong> Incorrect responses drop difficulty down to re-pinpoint competency.</div>
            </li>
            <li>
              <div className="bullet-num">4</div>
              <div><strong>Subject Matrix Rules:</strong> Questions follow strict subject percentage quotas across all core nursing domains.</div>
            </li>
            <li>
              <div className="bullet-num">5</div>
              <div><strong>95% Confidence Band:</strong> Evaluates pass/fail certainty to determine passing status.</div>
            </li>
          </ul>
        </div>
      </div>

      {/* Analytics Summary */}
      <div className="cat-summary-strip">
        <div className="cat-sum-card">
          <div className="sum-icon purple"><Activity size={24} /></div>
          <div>
            <div className="sum-val">{history.length}</div>
            <div className="sum-lbl">CAT Attempted</div>
          </div>
        </div>

        <div className="cat-sum-card">
          <div className="sum-icon green"><Award size={24} /></div>
          <div>
            <div className="sum-val">{passes}</div>
            <div className="sum-lbl">Passed Sessions</div>
          </div>
        </div>

        <div className="cat-sum-card">
          <div className="sum-icon blue"><TrendingUp size={24} /></div>
          <div>
            <div className="sum-val">{passRate}%</div>
            <div className="sum-lbl">Adaptive Pass Rate</div>
          </div>
        </div>
      </div>

      {/* Adaptive Tiers Graphic */}
      <div className="cat-tiers-section">
        <h2>Adaptive Difficulty Spectrum</h2>
        <p>Questions dynamically scale through 4 precise difficulty bands during your CAT session:</p>
        
        <div className="cat-tiers-grid">
          <div className="cat-tier-card t1">
            <span className="tier-badge">Level 1</span>
            <h3>Below Base</h3>
            <p>Foundational principles & core recall. Served if earlier questions need reinforcement.</p>
          </div>
          <div className="cat-tier-card t2">
            <span className="tier-badge">Level 2</span>
            <h3>Base Level</h3>
            <p>Standard NCLEX/NORCET passing baseline. First question always starts here.</p>
          </div>
          <div className="cat-tier-card t3">
            <span className="tier-badge">Level 3</span>
            <h3>Advanced Hard</h3>
            <p>High-order priority actions, complex clinical judgment & critical pharmacology.</p>
          </div>
          <div className="cat-tier-card t4">
            <span className="tier-badge">Level 4</span>
            <h3>Peak Level 🔥</h3>
            <p>High-acuity ICU multi-system cases, subtle clinical differentials & maximum complexity.</p>
          </div>
        </div>
      </div>

      {/* CAT Attempt History Table */}
      <div className="cat-history-section">
        <h2>Your Adaptive Test History</h2>
        {history.length === 0 ? (
          <div className="cat-empty-history">
            <BrainCircuit size={40} className="empty-icon" />
            <p>You haven't taken any Computer Adaptive Tests yet. Click "Launch Computer Adaptive Test" above to start your first exam!</p>
          </div>
        ) : (
          <div className="cat-history-table-wrapper">
            <table className="cat-history-table">
              <thead>
                <tr>
                  <th>Exam Type</th>
                  <th>Date</th>
                  <th>Questions</th>
                  <th>Final Ability (θ)</th>
                  <th>Result</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {history.map((sess, idx) => (
                  <tr key={sess._id || idx}>
                    <td><strong>{sess.examType === 'nclex_rn' ? 'NCLEX-RN Adaptive (CAT)' : 'NORCET CAT'}</strong></td>
                    <td>{new Date(sess.createdAt).toLocaleDateString()}</td>
                    <td>{sess.totalQuestions || sess.questionsAnswered?.length || 0} Items</td>
                    <td>{(sess.abilityTheta || 0).toFixed(2)}</td>
                    <td>
                      <span className={`result-tag ${sess.result === 'PASSED' ? 'pass' : 'fail'}`}>
                        {sess.result === 'PASSED' ? '✓ PASSED' : '✕ FAILED'}
                      </span>
                    </td>
                    <td>
                      <button className="cat-view-btn" onClick={() => navigate('/cat-test/live')}>
                        Retake CAT
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
