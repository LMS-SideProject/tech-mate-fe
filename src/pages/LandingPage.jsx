import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/global.css";

const LandingPage = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const [currentExampleIndex, setCurrentExampleIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const examples = [
    "카페 사장인데 메뉴를 예쁘게 보여줄 홈페이지가 필요해요",
    "결혼식 모바일 청첩장을 직접 만들어보고 싶어요",
    "React 배워서 포트폴리오 사이트 만들고 싶어요",
    "할머니가 키운 감귤을 온라인으로 팔고 싶어요",
    "Node.js로 간단한 API 서버 만드는 법을 배우고 싶어요",
    "Figma 사용법부터 차근차근 배워보고 싶어요",
  ];

  // 타이핑 애니메이션 효과
  useEffect(() => {
    const currentExample = examples[currentExampleIndex];
    let currentIndex = 0;
    setIsTyping(true);
    setCurrentText("");

    const typingInterval = setInterval(() => {
      if (currentIndex <= currentExample.length) {
        setCurrentText(currentExample.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);

        // 2초 후 다음 예시로 넘어가기
        setTimeout(() => {
          setCurrentExampleIndex((prev) => (prev + 1) % examples.length);
        }, 2000);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, [currentExampleIndex, examples]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Navigate to chat page with the initial message
    navigate("/chat", { state: { initialMessage: inputValue.trim() } });
  };

  const handleStartChat = () => {
    // Navigate to chat page without initial message
    navigate("/chat");
  };

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section dark-section">
        <div className="container">
          <div className="hero-content text-center">
            <h1 className="h1 mb-6">
              전문가와 함께 만드는
              <br />
              당신만의 디지털 솔루션
            </h1>
            <p className="text-lg mb-8" style={{ color: "var(--gray-400)" }}>
              사업 홍보부터 기술 학습까지, 목표에 맞는 전문가를 찾아 1:1로
              성장하세요
            </p>

            {/* Typing Animation Examples */}
            <div className="typing-examples">
              <p className="typing-text">
                " {currentText}
                <span className={`cursor ${isTyping ? "blinking" : "hidden"}`}>
                  |
                </span>
                "
              </p>
            </div>

            {/* Enhanced Input Form */}
            <form onSubmit={handleSubmit} className="hero-input-form">
              <div className="input-wrapper">
                <div className="input-icon">💡</div>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="어떤 도움이 필요하신가요?"
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
            </form>

            {/* Direct Chat Button */}
            <div className="direct-chat">
              <p className="or-divider">또는</p>
              <button className="btn-start-chat" onClick={handleStartChat}>
                💬 바로 대화 시작하기
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="how-it-works-section">
        <div className="container">
          <div className="how-it-works-header">
            <h2 className="section-title">🤖 AI 챗봇이 이렇게 도와드려요!</h2>
            <p className="section-subtitle">
              간단한 대화로 어떤 기술이 필요한지 분석하고, 견적서를 빠르게
              작성해드립니다
            </p>
          </div>

          <div className="chatbot-demo">
            <div className="demo-conversation">
              <div className="demo-message assistant">
                <div className="demo-avatar">🤖</div>
                <div className="demo-bubble">
                  안녕하세요! 어떤 도움이 필요하신가요?
                </div>
              </div>
              <div className="demo-message user">
                <div className="demo-bubble">
                  카페 사장인데 메뉴를 예쁘게 보여줄 홈페이지가 필요해요
                </div>
              </div>
              <div className="demo-message assistant">
                <div className="demo-avatar">🤖</div>
                <div className="demo-bubble">
                  ✨ 분석 완료! 카페 홈페이지를 위해 이런 기술들을 추천해요:
                  <br />
                  🏷️ <strong>추천 태그:</strong> 웹디자인, 모바일 최적화
                  <br />
                  📋 견적서를 바로 작성해드릴까요?
                </div>
              </div>
            </div>

            <div className="chatbot-features">
              <div className="feature-item">
                <div className="feature-icon">⚡</div>
                <h4>빠른 분석</h4>
                <p>
                  목표를 입력하면 AI가 즉시 분석하여 필요한 기술을 추천합니다
                </p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">🎯</div>
                <h4>맞춤 추천</h4>
                <p>분야별 전문 지식을 바탕으로 정확한 기술 태그를 제공합니다</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">📋</div>
                <h4>즉시 견적서</h4>
                <p>간단한 질문 몇 개로 상세한 견적서를 빠르게 완성합니다</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <div className="container">
          <div className="services-header">
            <h2 className="section-title">이런 것들을 도와드려요!</h2>
            <p className="section-subtitle">
              다양한 분야의 프로젝트를 AI가 분석하고 전문가와 매칭해드립니다
            </p>
          </div>

          <div className="services-showcase">
            <div className="showcase-item">
              <div className="showcase-icon">💒</div>
              <h3>모바일 청첩장</h3>
              <p>커플 스토리 • 예식 정보 • SNS 공유</p>
              <div className="result-badge">화제의 청첩장</div>
            </div>

            <div className="showcase-item">
              <div className="showcase-icon">💻</div>
              <h3>개발자 포트폴리오</h3>
              <p>React 학습 • 프로젝트 완성 • 취업 준비</p>
              <div className="result-badge">취업 성공률 95%</div>
            </div>

            <div className="showcase-item">
              <div className="showcase-icon">🍊</div>
              <h3>농산물 쇼핑몰</h3>
              <p>온라인 판매 • 배송 관리 • 결제 시스템</p>
              <div className="result-badge">수익 800% 증가</div>
            </div>

            <div className="showcase-item">
              <div className="showcase-icon">🎨</div>
              <h3>디자인 포트폴리오</h3>
              <p>모던 디자인 • 반응형 • 인터랙티브</p>
              <div className="result-badge">어워드 수상</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="services-cta">
            <button
              className="btn-ai-consult"
              onClick={() => navigate("/chat")}
            >
              🤖 AI 상담 시작하기
            </button>
            <button
              className="btn-expert-match"
              onClick={() => navigate("/expert")}
            >
              👨‍💼 전문가 매칭 받기
            </button>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="success-stories">
        <div className="container">
          <div className="testimonials-header">
            <h2 className="section-title">실제 후기를 들어보세요! 📣</h2>
            <p className="section-subtitle">
              정말 많은 분들이 목표를 달성하고 계세요
            </p>
          </div>

          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-avatar">☕</div>
              <div className="testimonial-content">
                <h4>김민수님 (카페 사장)</h4>
                <p>"홍보 페이지 만들고 나니 주문이 2배로 늘었어요!"</p>
                <div className="testimonial-result">
                  💰 월매출 300만원 → 900만원
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-avatar">💻</div>
              <div className="testimonial-content">
                <h4>이지은님 (대학생)</h4>
                <p>"3개월 만에 React로 포트폴리오까지 완성했어요!"</p>
                <div className="testimonial-result">
                  🚀 삼성전자 개발자 인턴 합격!
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-avatar">🍊</div>
              <div className="testimonial-content">
                <h4>박할머니 (농장 운영)</h4>
                <p>"이제 전국으로 감귤을 배송하고 있어요!"</p>
                <div className="testimonial-result">
                  📦 전국 배송으로 매출 5배 증가
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-avatar">💒</div>
              <div className="testimonial-content">
                <h4>최영희님 (예비신부)</h4>
                <p>"청첩장이 너무 예뻐서 모든 분이 캡쳐하시네요!"</p>
                <div className="testimonial-result">
                  ✨ SNS에서 화제가 된 청첩장
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-avatar">🎯</div>
              <div className="testimonial-content">
                <h4>정수호님 (취준생)</h4>
                <p>"6개월 만에 개발자로 전직에 성공했어요!"</p>
                <div className="testimonial-result">
                  💼 네이버 백엔드 개발자 취업
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-avatar">🎨</div>
              <div className="testimonial-content">
                <h4>김디자인님 (프리랜서)</h4>
                <p>"포트폴리오 만들고 나서 문의가 10배 늘었어요!"</p>
                <div className="testimonial-result">
                  🌟 월 수주 30건 → 300건 달성
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">지금 바로 시작해보세요</h2>
            <p className="cta-description">
              무료 상담부터 시작해서 완성까지, 전문가가 함께합니다
            </p>
            <div className="cta-buttons">
              <button
                className="btn-primary btn-lg"
                onClick={() => navigate("/chat")}
              >
                학습자로 시작하기
              </button>
              <Link to="/expert" className="btn-secondary btn-lg">
                전문가로 참여하기
              </Link>
            </div>
            <div className="cta-stats">
              <div className="stat-item">
                <div className="stat-number">500+</div>
                <div className="stat-label">성공한 프로젝트</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">98%</div>
                <div className="stat-label">고객 만족도</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">24시간</div>
                <div className="stat-label">평균 응답 시간</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .landing-page {
          min-height: 100vh;
        }

        .landing-page section {
          min-height: auto;
          display: flex;
          align-items: center;
        }

        .hero-section {
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
          max-width: 700px;
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
          padding: 4px 4px 4px 16px;
          transition: all 0.3s ease;
          margin-bottom: 24px;
        }

        .input-wrapper:focus-within {
          border-color: var(--primary-blue);
          background: rgba(255, 255, 255, 0.15);
          box-shadow: 0 0 0 4px rgba(46, 111, 242, 0.1);
          transform: translateY(-2px);
        }

        .input-icon {
          font-size: 20px;
          margin-right: 12px;
          opacity: 0.8;
        }

        .hero-input {
          flex: 1;
          background: transparent;
          border: none;
          padding: 16px 16px 16px 0;
          font-size: 16px;
          font-family: inherit;
          color: white;
          outline: none;
        }

        .hero-input::placeholder {
          color: rgba(255, 255, 255, 0.7);
        }

        .typing-examples {
          margin-bottom: 16px;
          min-height: 20px;
        }

        .typing-text {
          color: rgba(255, 255, 255, 0.7);
          font-size: 14px;
          text-align: center;
          margin: 0;
          font-style: italic;
        }

        .cursor {
          color: var(--primary-blue);
          font-weight: bold;
          font-style: normal;
        }

        .cursor.blinking {
          animation: blink 1s infinite;
        }

        .cursor.hidden {
          opacity: 0;
        }

        @keyframes blink {
          0%,
          50% {
            opacity: 1;
          }
          51%,
          100% {
            opacity: 0;
          }
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
          color: rgba(255, 255, 255, 0.7);
          margin: 0;
          font-weight: 500;
        }

        .direct-chat {
          margin-top: 32px;
          text-align: center;
        }

        .or-divider {
          color: rgba(255, 255, 255, 0.6);
          font-size: 14px;
          margin: 0 0 16px 0;
          position: relative;
        }

        .or-divider::before,
        .or-divider::after {
          content: "";
          position: absolute;
          top: 50%;
          width: 80px;
          height: 1px;
          background: rgba(255, 255, 255, 0.3);
        }

        .or-divider::before {
          right: calc(100% + 16px);
        }

        .or-divider::after {
          left: calc(100% + 16px);
        }

        .btn-start-chat {
          background: rgba(255, 255, 255, 0.15);
          color: white;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 16px;
          padding: 14px 32px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .btn-start-chat:hover {
          background: rgba(255, 255, 255, 0.25);
          border-color: rgba(255, 255, 255, 0.5);
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
        }

        .how-it-works-section {
          background: var(--white);
          padding: 80px 0;
        }

        .how-it-works-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .chatbot-demo {
          max-width: 1000px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }

        .demo-conversation {
          background: var(--gray-50);
          border-radius: 20px;
          padding: 32px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
        }

        .demo-message {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 20px;
        }

        .demo-message.user {
          justify-content: flex-end;
        }

        .demo-message.user .demo-bubble {
          background: var(--primary-blue);
          color: white;
        }

        .demo-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: var(--primary-blue);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 16px;
          flex-shrink: 0;
        }

        .demo-bubble {
          background: var(--white);
          border-radius: 16px;
          padding: 12px 16px;
          max-width: 280px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          font-size: 14px;
          line-height: 1.4;
        }

        .chatbot-features {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .feature-item {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          padding: 24px;
          background: var(--white);
          border-radius: 16px;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
          transition: all 0.3s ease;
        }

        .feature-item:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
        }

        .feature-icon {
          font-size: 32px;
          flex-shrink: 0;
        }

        .feature-item h4 {
          font-size: 18px;
          font-weight: 700;
          color: var(--gray-800);
          margin: 0 0 8px 0;
        }

        .feature-item p {
          color: var(--gray-600);
          margin: 0;
          font-size: 14px;
          line-height: 1.5;
        }

        .services-section {
          background: var(--gray-50);
          padding: 80px 0;
          min-height: auto;
        }

        .services-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .section-subtitle {
          color: var(--gray-600);
          font-size: 1.125rem;
          margin-top: 16px;
        }

        .services-showcase {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          max-width: 1000px;
          margin: 0 auto;
        }

        .showcase-item {
          background: var(--white);
          border-radius: 20px;
          padding: 32px 24px;
          text-align: center;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
          transition: all 0.3s ease;
          border: 2px solid transparent;
        }

        .showcase-item:hover {
          transform: translateY(-8px);
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.12);
          border-color: var(--primary-blue);
        }

        .showcase-icon {
          font-size: 3rem;
          margin-bottom: 16px;
        }

        .showcase-item h3 {
          font-size: 18px;
          font-weight: 700;
          color: var(--gray-800);
          margin-bottom: 12px;
        }

        .showcase-item p {
          color: var(--gray-600);
          font-size: 14px;
          margin-bottom: 16px;
          line-height: 1.4;
        }

        .result-badge {
          background: linear-gradient(45deg, #e8f5e8, #f0f9f0);
          color: var(--success);
          font-size: 12px;
          font-weight: 700;
          padding: 8px 16px;
          border-radius: 20px;
          border: 2px solid rgba(16, 185, 129, 0.2);
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 32px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .service-card {
          background: var(--white);
          border-radius: 24px;
          padding: 0;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid rgba(0, 0, 0, 0.06);
          display: flex;
          align-items: center;
          gap: 32px;
          min-height: 200px;
          overflow: hidden;
          opacity: 0;
          transform: translateY(60px);
        }

        .service-card.animate-up {
          opacity: 1;
          transform: translateY(0);
        }

        .service-card:nth-child(even) {
          flex-direction: row-reverse;
        }

        .service-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 48px rgba(0, 0, 0, 0.15);
          border-color: var(--primary-blue);
        }

        .service-icon {
          font-size: 4rem;
          padding: 40px;
          background: linear-gradient(
            135deg,
            var(--primary-blue),
            var(--primary-dark)
          );
          color: white;
          border-radius: 24px 0 0 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 160px;
          height: 100%;
        }

        .service-card:nth-child(even) .service-icon {
          border-radius: 0 24px 24px 0;
        }

        .service-content {
          flex: 1;
          padding: 32px;
        }

        .service-card h3 {
          font-size: 1.375rem;
          font-weight: 700;
          color: var(--gray-800);
          margin-bottom: 12px;
          line-height: 1.3;
        }

        .service-description {
          color: var(--gray-600);
          line-height: 1.6;
          margin-bottom: 20px;
          font-size: 0.95rem;
        }

        .service-features {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 20px;
        }

        .feature-tag {
          background: var(--primary-light);
          color: var(--primary-blue);
          padding: 6px 12px;
          border-radius: 12px;
          font-size: 11px;
          font-weight: 600;
          border: 1px solid rgba(46, 111, 242, 0.2);
        }

        .service-result {
          background: linear-gradient(45deg, #e8f5e8, #f0f9f0);
          padding: 16px;
          border-radius: 12px;
          border-left: 4px solid var(--success);
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.08);
        }

        .service-result strong {
          color: var(--gray-800);
          font-size: 14px;
          font-weight: 700;
          line-height: 1.4;
        }

        .services-cta {
          display: flex;
          gap: 20px;
          justify-content: center;
          margin-top: 80px;
        }

        .btn-ai-consult,
        .btn-expert-match {
          padding: 18px 36px;
          border-radius: 16px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .btn-ai-consult {
          background: var(--primary-blue);
          color: white;
        }

        .btn-ai-consult:hover {
          background: var(--primary-dark);
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(46, 111, 242, 0.3);
        }

        .btn-expert-match {
          background: rgba(46, 111, 242, 0.1);
          color: var(--primary-blue);
          border: 2px solid var(--primary-blue);
        }

        .btn-expert-match:hover {
          background: var(--primary-blue);
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(46, 111, 242, 0.3);
        }

        .success-stories {
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          padding: 80px 0;
        }

        .testimonials-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          max-width: 1000px;
          margin: 0 auto;
        }

        .testimonial-card {
          background: var(--white);
          border-radius: 20px;
          padding: 24px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
          border: 2px solid transparent;
          text-align: center;
        }

        .testimonial-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.15);
          border-color: var(--primary-blue);
        }

        .testimonial-avatar {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: var(--primary-blue);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          font-weight: 700;
          margin: 0 auto 16px auto;
        }

        .testimonial-content h4 {
          font-size: 16px;
          font-weight: 700;
          color: var(--gray-800);
          margin-bottom: 12px;
        }

        .testimonial-content p {
          color: var(--gray-700);
          font-size: 14px;
          font-style: italic;
          line-height: 1.5;
          margin-bottom: 16px;
        }

        .testimonial-result {
          background: linear-gradient(45deg, #e8f5e8, #f0f9f0);
          color: var(--success);
          font-size: 12px;
          font-weight: 700;
          padding: 8px 16px;
          border-radius: 16px;
          border: 2px solid rgba(16, 185, 129, 0.2);
          display: inline-block;
        }

        .section-title {
          font-size: 2.25rem;
          font-weight: 700;
          color: var(--gray-800);
          text-align: center;
          margin-bottom: 60px;
        }

        .testimonials-slider {
          width: 100%;
          overflow: hidden;
        }

        .testimonials-track {
          display: flex;
          flex-direction: column;
          gap: 30px;
        }

        .testimonials-row {
          display: flex;
          gap: 24px;
          animation-duration: 40s;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }

        .testimonials-left {
          animation-name: scrollLeft;
        }

        .testimonials-right {
          animation-name: scrollRight;
        }

        .testimonials-row:hover {
          animation-play-state: paused;
        }

        @keyframes scrollLeft {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes scrollRight {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0%);
          }
        }

        .testimonials-row .story-card {
          flex: 0 0 300px;
          width: 300px;
        }

        .story-card {
          background: var(--white);
          border-radius: 20px;
          padding: 24px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
          border: 1px solid rgba(0, 0, 0, 0.06);
          min-height: 280px;
          display: flex;
          flex-direction: column;
        }

        .story-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 35px rgba(0, 0, 0, 0.15);
          border-color: var(--primary-blue);
        }

        .story-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 20px;
        }

        .story-avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: var(--primary-blue);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 18px;
        }

        .story-info h4 {
          font-size: 16px;
          font-weight: 600;
          color: var(--gray-800);
          margin: 0 0 4px 0;
        }

        .story-info p {
          font-size: 14px;
          color: var(--gray-500);
          margin: 0;
        }

        .story-content {
          color: var(--gray-700);
          line-height: 1.6;
          font-style: italic;
          margin: 0 0 16px 0;
          flex: 1;
          font-size: 14px;
        }

        .story-result {
          background: linear-gradient(45deg, #e8f5e8, #f0f9f0);
          padding: 12px;
          border-radius: 10px;
          text-align: center;
          border-left: 3px solid var(--success);
          box-shadow: 0 2px 8px rgba(16, 185, 129, 0.08);
          margin-top: auto;
        }

        .story-result strong {
          color: var(--gray-800);
          font-size: 12px;
          font-weight: 700;
        }

        .cta-section {
          background: linear-gradient(
            135deg,
            var(--primary-blue),
            var(--primary-dark)
          );
          padding: 80px 0;
          color: white;
        }

        .cta-content {
          text-align: center;
          max-width: 800px;
          margin: 0 auto;
        }

        .cta-title {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 20px;
        }

        .cta-description {
          font-size: 1.25rem;
          margin-bottom: 40px;
          opacity: 0.9;
        }

        .cta-buttons {
          display: flex;
          gap: 20px;
          justify-content: center;
          margin-bottom: 50px;
        }

        .cta-buttons .btn-secondary {
          background: rgba(255, 255, 255, 0.2);
          color: white;
          border: 2px solid rgba(255, 255, 255, 0.3);
        }

        .cta-buttons .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.3);
          border-color: rgba(255, 255, 255, 0.5);
        }

        .cta-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px;
          max-width: 600px;
          margin: 0 auto;
        }

        .stat-item {
          text-align: center;
        }

        .stat-number {
          font-size: 2.5rem;
          font-weight: 800;
          color: white;
          margin-bottom: 8px;
        }

        .stat-label {
          font-size: 14px;
          opacity: 0.8;
          margin: 0;
        }

        @media (max-width: 1024px) {
          .chatbot-demo {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .services-showcase {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }

          .testimonials-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }

          .services-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }

          .service-card {
            flex-direction: column !important;
            text-align: center;
            min-height: auto;
          }

          .service-card:nth-child(even) {
            flex-direction: column !important;
          }

          .service-icon {
            border-radius: 20px 20px 0 0 !important;
            min-width: 100%;
            height: 120px;
            font-size: 3rem;
            padding: 20px;
          }

          .service-card:nth-child(even) .service-icon {
            border-radius: 20px 20px 0 0 !important;
          }

          .services-cta {
            flex-direction: column;
            align-items: center;
            gap: 16px;
            margin-top: 60px;
          }

          .btn-ai-consult,
          .btn-expert-match {
            width: 100%;
            max-width: 300px;
          }

          .testimonials-row .story-card {
            flex: 0 0 250px;
            width: 250px;
          }

          .cta-stats {
            grid-template-columns: 1fr;
            gap: 30px;
          }
        }

        @media (max-width: 768px) {
          .how-it-works-section,
          .services-section,
          .success-stories {
            padding: 60px 0;
          }

          .services-showcase,
          .testimonials-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .showcase-item,
          .testimonial-card {
            padding: 24px 20px;
          }

          .showcase-icon {
            font-size: 2.5rem;
          }

          .hero-section {
            padding: 80px 0;
          }

          .hero-input-form {
            max-width: 100%;
            padding: 0 20px;
          }

          .hero-input {
            font-size: 14px;
            padding: 14px 12px 14px 0;
          }

          .hero-input::placeholder {
            font-size: 14px;
          }

          .hero-submit-btn {
            width: 40px;
            height: 40px;
          }

          .direct-chat {
            margin-top: 24px;
          }

          .or-divider::before,
          .or-divider::after {
            width: 60px;
          }

          .btn-start-chat {
            padding: 12px 24px;
            font-size: 15px;
          }

          .services-section,
          .success-stories,
          .cta-section {
            padding: 50px 0;
          }

          .services-grid {
            gap: 20px;
          }

          .service-content {
            padding: 24px;
          }

          .service-card h3 {
            font-size: 1.125rem;
          }

          .service-description {
            font-size: 0.9rem;
          }

          .testimonials-row .story-card {
            flex: 0 0 280px;
            width: 280px;
          }

          .section-title {
            font-size: 1.75rem;
            margin-bottom: 40px;
          }

          .cta-title {
            font-size: 1.75rem;
          }

          .cta-description {
            font-size: 1rem;
            margin-bottom: 30px;
          }

          .cta-buttons {
            flex-direction: column;
            align-items: center;
            gap: 16px;
            margin-bottom: 40px;
          }

          .cta-buttons .btn-primary,
          .cta-buttons .btn-secondary {
            width: 100%;
            max-width: 280px;
          }

          .story-card {
            padding: 24px;
          }

          .stat-number {
            font-size: 2rem;
          }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
