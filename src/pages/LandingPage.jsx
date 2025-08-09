import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/global.css";

const LandingPage = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Navigate to chat page with the initial message
    navigate("/chat", { state: { initialMessage: inputValue.trim() } });
  };

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section dark-section">
        <div className="container">
          <div className="hero-content text-center">
            <h1 className="h1 mb-6">
              기술 전문가와 함께하는
              <br />
              맞춤형 학습 경험
            </h1>
            <p className="text-lg mb-8" style={{ color: "var(--gray-400)" }}>
              당신의 목표에 맞는 전문가를 찾아 1:1로 성장하세요
            </p>

            {/* Claude-style Input Form */}
            <form onSubmit={handleSubmit} className="hero-input-form">
              <div className="input-wrapper">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="어떤 기술을 배우고 싶으신가요? (예: React 개발, Python 데이터 분석, AWS 클라우드...)"
                  className="hero-input"
                />
                <button
                  type="submit"
                  className="hero-submit-btn"
                  disabled={!inputValue.trim()}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M2.01 21L23 12L2.01 3L2 10L17 12L2 14L2.01 21Z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
              </div>
              <p className="input-hint">Enter를 눌러 AI와 대화를 시작하세요</p>
            </form>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section p-12">
        <div className="container">
          <h2 className="h2 text-center mb-12">이런 분들께 추천해요</h2>
          <div className="grid grid-cols-3">
            <div className="session-card">
              <div className="time-badge">초보자</div>
              <h3 className="title">처음 시작하는 프로그래밍</h3>
              <p className="text-base mb-6">
                기초부터 차근차근, 당신의 속도에 맞춰 학습할 수 있어요
              </p>
              <div className="mt-auto">
                <div className="badge primary">Python</div>
                <div className="badge primary" style={{ marginLeft: "8px" }}>
                  JavaScript
                </div>
              </div>
            </div>

            <div
              className="session-card"
              style={{
                background: "linear-gradient(135deg, #d5e8ff, #e8f4ff)",
              }}
            >
              <div className="time-badge">현직자</div>
              <h3 className="title">실무 스킬 업그레이드</h3>
              <p className="text-base mb-6">
                현업에서 바로 활용 가능한 실전 기술을 배워보세요
              </p>
              <div className="mt-auto">
                <div className="badge primary">React</div>
                <div className="badge primary" style={{ marginLeft: "8px" }}>
                  AWS
                </div>
              </div>
            </div>

            <div className="session-card">
              <div className="time-badge">크리에이터</div>
              <h3 className="title">바이브 코딩 & 창작 스킬</h3>
              <p className="text-base mb-6">
                카페 홍보 페이지, 포트폴리오 사이트 등 창작물을 만들어보세요
              </p>
              <div className="mt-auto">
                <div className="badge primary">바이브 코딩</div>
                <div className="badge primary" style={{ marginLeft: "8px" }}>
                  웹디자인
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works dark-section">
        <div className="container">
          <h2 className="h2 text-center mb-12">간단한 3단계로 시작하세요</h2>
          <div className="grid grid-cols-3">
            <div className="text-center">
              <div className="step-number">1</div>
              <h3 className="h4 mb-4">목표 설정</h3>
              <p className="text-base" style={{ color: "var(--gray-400)" }}>
                AI 챗봇과 대화하며 학습 목표와 일정을 설정해요
              </p>
            </div>
            <div className="text-center">
              <div className="step-number">2</div>
              <h3 className="h4 mb-4">전문가 매칭</h3>
              <p className="text-base" style={{ color: "var(--gray-400)" }}>
                당신에게 딱 맞는 전문가를 추천받아요
              </p>
            </div>
            <div className="text-center">
              <div className="step-number">3</div>
              <h3 className="h4 mb-4">학습 시작</h3>
              <p className="text-base" style={{ color: "var(--gray-400)" }}>
                1:1 맞춤형 교육으로 빠르게 성장해요
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section p-12">
        <div className="container">
          <div className="hero-card text-center">
            <h2 className="h2 mb-6">지금 바로 시작하세요</h2>
            <p className="text-lg mb-8">
              전문가와 함께하는 맞춤형 학습으로 목표를 달성하세요
            </p>
            <Link to="/chat" className="btn-primary btn-lg">
              무료로 시작하기
            </Link>
          </div>
        </div>
      </section>

      <style jsx>{`
        .landing-page {
          min-height: 100vh;
        }

        .hero-section {
          padding: 120px 0;
          background: linear-gradient(135deg, #000 0%, #1a1a1a 100%);
        }

        .hero-content {
          max-width: 800px;
          margin: 0 auto;
        }

        .hero-input-form {
          max-width: 600px;
          margin: 0 auto;
        }

        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 2px solid rgba(255, 255, 255, 0.2);
          border-radius: 24px;
          padding: 4px;
          transition: all 0.3s ease;
          margin-bottom: 12px;
        }

        .input-wrapper:focus-within {
          border-color: var(--primary-blue);
          background: rgba(255, 255, 255, 0.15);
          box-shadow: 0 0 0 4px rgba(46, 111, 242, 0.1);
        }

        .hero-input {
          flex: 1;
          background: transparent;
          border: none;
          padding: 16px 20px;
          font-size: 16px;
          font-family: inherit;
          color: white;
          outline: none;
        }

        .hero-input::placeholder {
          color: rgba(255, 255, 255, 0.6);
        }

        .hero-submit-btn {
          background: var(--primary-blue);
          color: white;
          border: none;
          border-radius: 20px;
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          margin-right: 4px;
        }

        .hero-submit-btn:hover:not(:disabled) {
          background: var(--primary-dark);
          transform: scale(1.05);
        }

        .hero-submit-btn:disabled {
          background: rgba(255, 255, 255, 0.2);
          cursor: not-allowed;
          transform: scale(1);
        }

        .input-hint {
          text-align: center;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.5);
          margin: 0;
        }

        .features-section {
          background: var(--gray-50);
        }

        .step-number {
          width: 60px;
          height: 60px;
          background: var(--primary-blue);
          color: white;
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 24px;
        }

        .cta-section {
          background: white;
        }

        @media (max-width: 768px) {
          .hero-section {
            padding: 80px 0;
          }

          .hero-input-form {
            max-width: 100%;
            padding: 0 20px;
          }

          .hero-input {
            font-size: 14px;
            padding: 14px 16px;
          }

          .hero-input::placeholder {
            font-size: 14px;
          }

          .hero-submit-btn {
            width: 40px;
            height: 40px;
          }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
