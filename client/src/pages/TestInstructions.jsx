import React, { useState } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import logo from '../assets/logo.png';
import './TestInstructions.css';

export default function TestInstructions() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [declarationChecked, setDeclarationChecked] = useState(false);

  // Retrieve test details from state or fallback
  const testInfo = location.state?.test || {
    title: location.state?.title || 'Free Nursing Test - 180/180',
    duration: location.state?.duration || 30,
    totalQuestions: location.state?.totalQuestions || 25,
    totalMarks: location.state?.totalMarks || 25,
    negativeMarking: location.state?.negativeMarking || '1/3',
    maxAttempts: 5,
    attemptsUsed: 0,
    markPerQuestion: 1.0,
    negativeScore: 0.33,
    minPassPercent: 50.0
  };

  const isCAT = location.state?.isCAT !== undefined ? location.state.isCAT : true;

  const handleProceed = () => {
    if (!declarationChecked) return;
    navigate(`/test/${id || 'adaptive'}/take`, {
      state: {
        test: testInfo,
        title: testInfo.title,
        topic: testInfo.topic,
        duration: testInfo.duration || 30,
        totalQuestions: testInfo.totalQuestions || 25,
        totalMarks: testInfo.totalMarks || 25,
        negativeMarking: testInfo.negativeMarking || '1/3',
        examType: testInfo.examType || 'nursing_officer',
        isCAT
      }
    });
  };

  return (
    <div className="ti-wrapper">
      {/* Top Header Navbar */}
      <header className="ti-nav">
        <Link to="/" className="ti-brand">
          <img src={logo} alt="NursingOfficer Logo" className="ti-logo" />
          <div>
            <div className="ti-brand-name">Nursing Officer Test Bank</div>
            <div className="ti-brand-sub">Call or WhatsApp at: 9828474951</div>
          </div>
        </Link>
        <div>
          <button
            onClick={() => navigate(-1)}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '7px 14px', borderRadius: 8, background: '#f1f5f9', border: '1px solid #cbd5e1', cursor: 'pointer', fontSize: 13, fontWeight: 600, color: '#475569' }}
          >
            <ArrowLeft size={16} /> Back
          </button>
        </div>
      </header>

      {/* Main Instructions Card */}
      <main className="ti-main">
        <div className="ti-card">
          <h1 className="ti-heading">Please Read the Instructions Carefully</h1>

          {/* Test Parameters Table */}
          <table className="ti-table">
            <tbody>
              <tr>
                <td className="ti-col-lbl">Quiz Name</td>
                <td className="ti-col-val" colSpan={3}><strong>{testInfo.title || 'Free Nursing Test - 180/180'}</strong></td>
              </tr>
              <tr>
                <td className="ti-col-lbl">Duration</td>
                <td className="ti-col-val">{testInfo.duration || 30} min</td>
                <td className="ti-col-lbl">Total No Of Questions</td>
                <td className="ti-col-val">{testInfo.totalQuestions || 25} Questions</td>
              </tr>
              <tr>
                <td className="ti-col-lbl">Max Attempts Allowed</td>
                <td className="ti-col-val">{testInfo.maxAttempts || 5}</td>
                <td className="ti-col-lbl">Attempts Used</td>
                <td className="ti-col-val">{testInfo.attemptsUsed || 0}</td>
              </tr>
              <tr>
                <td className="ti-col-lbl">Mark Per Question</td>
                <td className="ti-col-val">1.0</td>
                <td className="ti-col-lbl">Negative Score</td>
                <td className="ti-col-val">{testInfo.negativeScore || 0.33}</td>
              </tr>
              <tr>
                <td className="ti-col-lbl">Min % To Pass</td>
                <td className="ti-col-val" colSpan={3}>50.0%</td>
              </tr>
            </tbody>
          </table>

          {/* General Instructions Section */}
          <div className="ti-section-title">General Instructions About Attempting CBT Test</div>

          {/* Section A: Color Coding of Questions */}
          <div className="ti-sub-title">A. Color Coding of Questions-</div>
          <div className="ti-color-coding">
            <div className="ti-cc-item">
              <div className="ti-cc-badge not-visited">1</div>
              <div>You have not Visited the Question</div>
            </div>
            <div className="ti-cc-item">
              <div className="ti-cc-badge not-answered">2</div>
              <div>You have not Answered the Question</div>
            </div>
            <div className="ti-cc-item">
              <div className="ti-cc-badge answered">3</div>
              <div>You have Answered the Question</div>
            </div>
            <div className="ti-cc-item">
              <div className="ti-cc-badge marked">4</div>
              <div>You have Not answered the Question, but have marked the question</div>
            </div>
            <div className="ti-cc-item">
              <div className="ti-cc-badge answered-marked">5</div>
              <div>The question(s) "Answered and Marked for Review" will be considered for evaluation</div>
            </div>
          </div>

          {/* Section B: Answering a question */}
          <div className="ti-sub-title">B. Answering a question-</div>
          <ol className="ti-rules-list">
            <li>To select your answer, click on the button of one of the options.</li>
            <li>To deselect your chosen answer, click on the Clear Response button.</li>
            <li>To change your chosen answer, click on the option of your choice.</li>
            <li>To save your answer, you MUST click on Save & Next button.</li>
            <li>To mark the question for review, click on the Mark for Review & Next button.</li>
            <li>In case of doubt on the option chosen for a question, the question can be marked for review by clicking Mark for Review & Next button. In case the marked question is not reviewed, the originally marked option shall be considered for evaluation.</li>
            <li>To navigate between questions, click on the question number from the question palette on the right.</li>
            <li><strong>Computer Adaptive Testing (CAT):</strong> Questions adapt dynamically to your responses. Every test begins at Level 2 (Base Passing Standard). Correct answers escalate the difficulty, while incorrect answers adjust the difficulty to re-evaluate clinical competency.</li>
          </ol>

          {/* Section C: Declaration by User */}
          <div className="ti-sub-title">C. Declaration by User-</div>
          <div className="ti-lang-note">
            Please note all questions will appear in your default language. This language can be changed for a particular question later on.
          </div>

          <label className="ti-declaration">
            <input
              type="checkbox"
              id="cb-declaration"
              checked={declarationChecked}
              onChange={(e) => setDeclarationChecked(e.target.checked)}
            />
            <span>
              I have read and understood the instructions. All computer hardware allotted to me is in proper working condition. I declare that I am not in possession of / not wearing / not carrying any prohibited gadget like mobile phone, bluetooth devices etc. / any prohibited material into the Examination Hall.
            </span>
          </label>

          {/* Bottom Action */}
          <div className="ti-bottom-bar">
            <button
              id="btn-proceed-test"
              className={`ti-btn-proceed ${declarationChecked ? 'active' : 'disabled'}`}
              disabled={!declarationChecked}
              onClick={handleProceed}
            >
              Proceed to Test
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}
