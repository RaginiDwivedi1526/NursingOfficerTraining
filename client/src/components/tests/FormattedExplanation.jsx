import React from 'react';
import { BookOpen, CheckCircle2, Target, HelpCircle, Lightbulb } from 'lucide-react';
import './FormattedExplanation.css';

export function parseNursingExplanation(rawText) {
  if (!rawText) return null;
  const str = String(rawText).trim();

  let overview = '';
  let options = [];
  let eduObjective = '';

  // 1. Extract Educational Objective
  const eduMatch = str.match(/(?:educational\s*objective|key\s*takeaway|learning\s*objective):?\s*([\s\S]*)$/i);
  let contentWithoutEdu = str;

  if (eduMatch) {
    eduObjective = eduMatch[1].trim();
    contentWithoutEdu = str.substring(0, eduMatch.index).trim();
  }

  // 2. Extract Options breakdown if present like (Option 1) ... (Option 2) ...
  const optionRegex = /(?:\(Option\s*(\d+)\)|Option\s*(\d+):?)/gi;
  const matches = [...contentWithoutEdu.matchAll(optionRegex)];

  if (matches.length > 0) {
    // Everything before first match is overview
    overview = contentWithoutEdu.substring(0, matches[0].index).trim();

    // Clean up "Explanation" or header from overview if present
    overview = overview.replace(/^(Explanation|Rationale):?\s*/i, '').trim();

    for (let i = 0; i < matches.length; i++) {
      const match = matches[i];
      const optNum = match[1] || match[2];
      const startIdx = match.index + match[0].length;
      const endIdx = (i + 1 < matches.length) ? matches[i + 1].index : contentWithoutEdu.length;
      const optText = contentWithoutEdu.substring(startIdx, endIdx).trim();

      options.push({
        num: optNum,
        text: optText
      });
    }
  } else {
    overview = contentWithoutEdu.replace(/^(Explanation|Rationale):?\s*/i, '').trim();
  }

  return { overview, options, eduObjective };
}

export default function FormattedExplanation({ explanation }) {
  if (!explanation) return null;

  const parsed = parseNursingExplanation(explanation);

  if (!parsed) return null;

  const { overview, options, eduObjective } = parsed;

  return (
    <div className="explanation-container">
      {/* Clinical Rationale Overview */}
      {overview && (
        <div className="explanation-card overview">
          <div className="exp-header">
            <BookOpen size={16} color="var(--navy)" />
            <span>Clinical Rationale</span>
          </div>
          <div className="exp-body">{overview}</div>
        </div>
      )}

      {/* Option-by-Option Rationale */}
      {options && options.length > 0 && (
        <div className="explanation-card options-analysis">
          <div className="exp-header opts">
            <HelpCircle size={16} color="var(--purple)" />
            <span>Option Analysis</span>
          </div>
          <div className="option-rationale-list">
            {options.map((opt, idx) => (
              <div key={idx} className="option-rationale-item">
                <span className="option-tag is-incorrect">
                  Option {opt.num}
                </span>
                <div style={{ color: '#334155', marginTop: 2 }}>{opt.text}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Educational Objective */}
      {eduObjective && (
        <div className="explanation-card edu-objective">
          <div className="exp-header edu">
            <Target size={16} color="var(--success)" />
            <span>Educational Objective</span>
          </div>
          <div className="edu-objective-text">{eduObjective}</div>
        </div>
      )}
    </div>
  );
}
