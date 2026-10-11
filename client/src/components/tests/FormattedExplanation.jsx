import React from 'react';
import { BookOpen, CheckCircle2, Target, HelpCircle, AlertCircle, BarChart3, Stethoscope, ChevronRight } from 'lucide-react';
import './FormattedExplanation.css';

/**
 * Resilient parser for authentic UWorld / Archer nursing explanations.
 */
export function parseNursingExplanation(rawText) {
  if (!rawText) return null;
  const str = String(rawText).trim();

  let overview = '';
  const options = [];
  let eduObjective = '';

  // 1. Extract Educational Objective / Key Takeaway
  const eduMatch = str.match(/(?:educational\s*objective|key\s*takeaway|learning\s*objective|high[- ]yield\s*pearl):?\s*([\s\S]*)$/i);
  let contentWithoutEdu = str;

  if (eduMatch) {
    eduObjective = eduMatch[1].trim();
    contentWithoutEdu = str.substring(0, eduMatch.index).trim();
  }

  // 2. Extract Option breakdowns (handles (Option 1), (Option A), (Options 3 and 4), Option 1:, etc.)
  const optionRegex = /(?:\(Options?\s*([0-9A-Da-d\s,and&]+)\)|Option\s*([0-9A-Da-d]+):?)/gi;
  const matches = [...contentWithoutEdu.matchAll(optionRegex)];

  if (matches.length > 0) {
    overview = contentWithoutEdu.substring(0, matches[0].index).trim();
    overview = overview.replace(/^(?:Explanation|Clinical Rationale|Rationale):?\s*/i, '').trim();

    for (let i = 0; i < matches.length; i++) {
      const match = matches[i];
      const rawOptLabel = (match[1] || match[2] || '').trim();
      const startIdx = match.index + match[0].length;
      const endIdx = (i + 1 < matches.length) ? matches[i + 1].index : contentWithoutEdu.length;
      const optText = contentWithoutEdu.substring(startIdx, endIdx).trim();

      // Normalize label to 0-indexed integer if single digit/letter
      let numIndex = null;
      const singleChar = rawOptLabel.charAt(0).toUpperCase();
      if (['A', 'B', 'C', 'D'].includes(singleChar)) {
        numIndex = singleChar.charCodeAt(0) - 65;
      } else if (['1', '2', '3', '4'].includes(singleChar)) {
        numIndex = parseInt(singleChar, 10) - 1;
      }

      options.push({
        rawLabel: rawOptLabel,
        numIndex,
        text: optText
      });
    }
  } else {
    overview = contentWithoutEdu.replace(/^(?:Explanation|Clinical Rationale|Rationale):?\s*/i, '').trim();
  }

  return { overview, options, eduObjective };
}

