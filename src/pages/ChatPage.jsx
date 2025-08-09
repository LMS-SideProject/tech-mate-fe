import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AIConsultChat from '../components/AIConsultChat';
import QuoteGeneratorChat from '../components/QuoteGeneratorChat';
import '../styles/global.css';

const ChatPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialMessage = location.state?.initialMessage;
  
  const [chatMode, setChatMode] = useState(null); // 'ai-consult' 또는 'quote-generator'

  // 초기 메시지가 있으면 AI 상담 모드로 자동 진입
  useEffect(() => {
    if (initialMessage && initialMessage.trim()) {
      setChatMode('ai-consult');
    }
  }, [initialMessage]);

  if (chatMode === 'ai-consult') {
    return <AIConsultChat initialMessage={initialMessage} />;
  }

  if (chatMode === 'quote-generator') {
    return <QuoteGeneratorChat />;
  }

  // 모드 선택 화면
  return (
    <div className="chat-mode-selection">
      <div className="selection-container">
        <div className="selection-header">
          <h1 className="h2">어떤 서비스를 이용하시겠어요?</h1>
          <p className="selection-subtitle">
            목적에 맞는 채팅 서비스를 선택해주세요
          </p>
        </div>

        <div className="mode-options">
          <div 
            className="mode-card ai-consult-card"
            onClick={() => setChatMode('ai-consult')}
          >
            <div className="mode-icon">🤖</div>
            <div className="mode-content">
              <h3>AI 상담</h3>
              <p className="mode-description">
                AI가 당신의 목표를 분석하고<br />
                맞춤 기술 추천과 견적서를 제공합니다
              </p>
              <div className="mode-features">
                <span className="feature-item">✨ AI 분석</span>
                <span className="feature-item">🏷️ 기술 태그 추천</span>
                <span className="feature-item">📋 즉시 견적서</span>
              </div>
              <div className="mode-process">
                <div className="process-step">
                  <span className="step-number">1</span>
                  <span>목표 입력</span>
                </div>
                <div className="process-arrow">→</div>
                <div className="process-step">
                  <span className="step-number">2</span>
                  <span>AI 분석</span>
                </div>
                <div className="process-arrow">→</div>
                <div className="process-step">
                  <span className="step-number">3</span>
                  <span>견적서 완성</span>
                </div>
              </div>
            </div>
          </div>

          <div 
            className="mode-card quote-card"
            onClick={() => setChatMode('quote-generator')}
          >
            <div className="mode-icon">📋</div>
            <div className="mode-content">
              <h3>견적서 작성</h3>
              <p className="mode-description">
                분야별 맞춤 질문을 통해<br />
                정확하고 상세한 견적서를 작성합니다
              </p>
              <div className="mode-features">
                <span className="feature-item">🏢 분야별 특화</span>
                <span className="feature-item">❓ 맞춤 질문</span>
                <span className="feature-item">📊 상세 견적서</span>
              </div>
              <div className="mode-process">
                <div className="process-step">
                  <span className="step-number">1</span>
                  <span>분야 선택</span>
                </div>
                <div className="process-arrow">→</div>
                <div className="process-step">
                  <span className="step-number">2</span>
                  <span>세부 질문</span>
                </div>
                <div className="process-arrow">→</div>
                <div className="process-step">
                  <span className="step-number">3</span>
                  <span>견적서 완성</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="selection-footer">
          <button 
            className="btn-secondary"
            onClick={() => navigate('/')}
          >
            ← 홈으로 돌아가기
          </button>
        </div>
      </div>

      <style jsx>{`
        .chat-mode-selection {
          min-height: 100vh;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
        }

        .selection-container {
          max-width: 1000px;
          width: 100%;
        }

        .selection-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .selection-header h1 {
          color: var(--gray-800);
          margin-bottom: 16px;
        }

        .selection-subtitle {
          color: var(--gray-600);
          font-size: 1.125rem;
          margin: 0;
        }

        .mode-options {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 40px;
          margin-bottom: 60px;
        }

        .mode-card {
          background: var(--white);
          border-radius: 24px;
          padding: 40px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
          border: 2px solid transparent;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .mode-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 48px rgba(0, 0, 0, 0.12);
        }

        .ai-consult-card:hover {
          border-color: var(--primary-blue);
          background: linear-gradient(135deg, var(--white) 0%, rgba(46, 111, 242, 0.02) 100%);
        }

        .quote-card:hover {
          border-color: #10B981;
          background: linear-gradient(135deg, var(--white) 0%, rgba(16, 185, 129, 0.02) 100%);
        }

        .mode-icon {
          font-size: 4rem;
          margin-bottom: 24px;
          display: block;
        }

        .mode-content h3 {
          font-size: 1.75rem;
          font-weight: 700;
          color: var(--gray-800);
          margin-bottom: 16px;
        }

        .mode-description {
          color: var(--gray-600);
          font-size: 1.125rem;
          line-height: 1.6;
          margin-bottom: 32px;
        }

        .mode-features {
          display: flex;
          justify-content: center;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 32px;
        }

        .feature-item {
          background: var(--gray-100);
          color: var(--gray-700);
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 0.875rem;
          font-weight: 500;
          border: 1px solid var(--gray-200);
        }

        .ai-consult-card:hover .feature-item {
          background: var(--primary-light);
          color: var(--primary-blue);
          border-color: rgba(46, 111, 242, 0.2);
        }

        .quote-card:hover .feature-item {
          background: #F0FDF4;
          color: #10B981;
          border-color: rgba(16, 185, 129, 0.2);
        }

        .mode-process {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
        }

        .process-step {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          min-width: 60px;
        }

        .step-number {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: var(--gray-200);
          color: var(--gray-600);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 14px;
          transition: all 0.3s ease;
        }

        .ai-consult-card:hover .step-number {
          background: var(--primary-blue);
          color: white;
        }

        .quote-card:hover .step-number {
          background: #10B981;
          color: white;
        }

        .process-step span:last-child {
          font-size: 12px;
          color: var(--gray-600);
          font-weight: 500;
        }

        .process-arrow {
          color: var(--gray-400);
          font-weight: bold;
          font-size: 18px;
        }

        .selection-footer {
          text-align: center;
        }

        .btn-secondary {
          background: var(--white);
          color: var(--gray-600);
          border: 2px solid var(--gray-300);
          padding: 14px 28px;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .btn-secondary:hover {
          background: var(--gray-50);
          border-color: var(--gray-400);
          color: var(--gray-700);
        }

        @media (max-width: 1024px) {
          .mode-options {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          
          .selection-header {
            margin-bottom: 40px;
          }
          
          .mode-card {
            padding: 32px 24px;
          }
          
          .mode-icon {
            font-size: 3.5rem;
            margin-bottom: 20px;
          }
          
          .mode-content h3 {
            font-size: 1.5rem;
          }
          
          .mode-description {
            font-size: 1rem;
          }
        }

        @media (max-width: 768px) {
          .chat-mode-selection {
            padding: 20px;
          }
          
          .mode-card {
            padding: 28px 20px;
          }
          
          .mode-icon {
            font-size: 3rem;
          }
          
          .mode-content h3 {
            font-size: 1.375rem;
          }
          
          .mode-process {
            flex-direction: column;
            gap: 16px;
          }
          
          .process-arrow {
            transform: rotate(90deg);
          }
          
          .selection-header h1 {
            font-size: 1.75rem;
          }
          
          .selection-subtitle {
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ChatPage;