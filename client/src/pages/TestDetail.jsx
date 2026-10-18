import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import { Play, ArrowLeft, Clock, HelpCircle, Trophy, Minus, Info, Sparkles, Loader2 } from 'lucide-react';
import { getTest, generateTest } from '../services/api';
import logo from '../assets/logo.png';
import './TestDetail.css';

export default function TestDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(false);
  const [generatingAi, setGeneratingAi] = useState(false);
  const [testData, setTestData] = useState(null);

  useEffect(() => {
    loadTestInfo();
  }, [id]);

  const loadTestInfo = async () => {
    // If state contains test object, use it directly
    const stateTest = location.state?.test;
    const stateTitle = location.state?.title;

    if (stateTest && stateTest.title) {
      setTestData({
        title: stateTest.title,
        topic: stateTest.topic || 'Nursing Exam Preparation',
        duration: stateTest.duration || 30,
        totalQuestions: stateTest.questions?.length || stateTest.totalQuestions || 25,
        totalMarks: (stateTest.questions?.length || stateTest.totalQuestions || 25) * 1,
        negativeMarking: '1/3',
        description: stateTest.description || 'This is a free practice test designed to help you assess your knowledge and prepare for exams. Take your time and answer all questions to the best of your ability.',
        isFree: stateTest.isFree !== false,
        ...stateTest
      });
      return;
    }

    // Try fetching from backend if id is a valid Mongo ObjectId
    if (id && id !== 'adaptive' && id.match(/^[0-9a-fA-F]{24}$/)) {
      setLoading(true);
      try {
        const { data } = await getTest(id);
        if (data) {
          const qCount = data.questions?.length || data.totalQuestions || 25;
          setTestData({
            title: data.title || 'Free Nursing Test - 180/180',
            topic: data.topic || 'Nursing Exam Preparation',
            duration: data.duration || 30,
            totalQuestions: qCount,
            totalMarks: qCount * 1,
            negativeMarking: '1/3',
            description: data.description || 'This is a free practice test designed to help you assess your knowledge and prepare for exams. Take your time and answer all questions to the best of your ability.',
            isFree: data.isFree !== false,
            ...data
          });
          setLoading(false);
          return;
        }
      } catch (err) {
        console.warn('[TestDetail] Could not fetch test by ID:', err.message);
      } finally {
        setLoading(false);
      }
    }

    // Default dynamic test data (like Screenshot 1: Free Nursing Test - 180/180)
    setTestData({
      title: stateTitle || (id === '571' ? 'Free Nursing Test - 180/180' : 'Free Nursing Test - 180/180'),
      topic: location.state?.topic || 'Obstetrics & Gynecological Nursing',
      duration: 30,
      totalQuestions: 25,
      totalMarks: 25,
      negativeMarking: '1/3',
      description: 'This is a free practice test designed to help you assess your knowledge and prepare for exams. Take your time and answer all questions to the best of your ability.',
      isFree: true
    });
  };

  const handleStartTest = () => {
    const isCAT = location.state?.isCAT !== undefined ? location.state.isCAT : true;
    navigate(`/test/${id || 'adaptive'}/instructions`, {
      state: {
        test: testData,
        title: testData?.title,
        topic: testData?.topic,
        duration: testData?.duration || 30,
        totalQuestions: testData?.totalQuestions || 25,
        totalMarks: testData?.totalMarks || 25,
        negativeMarking: testData?.negativeMarking || '1/3',
        examType: testData?.examType || 'nursing_officer',
        isCAT
      }
    });
  };

  const handleStartFreshAITest = async () => {
    if (generatingAi) return;
    setGeneratingAi(true);
    try {
      const topicToUse = testData?.topic || 'Medical-Surgical Nursing';
      const res = await generateTest({
        topic: topicToUse,
        difficulty: 'hard',
        numberOfQuestions: 10,
        examType: testData?.examType || 'nursing_officer'
      });
      const newTest = res.data;
      navigate(`/test/${newTest._id}/instructions`, {
        state: {
          test: newTest,
          title: newTest.title,
          topic: newTest.topic,
          duration: 30,
          totalQuestions: newTest.questions?.length || 10,
          totalMarks: (newTest.questions?.length || 10) * 1,
          negativeMarking: '1/3',
          examType: newTest.examType || testData?.examType || 'nursing_officer',
          isCAT: true
        }
      });
    } catch (err) {
      console.error('[TestDetail] Failed to generate fresh AI test:', err);
      alert('AI question generation encountered an issue. Starting the standard test version.');
      handleStartTest();
    } finally {
      setGeneratingAi(false);
    }
  };

  const currentTest = testData || {
    title: 'Free Nursing Test - 180/180',
    topic: 'Nursing Examination',
    duration: 30,
    totalQuestions: 25,
    totalMarks: 25,
    negativeMarking: '1/3',
    description: 'This is a free practice test designed to help you assess your knowledge and prepare for exams. Take your time and answer all questions to the best of your ability.',
    isFree: true
  };

  return (
    <div className="td-wrapper">
      {/* Top Header Navbar */}
      <header className="td-nav">
        <Link to="/" className="td-brand">
          <img src={logo} alt="NursingOfficer Logo" className="td-logo" />
          <div className="td-brand-info">
            <span className="td-brand-name">Nursing Officer Test Bank</span>
            <span className="td-brand-sub">Call or WhatsApp at: 9828474951</span>
          </div>
        </Link>
        <div className="td-nav-right">
          <Link to="/tests" className="td-back-link">
            <ArrowLeft size={16} /> Back to Tests
          </Link>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="td-main">
        <div className="td-card">

          {/* Top Banner Card Header */}
          <div className="td-card-header">
            <div className="td-icon-badge">
              <span>📝</span>
            </div>
            <div className="td-header-details">
              <h1 className="td-title">{currentTest.title}</h1>
              <div className="td-badges">
                {currentTest.isFree && <span className="td-badge-free">FREE</span>}
                <span className="td-badge-negative">-{currentTest.negativeMarking}</span>
                <span style={{ background: '#ede9fe', color: '#6d28d9', fontSize: 11, fontWeight: 800, padding: '3px 10px', borderRadius: 12 }}>⚡ COMPUTER ADAPTIVE (CAT)</span>
                {currentTest.topic && <span className="td-badge-topic">{currentTest.topic}</span>}
              </div>
            </div>
          </div>

          {/* Card Body */}
          <div className="td-card-body">

            {/* 4 Metric Boxes Grid */}
            <div className="td-metrics-grid">

              {/* Duration */}
              <div className="td-metric-box">
                <div className="td-metric-icon" style={{ color: '#6366f1' }}>
                  <Clock size={28} />
                </div>
                <div className="td-metric-val">{currentTest.duration} min</div>
                <div className="td-metric-lbl">Duration</div>
              </div>

              {/* Questions */}
              <div className="td-metric-box">
                <div className="td-metric-icon" style={{ color: '#ec4899' }}>
                  <HelpCircle size={28} />
                </div>
                <div className="td-metric-val green">{currentTest.totalQuestions}</div>
                <div className="td-metric-lbl">Questions</div>
              </div>

              {/* Total Marks */}
              <div className="td-metric-box">
                <div className="td-metric-icon" style={{ color: '#f59e0b' }}>
                  <Trophy size={28} />
                </div>
                <div className="td-metric-val orange">{currentTest.totalMarks}</div>
                <div className="td-metric-lbl">Total Marks</div>
              </div>

              {/* Negative Marking */}
              <div className="td-metric-box">
                <div className="td-metric-icon" style={{ color: '#8b5cf6' }}>
                  <Minus size={28} strokeWidth={3} />
                </div>
                <div className="td-metric-val orange">{currentTest.negativeMarking}</div>
                <div className="td-metric-lbl">Negative Marking</div>
              </div>

            </div>

            {/* About This Test */}
            <div className="td-about-sec">
              <h2 className="td-about-title">About This Test</h2>
              <p className="td-about-desc">
                {currentTest.description}
              </p>

              <div className="td-alert-box">
                <div className="td-alert-icon">
                  <Info size={18} />
                </div>
                <div>
                  You have <strong>{currentTest.duration} minutes</strong> to complete this test. Make sure you have a stable internet connection.
                </div>
              </div>
            </div>

            {/* Action Buttons: AI Fresh Questions vs Standard Pool */}
            <div style={{ display: 'flex', gap: 12, marginTop: 24, flexDirection: 'column' }}>
              <button
                className="td-btn-start"
                onClick={handleStartFreshAITest}
                disabled={generatingAi}
                id="btn-start-ai-test"
                style={{
                  background: 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)',
                  boxShadow: '0 4px 14px rgba(124, 58, 237, 0.35)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 10,
                  cursor: generatingAi ? 'not-allowed' : 'pointer'
                }}
              >
                {generatingAi ? (
                  <>
                    <Loader2 size={20} style={{ animation: 'spin 1s linear infinite' }} />
                    <span>AI is Generating 10 Brand New Questions...</span>
                  </>
                ) : (
                  <>
                    <Sparkles size={20} fill="#ffffff" />
                    <span>Generate & Practice Fresh AI Questions (New Scenarios)</span>
                  </>
                )}
              </button>

              <button
                className="td-btn-start"
                onClick={handleStartTest}
                disabled={generatingAi}
                id="btn-start-test"
                style={{ background: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
              >
                <Play size={18} fill="#ffffff" /> Start Standard Saved Test
              </button>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