export default function FormattedExplanation({ 
  explanation, 
  correctAnswer = 0, 
  selectedAnswer = null, 
  optionsList = null, 
  peerPercentages = null 
}) {
  if (!explanation) return null;

  const parsed = parseNursingExplanation(explanation);
  if (!parsed) return null;

  const { overview, options, eduObjective } = parsed;

  // Format clinical text with subheadings, numbered lists, and bullet points
  const renderFormattedClinicalText = (text) => {
    if (!text) return null;
    const lines = text.split('\n');

    return lines.map((line, idx) => {
      const trimmed = line.trim();
      if (!trimmed) return <div key={idx} style={{ height: 10 }} />;

      // Header-like lines (e.g. "Priority Nursing Interventions:", "Clinical Manifestations:")
      if (/^[A-Z][A-Za-z0-9\s/()-]{3,45}:$/.test(trimmed) && !trimmed.toLowerCase().startsWith('option')) {
        return (
          <div key={idx} className="clinical-subheading">
            <Stethoscope size={15} color="#2563eb" />
            <span>{trimmed}</span>
          </div>
        );
      }

      // Numbered clinical steps (1. First step...)
      const numMatch = trimmed.match(/^(\d+)\.\s*(.*)/);
      if (numMatch) {
        return (
          <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, margin: '6px 0 8px 4px' }}>
            <span className="clinical-step-badge">{numMatch[1]}</span>
            <span style={{ fontSize: 14, color: '#1e293b', lineHeight: 1.6, paddingTop: 2 }}>
              {numMatch[2]}
            </span>
          </div>
        );
      }

      // Bulleted items (+, *, -)
      if (trimmed.startsWith('+ ') || trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
        return (
          <div key={idx} className="clinical-bullet-row">
            <span className="clinical-bullet-dot" />
            <span>{trimmed.substring(2)}</span>
          </div>
        );
      }

      // Standard paragraph
      return (
        <p key={idx} style={{ margin: '0 0 12px 0', lineHeight: 1.7, color: '#334155' }}>
          {trimmed}
        </p>
      );
    });
  };

  return (
    <div className="explanation-container">
      {/* ─── 1. Peer Statistics & Option Choice Breakdown ─── */}
      {optionsList && optionsList.length > 0 && (
        <div style={{
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: 12,
          padding: '16px 20px',
          boxShadow: '0 2px 5px rgba(0,0,0,0.03)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 12,
            paddingBottom: 8,
            borderBottom: '1px solid #f1f5f9'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 800, color: '#1e293b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              <BarChart3 size={16} color="#4f46e5" />
              <span>Options & Peer Selection Distribution</span>
            </div>
            {peerPercentages && (
              <span style={{ fontSize: 11, fontWeight: 700, color: '#16a34a', background: '#dcfce7', padding: '3px 10px', borderRadius: 20 }}>
                Peer Statistics
              </span>
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {optionsList.map((optText, oIdx) => {
              const isCorrectOpt = oIdx === correctAnswer;
              const isUserOpt = oIdx === selectedAnswer;
              const pct = peerPercentages && peerPercentages[oIdx] !== undefined ? peerPercentages[oIdx] : null;

              return (
                <div 
                  key={oIdx}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '10px 14px',
                    borderRadius: 10,
                    background: isCorrectOpt ? '#f0fdf4' : (isUserOpt ? '#fef2f2' : '#f8fafc'),
                    border: isCorrectOpt ? '1.5px solid #16a34a' : (isUserOpt ? '1.5px solid #dc2626' : '1px solid #e2e8f0'),
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, flex: 1 }}>
                      <span style={{
                        fontWeight: 800,
                        fontSize: 12,
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: isCorrectOpt ? '#16a34a' : (isUserOpt ? '#dc2626' : '#cbd5e1'),
                        color: isCorrectOpt || isUserOpt ? '#ffffff' : '#334155',
                        flexShrink: 0,
                        marginTop: 1
                      }}>
                        {String.fromCharCode(65 + oIdx)}
                      </span>
                      <div style={{ fontSize: 13.5, color: '#1e293b', lineHeight: 1.55, fontWeight: isCorrectOpt ? 600 : 400 }}>
                        {optText}
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0, marginLeft: 8 }}>
                      {isCorrectOpt && (
                        <span style={{ fontSize: 11, fontWeight: 800, color: '#16a34a', background: '#dcfce7', padding: '3px 8px', borderRadius: 6, display: 'flex', alignItems: 'center', gap: 4 }}>
                          <CheckCircle2 size={13} /> Correct Answer
                        </span>
                      )}
                      {isUserOpt && !isCorrectOpt && (
                        <span style={{ fontSize: 11, fontWeight: 800, color: '#dc2626', background: '#fee2e2', padding: '3px 8px', borderRadius: 6, display: 'flex', alignItems: 'center', gap: 4 }}>
                          <AlertCircle size={13} /> Your Answer
                        </span>
                      )}
                      {pct !== null && (
                        <span style={{ fontSize: 12.5, fontWeight: 800, color: isCorrectOpt ? '#15803d' : '#64748b', minWidth: 42, textAlign: 'right' }}>
                          {pct}%
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Percentage Progress Bar */}
                  {pct !== null && (
                    <div style={{ width: '100%', height: 5, background: '#e2e8f0', borderRadius: 3, marginTop: 8, overflow: 'hidden' }}>
                      <div style={{ 
                        width: `${Math.min(100, Math.max(3, pct))}%`, 
                        height: '100%', 
                        background: isCorrectOpt ? '#16a34a' : (isUserOpt ? '#dc2626' : '#94a3b8'),
                        borderRadius: 3,
                        transition: 'width 0.4s ease'
                      }} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ─── 2. Clinical Rationale & Pathophysiology Overview ─── */}
      {overview && (
        <div className="explanation-card overview">
          <div className="exp-header">
            <BookOpen size={18} color="#2563eb" />
            <span>Clinical Explanation & Pathophysiological Rationale</span>
          </div>
          <div className="exp-body">
            {renderFormattedClinicalText(overview)}
          </div>
        </div>
      )}

      {/* ─── 3. Option-by-Option Breakdown (Distractor Analysis) ─── */}
      {options && options.length > 0 ? (
        <div className="explanation-card options-analysis">
          <div className="exp-header opts">
            <HelpCircle size={18} color="#7c3aed" />
            <span>Detailed Option Breakdown & Distractor Analysis</span>
          </div>
          <div className="option-rationale-list">
            {options.map((opt, idx) => {
              const isCorrect = opt.numIndex !== null 
                ? opt.numIndex === correctAnswer 
                : opt.rawLabel.toLowerCase().includes(String(correctAnswer + 1)) || opt.rawLabel.toLowerCase().includes(String.fromCharCode(65 + correctAnswer).toLowerCase());

              const isUserWrong = selectedAnswer !== null && selectedAnswer !== correctAnswer && opt.numIndex === selectedAnswer;

              // Correlate with option text if available
              const originalStem = optionsList && opt.numIndex !== null && optionsList[opt.numIndex] ? optionsList[opt.numIndex] : null;

              return (
                <div 
                  key={idx} 
                  className={`option-rationale-item ${isCorrect ? 'is-correct-card' : 'is-incorrect-card'}`}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 6, marginBottom: 4 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span className={`option-tag ${isCorrect ? 'is-correct' : (isUserWrong ? 'is-user-wrong' : 'is-incorrect')}`}>
                        {isCorrect 
                          ? `✓ Option ${opt.rawLabel} (Correct Intervention)` 
                          : (isUserWrong ? `✗ Option ${opt.rawLabel} (Your Choice - Inappropriate)` : `Option ${opt.rawLabel} (Distractor)`)}
                      </span>
                    </div>
                  </div>

                  {/* Show Option Stem Quote if available */}
                  {originalStem && (
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#475569', background: '#f1f5f9', padding: '6px 10px', borderRadius: 6, margin: '4px 0 6px 0', borderLeft: '3px solid #94a3b8' }}>
                      "{originalStem}"
                    </div>
                  )}

                  <div style={{ color: '#1e293b', fontSize: 14, lineHeight: 1.65 }}>
                    {opt.text}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Fallback when explanation didn't have (Option 1) tags: synthesize cards from optionsList */
        optionsList && optionsList.length > 0 && (
          <div className="explanation-card options-analysis">
            <div className="exp-header opts">
              <HelpCircle size={18} color="#7c3aed" />
              <span>Option Analysis</span>
            </div>
            <div className="option-rationale-list">
              {optionsList.map((optText, oIdx) => {
                const isCorrect = oIdx === correctAnswer;
                return (
                  <div key={oIdx} className={`option-rationale-item ${isCorrect ? 'is-correct-card' : 'is-incorrect-card'}`}>
                    <span className={`option-tag ${isCorrect ? 'is-correct' : 'is-incorrect'}`}>
                      {isCorrect ? `✓ Option ${String.fromCharCode(65 + oIdx)} (Correct Answer)` : `Option ${String.fromCharCode(65 + oIdx)} (Incorrect)`}
                    </span>
                    <div style={{ color: '#1e293b', marginTop: 4, fontSize: 13.5 }}>
                      <strong>{optText}:</strong> {isCorrect ? 'This represents the evidence-based priority intervention.' : 'This action is secondary, contraindicated, or not the primary focus for this clinical acuity level.'}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )
      )}

      {/* ─── 4. High-Yield Educational Objective ─── */}
      {eduObjective && (
        <div className="explanation-card edu-objective">
          <div className="exp-header edu">
            <Target size={20} color="#15803d" />
            <span style={{ fontSize: 16, fontWeight: 800 }}>Educational Objective</span>
          </div>
          <div className="edu-objective-text">
            {eduObjective}
          </div>
        </div>
      )}
    </div>
  );
}
