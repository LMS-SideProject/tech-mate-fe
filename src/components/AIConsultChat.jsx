import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { SessionManager } from '../utils/sessionManager';

const AIConsultChat = ({ initialMessage }) => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    {
      type: 'assistant',
      content: '안녕하세요! 👋 AI 상담사입니다. 어떤 것을 하고 싶으신지 자유롭게 말씀해 주세요. (예: 친구의 청첩장, 부모님 농장의 상품 판매 페이지, 리액트 프로젝트, 기술 멘토링 등)'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [currentStep, setCurrentStep] = useState('initial'); // 'initial', 'analyzing', 'questioning', 'quote'
  const [isTyping, setIsTyping] = useState(false);
  const [userData, setUserData] = useState({
    goal: '',
    field: '',
    tags: [],
    schedule: '',
    budget: ''
  });
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle initial message from landing page
  useEffect(() => {
    if (initialMessage && initialMessage.trim()) {
      setTimeout(() => {
        const userMessage = { type: 'user', content: initialMessage };
        setMessages(prev => [...prev, userMessage]);
        
        setIsTyping(true);
        
        setTimeout(() => {
          setIsTyping(false);
          const analysis = analyzeUserInput(initialMessage);
          const field = determineField(initialMessage, analysis);
          
          setUserData(prev => ({
            ...prev,
            goal: initialMessage,
            field: field,
            tags: analysis.tags
          }));

          const analysisMessage = {
            type: 'assistant',
            content: `✨ 분석 완료! "${initialMessage}"를 위해 이런 기술들을 배우시면 좋겠어요:\n\n🏷️ **추천 태그**: ${analysis.tags.join(', ')}\n\n현재 ${field} 분야로 파악되었습니다. 바로 견적서를 작성해드릴까요?`
          };

          setMessages(prev => [...prev, analysisMessage]);
          setCurrentStep('questioning');
        }, 1500);
      }, 1000);
    }
  }, [initialMessage]);

  const analyzeUserInput = (input) => {
    // AI가 사용자 입력을 분석하여 추천 태그를 생성
    const recommendations = {
      '청첩장': ['웹디자인', '모바일 최적화'],
      '카페': ['홈페이지 제작', '온라인 주문 시스템'],
      '농장': ['이커머스', '온라인 마케팅'],
      '포트폴리오': ['React', '프론트엔드 개발'],
      '멘토링': ['기술 컨설팅', '개발자 성장'],
      '쇼핑몰': ['온라인 쇼핑몰', '결제 시스템']
    };

    for (const [keyword, tags] of Object.entries(recommendations)) {
      if (input.includes(keyword)) {
        return { field: keyword, tags };
      }
    }

    // 기본 추천
    return { field: '웹 개발', tags: ['HTML/CSS', '반응형 웹'] };
  };

  const determineField = (input, analysis) => {
    // 분야 자동 판단 로직
    const fieldMappings = {
      '청첩장': '웹디자인',
      '카페': '사업 홍보',
      '농장': '이커머스',
      '포트폴리오': '개발',
      '멘토링': '교육',
      '쇼핑몰': '이커머스'
    };

    return fieldMappings[analysis.field] || '웹 개발';
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = { type: 'user', content: inputValue };
    setMessages(prev => [...prev, userMessage]);
    
    setInputValue('');
    setIsTyping(true);

    setTimeout(async () => {
      setIsTyping(false);
      
      if (currentStep === 'initial') {
        // 1단계: 사용자 입력 분석
        const analysis = analyzeUserInput(inputValue);
        const field = determineField(inputValue, analysis);
        
        setUserData(prev => ({
          ...prev,
          goal: inputValue,
          field: field,
          tags: analysis.tags
        }));

        // AI 분석 결과 메시지
        const analysisMessage = {
          type: 'assistant',
          content: `✨ 분석 완료! "${inputValue}"를 위해 이런 기술들을 배우시면 좋겠어요:\n\n🏷️ **추천 태그**: ${analysis.tags.join(', ')}\n\n현재 ${field} 분야로 파악되었습니다. 바로 견적서를 작성해드릴까요?`
        };

        setMessages(prev => [...prev, analysisMessage]);
        setCurrentStep('questioning');

      } else if (currentStep === 'questioning') {
        // 분야가 파악되었으므로 바로 견적서 작성으로 진행
        if (inputValue.includes('예') || inputValue.includes('네') || inputValue.includes('좋') || inputValue.includes('견적')) {
          askForSchedule();
        } else {
          // 추가 질문이 필요한 경우
          const clarificationMessage = {
            type: 'assistant',
            content: '어떤 분야에 종사하고 계신가요? 더 정확한 견적서를 위해 알려주세요.'
          };
          setMessages(prev => [...prev, clarificationMessage]);
          setCurrentStep('field_inquiry');
        }
      } else if (currentStep === 'field_inquiry') {
        setUserData(prev => ({ ...prev, field: inputValue }));
        askForSchedule();
      } else if (currentStep === 'schedule') {
        setUserData(prev => ({ ...prev, schedule: inputValue }));
        askForBudget();
      } else if (currentStep === 'budget') {
        const finalUserData = { ...userData, budget: inputValue };
        setUserData(finalUserData);
        SessionManager.updateUserData(finalUserData);
        showQuote(finalUserData);
      }
    }, 1500);
  };

  const askForSchedule = () => {
    const scheduleMessage = {
      type: 'assistant',
      content: '📅 일정은 어떻게 생각하고 계세요?',
      options: ['1주일', '2주일', '1개월', '2개월', '3개월', '시간여유 있음']
    };
    setMessages(prev => [...prev, scheduleMessage]);
    setCurrentStep('schedule');
  };

  const askForBudget = () => {
    const budgetMessage = {
      type: 'assistant',
      content: '💰 예산은 어느 정도로 생각하고 계신가요?',
      options: ['50만원 이하', '50~100만원', '100~200만원', '200~500만원', '500만원 이상', '비용 상담']
    };
    setMessages(prev => [...prev, budgetMessage]);
    setCurrentStep('budget');
  };

  const showQuote = (data) => {
    const quoteMessage = {
      type: 'assistant',
      content: generateQuote(data),
      isQuote: true
    };
    setMessages(prev => [...prev, quoteMessage]);
    setCurrentStep('completed');
  };

  const generateQuote = (data) => {
    return (
      <div className="ai-quote-container">
        <div className="quote-header">
          <h3 className="h4">📋 AI 상담 결과 견적서</h3>
          <p className="quote-subtitle">AI 분석을 통한 맞춤 추천 서비스입니다</p>
        </div>
        
        <div className="quote-content">
          <div className="quote-section">
            <h4>🎯 목표</h4>
            <p>{data.goal}</p>
          </div>
          
          <div className="quote-section">
            <h4>🏷️ 추천 기술 태그</h4>
            <div className="tech-tags">
              {data.tags.map((tag, index) => (
                <span key={index} className="tech-tag">{tag}</span>
              ))}
            </div>
          </div>
          
          <div className="quote-section">
            <h4>📂 분야</h4>
            <p>{data.field}</p>
          </div>
          
          <div className="quote-grid">
            <div className="quote-item">
              <div className="quote-icon">📅</div>
              <div>
                <h5>일정</h5>
                <p>{data.schedule}</p>
              </div>
            </div>
            <div className="quote-item">
              <div className="quote-icon">💰</div>
              <div>
                <h5>예산</h5>
                <p>{data.budget}</p>
              </div>
            </div>
          </div>
          
          <div className="recommendation-section">
            <h4>💡 AI 추천 플랜</h4>
            <div className="recommendation-items">
              <div className="rec-item">
                <span className="rec-icon">🚀</span>
                <span>단계별 학습 로드맵 제공</span>
              </div>
              <div className="rec-item">
                <span className="rec-icon">👨‍💼</span>
                <span>전문가 1:1 매칭 서비스</span>
              </div>
              <div className="rec-item">
                <span className="rec-icon">📈</span>
                <span>실제 프로젝트 완성까지 지원</span>
              </div>
            </div>
          </div>
        </div>

        <div className="quote-actions">
          <button 
            className="btn-primary btn-lg" 
            onClick={() => navigate('/matching')}
          >
            전문가 매칭 받기
          </button>
        </div>
      </div>
    );
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleQuickReply = (reply) => {
    setInputValue(reply);
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  const getQuickReplies = () => {
    if (currentStep === 'questioning') {
      return ['네, 견적서 작성해주세요', '다른 분야입니다'];
    } else if (currentStep === 'field_inquiry') {
      return ['개발자', '디자이너', '사업자', '학생', '프리랜서', '기타'];
    } else if (currentStep === 'schedule') {
      return ['1주일', '2주일', '1개월', '2개월', '3개월', '시간여유 있음'];
    } else if (currentStep === 'budget') {
      return ['50만원 이하', '50~100만원', '100~200만원', '200~500만원', '500만원 이상', '비용 상담'];
    }
    return [];
  };

  return (
    <div className="ai-consult-chat">
      <div className="chat-header">
        <h2 className="h5">🤖 AI 상담 채팅</h2>
        <p className="text-sm" style={{ color: 'var(--gray-600)', margin: 0 }}>
          AI가 당신의 목표를 분석하고 맞춤 견적서를 제공합니다
        </p>
      </div>

      <div className="chat-messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`chat-message ${message.type}`}
          >
            {message.type === 'assistant' && (
              <div className="assistant-avatar">AI</div>
            )}
            <div className={`chat-bubble ${message.type} ${message.isQuote ? 'quote-bubble' : ''}`}>
              {message.isQuote ? message.content : message.content}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="chat-message assistant">
            <div className="assistant-avatar">AI</div>
            <div className="chat-bubble assistant">
              <div className="loading-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-container">
        {getQuickReplies().length > 0 && currentStep !== 'completed' && (
          <div className="quick-replies">
            {getQuickReplies().map((reply, index) => (
              <button
                key={index}
                className="quick-reply-btn"
                onClick={() => handleQuickReply(reply)}
              >
                {reply}
              </button>
            ))}
          </div>
        )}
        
        {currentStep !== 'completed' && (
          <div className="chat-input-wrapper">
            <input
              type="text"
              className="chat-input"
              placeholder="메시지를 입력하세요..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button 
              className="chat-send-btn"
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M2.01 21L23 12L2.01 3L2 10L17 12L2 14L2.01 21Z" fill="currentColor"/>
              </svg>
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        .ai-consult-chat {
          height: 100vh;
          display: flex;
          flex-direction: column;
          background: var(--white);
        }

        .chat-header {
          background: linear-gradient(135deg, var(--primary-blue), var(--primary-dark));
          color: white;
          border-bottom: 1px solid var(--gray-200);
          padding: 20px;
          text-align: center;
        }

        .chat-header h2 {
          color: white;
          margin-bottom: 4px;
        }

        .chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: 24px;
          background: var(--gray-50);
        }

        .chat-message {
          display: flex;
          align-items: flex-start;
          margin-bottom: 16px;
          gap: 12px;
        }

        .chat-message.user {
          justify-content: flex-end;
        }

        .chat-message.assistant {
          justify-content: flex-start;
          width: 100%;
        }

        .assistant-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: var(--primary-blue);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 14px;
          flex-shrink: 0;
        }

        .chat-bubble {
          background: var(--white);
          border-radius: 18px;
          padding: 12px 18px;
          max-width: 70%;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          border: 1px solid var(--gray-200);
        }

        .chat-bubble.user {
          background: var(--primary-blue);
          color: white;
          border: none;
        }

        .ai-quote-container {
          background: var(--white);
          border-radius: 20px;
          padding: 32px;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.12);
          width: 100%;
          max-width: none;
          margin: 16px 0;
          border: 2px solid var(--primary-blue);
        }

        .quote-bubble {
          background: transparent !important;
          padding: 0 !important;
          max-width: 100% !important;
          border: none !important;
          box-shadow: none !important;
        }

        .quote-header {
          text-align: center;
          margin-bottom: 24px;
          padding-bottom: 16px;
          border-bottom: 2px solid var(--gray-100);
        }

        .quote-subtitle {
          color: var(--gray-600);
          font-size: 14px;
          margin: 4px 0 0 0;
        }

        .quote-content {
          margin-bottom: 24px;
        }

        .quote-section {
          margin-bottom: 20px;
        }

        .quote-section h4 {
          font-size: 16px;
          font-weight: 600;
          color: var(--gray-800);
          margin-bottom: 8px;
        }

        .quote-section p {
          color: var(--gray-700);
          margin: 0;
          font-size: 14px;
        }

        .tech-tags {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .tech-tag {
          background: var(--primary-light);
          color: var(--primary-blue);
          padding: 6px 12px;
          border-radius: 16px;
          font-size: 12px;
          font-weight: 600;
          border: 1px solid rgba(46, 111, 242, 0.2);
        }

        .quote-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          margin-bottom: 20px;
        }

        .quote-item {
          display: flex;
          align-items: center;
          gap: 12px;
          background: var(--gray-50);
          padding: 16px;
          border-radius: 12px;
        }

        .quote-icon {
          font-size: 24px;
        }

        .quote-item h5 {
          font-size: 14px;
          font-weight: 600;
          color: var(--gray-700);
          margin: 0 0 4px 0;
        }

        .quote-item p {
          font-size: 14px;
          color: var(--gray-600);
          margin: 0;
        }

        .recommendation-section h4 {
          color: var(--primary-blue);
          margin-bottom: 16px;
        }

        .recommendation-items {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .rec-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          background: var(--primary-light);
          border-radius: 12px;
          font-size: 14px;
          color: var(--gray-700);
        }

        .rec-icon {
          font-size: 18px;
        }

        .quote-actions {
          text-align: center;
          padding-top: 20px;
          border-top: 2px solid var(--gray-100);
        }

        .quick-replies {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 16px;
          padding: 16px;
          padding-bottom: 0;
        }

        .quick-reply-btn {
          background: var(--gray-100);
          color: var(--gray-800);
          border: 2px solid var(--gray-200);
          border-radius: 20px;
          padding: 10px 16px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
        }

        .quick-reply-btn:hover {
          background: var(--primary-light);
          border-color: var(--primary-blue);
          color: var(--primary-blue);
        }

        .chat-input-container {
          background: var(--white);
          border-top: 1px solid var(--gray-200);
          padding: 16px;
        }

        .chat-input-wrapper {
          display: flex;
          align-items: center;
          gap: 12px;
          background: var(--gray-50);
          border: 2px solid var(--gray-200);
          border-radius: 24px;
          padding: 8px 8px 8px 20px;
          transition: all 0.2s ease;
        }

        .chat-input-wrapper:focus-within {
          border-color: var(--primary-blue);
          box-shadow: 0 0 0 4px rgba(46, 111, 242, 0.1);
        }

        .chat-input {
          flex: 1;
          border: none;
          background: transparent;
          outline: none;
          font-size: 16px;
          padding: 12px 0;
        }

        .chat-input::placeholder {
          color: var(--gray-500);
        }

        .chat-send-btn {
          background: var(--primary-blue);
          color: white;
          border: none;
          border-radius: 20px;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .chat-send-btn:hover:not(:disabled) {
          background: var(--primary-dark);
        }

        .chat-send-btn:disabled {
          background: var(--gray-400);
          cursor: not-allowed;
        }

        .loading-dots {
          display: flex;
          gap: 4px;
        }

        .loading-dots span {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--gray-400);
          animation: loading 1.5s infinite;
        }

        .loading-dots span:nth-child(2) {
          animation-delay: 0.2s;
        }

        .loading-dots span:nth-child(3) {
          animation-delay: 0.4s;
        }

        @keyframes loading {
          0%, 80%, 100% {
            transform: scale(0.8);
            opacity: 0.6;
          }
          40% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @media (max-width: 768px) {
          .quote-grid {
            grid-template-columns: 1fr;
          }
          
          .ai-quote-container {
            padding: 24px 16px;
          }
          
          .chat-messages {
            padding: 16px;
          }
          
          .chat-bubble {
            max-width: 85%;
          }
        }
      `}</style>
    </div>
  );
};

export default AIConsultChat;