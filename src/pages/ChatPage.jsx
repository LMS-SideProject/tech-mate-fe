import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { SessionManager } from '../utils/sessionManager';
import '../styles/global.css';

const ChatPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialMessage = location.state?.initialMessage;
  
  const [messages, setMessages] = useState([
    {
      type: 'assistant',
      content: '안녕하세요! 👋 기술 학습 매칭 서비스입니다. 당신에게 딱 맞는 전문가를 찾아드릴게요. 먼저 어떤 기술을 배우고 싶으신가요?'
    }
  ]);
  const [inputValue, setInputValue] = useState(initialMessage || '');
  const [currentStep, setCurrentStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [userData, setUserData] = useState({
    skill: '',
    budget: '',
    schedule: '',
    currentJob: ''
  });
  const messagesEndRef = useRef(null);

  const questions = [
    {
      key: 'skill',
      question: '어떤 기술을 배우고 싶으신가요?',
      followUp: '좋은 선택이에요! {skill}를 배우고 싶으시군요. 다음으로, 학습에 투자하실 수 있는 예산은 어느 정도인가요? (예: 월 30만원, 회당 5만원 등)'
    },
    {
      key: 'budget',
      question: '학습에 투자하실 수 있는 예산은 어느 정도인가요?',
      followUp: '네, 예산은 {budget}으로 알겠습니다. 언제, 어떤 방식으로 학습하고 싶으신가요? (예: 평일 저녁 온라인, 주말 오프라인 등)'
    },
    {
      key: 'schedule',
      question: '언제, 어떤 방식으로 학습하고 싶으신가요?',
      followUp: '{schedule}로 진행하시는군요! 마지막으로, 현재 어떤 분야에서 일하고 계신가요? 이 정보는 더 적합한 전문가를 매칭하는데 도움이 됩니다.'
    },
    {
      key: 'currentJob',
      question: '현재 어떤 분야에서 일하고 계신가요?',
      followUp: '감사합니다! 모든 정보를 입력해주셨네요. 견적서를 준비하고 있습니다...'
    }
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle initial message from landing page
  useEffect(() => {
    if (initialMessage && initialMessage.trim()) {
      // Auto-send the initial message after a short delay
      const timer = setTimeout(() => {
        // Directly call the send logic without using the form handler
        const userMessage = { type: 'user', content: initialMessage };
        setMessages(prev => [...prev, userMessage]);
        
        // Save user response
        const currentQuestion = questions[0];
        const newUserData = { ...userData, [currentQuestion.key]: initialMessage };
        setUserData(newUserData);
        
        // Save to session storage
        SessionManager.updateUserData(newUserData);
        
        setInputValue('');
        setIsTyping(true);

        // Show follow-up message
        setTimeout(() => {
          setIsTyping(false);
          const followUp = currentQuestion.followUp.replace(`{${currentQuestion.key}}`, initialMessage);
          setMessages(prev => [...prev, { type: 'assistant', content: followUp }]);
          setCurrentStep(1);
        }, 1500);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage = { type: 'user', content: inputValue };
    setMessages(prev => [...prev, userMessage]);
    
    // Save user response
    const currentQuestion = questions[currentStep];
    const newUserData = { ...userData, [currentQuestion.key]: inputValue };
    setUserData(newUserData);
    
    // Save to session storage
    SessionManager.updateUserData(newUserData);
    
    setInputValue('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      setIsTyping(false);

      if (currentStep < questions.length - 1) {
        // Show follow-up message
        const followUp = currentQuestion.followUp.replace(`{${currentQuestion.key}}`, inputValue);
        setMessages(prev => [...prev, { type: 'assistant', content: followUp }]);
        setCurrentStep(currentStep + 1);
      } else {
        // All questions answered, show quote
        setTimeout(() => {
          showQuote(newUserData);
        }, 1500);
      }
    }, 1500);
  };

  const showQuote = (data) => {
    const quote = generateQuote(data);
    setMessages(prev => [...prev, { type: 'assistant', content: quote, isQuote: true }]);
  };

  const generateQuote = (data) => {
    return (
      <div className="quote-container">
        <h3 className="h4 mb-6">📋 맞춤 견적서</h3>
        
        <div className="quote-section">
          <h4 className="quote-label">학습 목표</h4>
          <p className="quote-value">{data.skill}</p>
        </div>

        <div className="quote-section">
          <h4 className="quote-label">예산</h4>
          <p className="quote-value">{data.budget}</p>
        </div>

        <div className="quote-section">
          <h4 className="quote-label">일정</h4>
          <p className="quote-value">{data.schedule}</p>
        </div>

        <div className="quote-section">
          <h4 className="quote-label">현재 직군</h4>
          <p className="quote-value">{data.currentJob}</p>
        </div>

        <div className="quote-recommendation">
          <h4 className="mb-4">🎯 추천 학습 플랜</h4>
          <ul className="recommendation-list">
            <li>주 2회 1:1 멘토링 (회당 2시간)</li>
            <li>실습 프로젝트 3개 완성</li>
            <li>코드 리뷰 및 피드백</li>
            <li>취업/이직 상담 지원</li>
          </ul>
        </div>

        <button 
          className="btn-primary btn-lg mt-8" 
          style={{ width: '100%' }}
          onClick={() => navigate('/matching')}
        >
          전문가 매칭 받기
        </button>
      </div>
    );
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const getQuickRepliesForStep = (step) => {
    switch (step) {
      case 0: // 기술 질문
        return ['React', 'Vue.js', 'Python', 'Node.js', '바이브 코딩', '웹디자인'];
      case 1: // 예산 질문
        return ['월 20만원', '월 30만원', '월 50만원', '회당 5만원', '회당 10만원'];
      case 2: // 일정 질문
        return ['평일 저녁 온라인', '주말 오프라인', '주중 낮 온라인', '토요일 오후'];
      case 3: // 직업 질문
        return ['개발자', '디자이너', '마케터', '기획자', '학생', '크리에이터'];
      default:
        return [];
    }
  };

  const handleQuickReply = (reply) => {
    setInputValue(reply);
    // 선택 후 자동으로 전송
    setTimeout(() => {
      const userMessage = { type: 'user', content: reply };
      setMessages(prev => [...prev, userMessage]);
      
      const currentQuestion = questions[currentStep];
      const newUserData = { ...userData, [currentQuestion.key]: reply };
      setUserData(newUserData);
      
      SessionManager.updateUserData(newUserData);
      
      setInputValue('');
      setIsTyping(true);

      setTimeout(() => {
        setIsTyping(false);

        if (currentStep < questions.length - 1) {
          const followUp = currentQuestion.followUp.replace(`{${currentQuestion.key}}`, reply);
          setMessages(prev => [...prev, { type: 'assistant', content: followUp }]);
          setCurrentStep(currentStep + 1);
        } else {
          setTimeout(() => {
            showQuote(newUserData);
          }, 1500);
        }
      }, 1500);
    }, 100);
  };

  return (
    <div className="chat-page">
      <div className="chat-header">
        <h2 className="h5">AI 학습 컨설턴트</h2>
        <p className="text-sm" style={{ color: 'var(--gray-600)', margin: 0 }}>
          당신에게 맞는 학습 플랜을 찾아드립니다
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
            <div className={`chat-bubble ${message.type}`}>
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
        {/* Quick Reply Buttons */}
        {currentStep < questions.length && getQuickRepliesForStep(currentStep).length > 0 && (
          <div className="quick-replies">
            {getQuickRepliesForStep(currentStep).map((reply, index) => (
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
      </div>

      <style jsx>{`
        .chat-page {
          height: 100vh;
          display: flex;
          flex-direction: column;
          background: var(--white);
        }

        .chat-header {
          background: var(--white);
          border-bottom: 1px solid var(--gray-200);
          padding: 20px;
          text-align: center;
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

        .quote-container {
          background: var(--white);
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          max-width: 400px;
        }

        .quote-section {
          margin-bottom: 20px;
          padding-bottom: 20px;
          border-bottom: 1px solid var(--gray-100);
        }

        .quote-section:last-of-type {
          border-bottom: none;
        }

        .quote-label {
          font-size: 14px;
          color: var(--gray-600);
          margin-bottom: 4px;
          font-weight: 500;
        }

        .quote-value {
          font-size: 16px;
          color: var(--gray-800);
          font-weight: 600;
          margin: 0;
        }

        .quote-recommendation {
          background: var(--primary-light);
          border-radius: 12px;
          padding: 20px;
          margin-top: 24px;
        }

        .recommendation-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .recommendation-list li {
          padding: 8px 0;
          padding-left: 24px;
          position: relative;
          color: var(--gray-700);
        }

        .recommendation-list li:before {
          content: "✓";
          position: absolute;
          left: 0;
          color: var(--primary-blue);
          font-weight: bold;
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
          transform: translateY(-1px);
        }

        .quick-reply-btn:active {
          transform: translateY(0);
        }

        @media (max-width: 768px) {
          .chat-messages {
            padding: 16px;
          }

          .quote-container {
            max-width: 100%;
          }

          .quick-replies {
            padding: 12px;
            padding-bottom: 0;
          }

          .quick-reply-btn {
            font-size: 13px;
            padding: 8px 14px;
          }
        }
      `}</style>
    </div>
  );
};

export default ChatPage;