import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { SessionManager } from '../utils/sessionManager';

const QuoteGeneratorChat = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    {
      type: 'assistant',
      content: '안녕하세요! 📋 견적서 작성 도우미입니다. 어떤 분야에 기술을 도입하고 싶으신지 선택해주세요.'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [currentStep, setCurrentStep] = useState('field_selection'); 
  const [selectedField, setSelectedField] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [userData, setUserData] = useState({
    field: '',
    techDescription: '',
    schedule: '',
    budget: '',
    additionalInfo: {}
  });
  const messagesEndRef = useRef(null);

  const fieldOptions = [
    { id: 'manufacturing', name: '제조업', icon: '🏭' },
    { id: 'service', name: '서비스업', icon: '🛎️' },
    { id: 'retail', name: '유통/리테일', icon: '🏪' },
    { id: 'startup', name: '스타트업', icon: '🚀' },
    { id: 'freelancer', name: '프리랜서', icon: '💼' },
    { id: 'consulting', name: '컨설팅', icon: '🎯' }
  ];

  const getFieldQuestions = (field) => {
    const questions = {
      'manufacturing': [
        { key: 'productType', question: '어떤 제품을 제조하고 계신가요?', options: ['전자제품', '기계부품', '식품', '의류', '화학제품', '기타'] },
        { key: 'automationLevel', question: '현재 자동화 수준은 어떻게 되시나요?', options: ['완전수동', '부분자동화', '대부분자동화', '완전자동화', '잘 모름'] },
        { key: 'priority', question: '가장 우선적으로 개선하고 싶은 부분은?', options: ['생산성 향상', '품질 관리', '비용 절감', '안전성 개선', '재고 관리'] }
      ],
      'service': [
        { key: 'serviceType', question: '어떤 서비스업을 운영하고 계신가요?', options: ['음식점', '미용실', '병원/클리닉', '교육', '부동산', '기타'] },
        { key: 'customerBase', question: '주요 고객층은 어떻게 되시나요?', options: ['개인고객', '기업고객', '온라인고객', '오프라인고객', '혼합'] },
        { key: 'priority', question: '가장 개선하고 싶은 부분은?', options: ['고객 관리', '예약 시스템', '결제 시스템', '마케팅', '운영 효율성'] }
      ],
      'retail': [
        { key: 'storeType', question: '어떤 형태의 매장을 운영하고 계신가요?', options: ['오프라인 매장', '온라인 쇼핑몰', '하이브리드', '도매업', '유통업'] },
        { key: 'productCategory', question: '주로 어떤 상품을 판매하시나요?', options: ['패션/의류', '식품', '전자제품', '생활용품', '도서/문구', '기타'] },
        { key: 'priority', question: '가장 우선적으로 개선하고 싶은 부분은?', options: ['재고 관리', '주문 처리', '고객 분석', '마케팅', '배송 시스템'] }
      ],
      'startup': [
        { key: 'stage', question: '스타트업의 현재 단계는?', options: ['아이디어 단계', '프로토타입 개발', '베타 테스트', '출시 준비', '성장 단계'] },
        { key: 'industry', question: '어떤 분야의 스타트업인가요?', options: ['IT/소프트웨어', '이커머스', '핀테크', '헬스케어', '교육', '기타'] },
        { key: 'priority', question: '가장 시급한 기술 도입 분야는?', options: ['제품 개발', '마케팅 자동화', '고객 관리', '데이터 분석', '보안'] }
      ],
      'freelancer': [
        { key: 'specialty', question: '어떤 분야의 프리랜서이신가요?', options: ['디자인', '개발', '마케팅', '글쓰기', '컨설팅', '기타'] },
        { key: 'workStyle', question: '주로 어떤 방식으로 일하시나요?', options: ['혼자 작업', '팀 프로젝트', '장기 계약', '단발성 프로젝트', '혼합'] },
        { key: 'priority', question: '가장 개선하고 싶은 부분은?', options: ['업무 효율성', '클라이언트 관리', '포트폴리오 관리', '시간 관리', '수주 확대'] }
      ],
      'consulting': [
        { key: 'consultingType', question: '어떤 분야의 컨설팅을 하시나요?', options: ['경영 컨설팅', 'IT 컨설팅', '마케팅', '인사', '재무', '기타'] },
        { key: 'clientType', question: '주요 고객은 어떤 규모인가요?', options: ['대기업', '중소기업', '스타트업', '개인', '공공기관'] },
        { key: 'priority', question: '가장 우선적으로 개선하고 싶은 부분은?', options: ['프로젝트 관리', '고객 관리', '지식 관리', '보고서 작성', '영업 프로세스'] }
      ]
    };
    return questions[field] || [];
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleFieldSelection = (field) => {
    const selectedFieldData = fieldOptions.find(f => f.id === field);
    setSelectedField(field);
    setUserData(prev => ({ ...prev, field: selectedFieldData.name }));

    const userMessage = { type: 'user', content: selectedFieldData.name };
    setMessages(prev => [...prev, userMessage]);
    
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const assistantMessage = {
        type: 'assistant',
        content: `${selectedFieldData.icon} ${selectedFieldData.name} 분야를 선택하셨군요! 더 정확한 견적서를 위해 몇 가지 질문을 드리겠습니다.`
      };
      setMessages(prev => [...prev, assistantMessage]);
      setCurrentStep('additional_questions');
      askAdditionalQuestion(0);
    }, 1500);
  };

  const askAdditionalQuestion = (questionIndex) => {
    const questions = getFieldQuestions(selectedField);
    if (questionIndex < questions.length) {
      setTimeout(() => {
        const question = questions[questionIndex];
        const questionMessage = {
          type: 'assistant',
          content: question.question,
          options: question.options,
          questionKey: question.key,
          questionIndex: questionIndex
        };
        setMessages(prev => [...prev, questionMessage]);
      }, 1000);
    } else {
      askForTechDescription();
    }
  };

  const handleQuestionAnswer = (answer, questionKey, questionIndex) => {
    const userMessage = { type: 'user', content: answer };
    setMessages(prev => [...prev, userMessage]);

    setUserData(prev => ({
      ...prev,
      additionalInfo: { ...prev.additionalInfo, [questionKey]: answer }
    }));

    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      askAdditionalQuestion(questionIndex + 1);
    }, 1000);
  };

  const askForTechDescription = () => {
    setTimeout(() => {
      const message = {
        type: 'assistant',
        content: '마지막으로, 도입하고 싶은 기술에 대해 구체적으로 설명해주세요. (예: 고객 주문을 자동으로 처리하는 시스템, 재고를 실시간으로 관리하는 프로그램 등)'
      };
      setMessages(prev => [...prev, message]);
      setCurrentStep('tech_description');
    }, 1000);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = { type: 'user', content: inputValue };
    setMessages(prev => [...prev, userMessage]);
    
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      
      if (currentStep === 'tech_description') {
        setUserData(prev => ({ ...prev, techDescription: inputValue }));
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
      content: '📅 프로젝트 일정은 어떻게 생각하고 계세요?',
      options: ['1개월', '2개월', '3개월', '6개월', '1년', '상담 후 결정']
    };
    setMessages(prev => [...prev, scheduleMessage]);
    setCurrentStep('schedule');
  };

  const askForBudget = () => {
    const budgetMessage = {
      type: 'assistant',
      content: '💰 예상 예산은 어느 정도인가요?',
      options: ['100만원 이하', '100~500만원', '500~1000만원', '1000~3000만원', '3000만원 이상', '상담 후 결정']
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
    const getRecommendations = () => {
      const recommendations = {
        '제조업': [
          { icon: '🏭', title: 'MES 시스템 도입', description: '생산 관리 효율성 300% 향상' },
          { icon: '📊', title: 'IoT 기반 모니터링', description: '실시간 설비 상태 관리' },
          { icon: '🤖', title: '자동화 시스템', description: '인건비 40% 절감' }
        ],
        '서비스업': [
          { icon: '📱', title: '고객 관리 시스템', description: '고객 만족도 25% 향상' },
          { icon: '💳', title: '통합 결제 시스템', description: '매출 처리 시간 50% 단축' },
          { icon: '📈', title: '마케팅 자동화', description: '신규 고객 유치 200% 증가' }
        ],
        '유통/리테일': [
          { icon: '📦', title: '재고 관리 시스템', description: '재고 회전율 40% 개선' },
          { icon: '🛒', title: '옴니채널 플랫폼', description: '온오프라인 매출 통합 관리' },
          { icon: '🎯', title: '고객 분석 시스템', description: '맞춤형 상품 추천으로 매출 증가' }
        ]
      };
      return recommendations[data.field] || recommendations['서비스업'];
    };

    return (
      <div className="quote-generator-container">
        <div className="quote-header">
          <h3 className="h4">📋 맞춤 견적서</h3>
          <p className="quote-subtitle">{data.field} 분야 기술 도입 견적서입니다</p>
        </div>
        
        <div className="quote-content">
          <div className="quote-overview">
            <div className="quote-field">
              <h4>🏢 분야</h4>
              <p>{data.field}</p>
            </div>
            <div className="quote-description">
              <h4>💡 도입 기술 설명</h4>
              <p>{data.techDescription}</p>
            </div>
          </div>

          <div className="quote-details">
            <h4>📋 상세 정보</h4>
            <div className="details-grid">
              {Object.entries(data.additionalInfo).map(([key, value]) => (
                <div key={key} className="detail-item">
                  <span className="detail-label">{getQuestionLabel(key)}:</span>
                  <span className="detail-value">{value}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="quote-summary">
            <div className="summary-item">
              <div className="summary-icon">📅</div>
              <div>
                <h5>예상 일정</h5>
                <p>{data.schedule}</p>
              </div>
            </div>
            <div className="summary-item">
              <div className="summary-icon">💰</div>
              <div>
                <h5>예상 예산</h5>
                <p>{data.budget}</p>
              </div>
            </div>
          </div>
          
          <div className="recommendations">
            <h4>🎯 추천 솔루션</h4>
            <div className="recommendation-grid">
              {getRecommendations().map((rec, index) => (
                <div key={index} className="recommendation-card">
                  <div className="rec-icon">{rec.icon}</div>
                  <div className="rec-content">
                    <h5>{rec.title}</h5>
                    <p>{rec.description}</p>
                  </div>
                </div>
              ))}
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

  const getQuestionLabel = (key) => {
    const labels = {
      productType: '제품 유형',
      automationLevel: '자동화 수준',
      priority: '개선 우선순위',
      serviceType: '서비스 유형',
      customerBase: '고객층',
      storeType: '매장 형태',
      productCategory: '상품 카테고리',
      stage: '스타트업 단계',
      industry: '업계',
      specialty: '전문 분야',
      workStyle: '작업 방식',
      consultingType: '컨설팅 유형',
      clientType: '고객 유형'
    };
    return labels[key] || key;
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleQuickReply = (reply, questionKey = null, questionIndex = null) => {
    if (questionKey) {
      handleQuestionAnswer(reply, questionKey, questionIndex);
    } else {
      setInputValue(reply);
      setTimeout(() => {
        handleSendMessage();
      }, 100);
    }
  };

  const getCurrentOptions = () => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage && lastMessage.options) {
      return {
        options: lastMessage.options,
        questionKey: lastMessage.questionKey,
        questionIndex: lastMessage.questionIndex
      };
    }
    return null;
  };

  return (
    <div className="quote-generator-chat">
      <div className="chat-header">
        <h2 className="h5">📋 견적서 작성 채팅</h2>
        <p className="text-sm" style={{ color: 'var(--gray-600)', margin: 0 }}>
          분야별 맞춤 질문을 통해 정확한 견적서를 작성해드립니다
        </p>
      </div>

      <div className="chat-messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`chat-message ${message.type}`}
          >
            {message.type === 'assistant' && (
              <div className="assistant-avatar">📋</div>
            )}
            <div className={`chat-bubble ${message.type} ${message.isQuote ? 'quote-bubble' : ''}`}>
              {message.isQuote ? message.content : message.content}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="chat-message assistant">
            <div className="assistant-avatar">📋</div>
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
        {currentStep === 'field_selection' && (
          <div className="field-selection">
            <p className="selection-title">원하는 분야를 선택해주세요:</p>
            <div className="field-options">
              {fieldOptions.map((field) => (
                <button
                  key={field.id}
                  className="field-option-btn"
                  onClick={() => handleFieldSelection(field.id)}
                >
                  <span className="field-icon">{field.icon}</span>
                  <span>{field.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {getCurrentOptions() && currentStep === 'additional_questions' && (
          <div className="quick-replies">
            {getCurrentOptions().options.map((option, index) => (
              <button
                key={index}
                className="quick-reply-btn"
                onClick={() => handleQuickReply(
                  option, 
                  getCurrentOptions().questionKey, 
                  getCurrentOptions().questionIndex
                )}
              >
                {option}
              </button>
            ))}
          </div>
        )}

        {['schedule', 'budget'].includes(currentStep) && getCurrentOptions() && (
          <div className="quick-replies">
            {getCurrentOptions().options.map((option, index) => (
              <button
                key={index}
                className="quick-reply-btn"
                onClick={() => handleQuickReply(option)}
              >
                {option}
              </button>
            ))}
          </div>
        )}
        
        {['tech_description', 'schedule', 'budget'].includes(currentStep) && (
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
        .quote-generator-chat {
          height: 100vh;
          display: flex;
          flex-direction: column;
          background: var(--white);
        }

        .chat-header {
          background: linear-gradient(135deg, #10B981, #059669);
          color: white;
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
          background: #10B981;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 18px;
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
          background: #10B981;
          color: white;
          border: none;
        }

        .quote-generator-container {
          background: var(--white);
          border-radius: 20px;
          padding: 32px;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.12);
          width: 100%;
          max-width: none;
          margin: 16px 0;
          border: 2px solid #10B981;
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

        .quote-overview {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 24px;
          margin-bottom: 24px;
        }

        .quote-field h4,
        .quote-description h4 {
          font-size: 16px;
          font-weight: 600;
          color: var(--gray-800);
          margin-bottom: 8px;
        }

        .quote-field p,
        .quote-description p {
          color: var(--gray-700);
          margin: 0;
          font-size: 14px;
          line-height: 1.5;
        }

        .quote-details {
          margin-bottom: 24px;
        }

        .quote-details h4 {
          font-size: 16px;
          font-weight: 600;
          color: var(--gray-800);
          margin-bottom: 16px;
        }

        .details-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }

        .detail-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: var(--gray-50);
          padding: 12px 16px;
          border-radius: 8px;
        }

        .detail-label {
          font-weight: 500;
          color: var(--gray-600);
          font-size: 13px;
        }

        .detail-value {
          font-weight: 600;
          color: var(--gray-800);
          font-size: 13px;
        }

        .quote-summary {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          margin-bottom: 24px;
        }

        .summary-item {
          display: flex;
          align-items: center;
          gap: 12px;
          background: #F0FDF4;
          padding: 20px;
          border-radius: 12px;
          border: 1px solid #10B981;
        }

        .summary-icon {
          font-size: 24px;
        }

        .summary-item h5 {
          font-size: 14px;
          font-weight: 600;
          color: var(--gray-700);
          margin: 0 0 4px 0;
        }

        .summary-item p {
          font-size: 14px;
          color: var(--gray-600);
          margin: 0;
        }

        .recommendations h4 {
          color: #10B981;
          margin-bottom: 16px;
          font-size: 16px;
          font-weight: 600;
        }

        .recommendation-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        .recommendation-card {
          background: #F0FDF4;
          border: 1px solid #10B981;
          border-radius: 12px;
          padding: 16px;
          text-align: center;
        }

        .rec-icon {
          font-size: 32px;
          margin-bottom: 8px;
        }

        .rec-content h5 {
          font-size: 14px;
          font-weight: 600;
          color: var(--gray-800);
          margin: 0 0 4px 0;
        }

        .rec-content p {
          font-size: 12px;
          color: var(--gray-600);
          margin: 0;
          line-height: 1.3;
        }

        .quote-actions {
          text-align: center;
          padding-top: 20px;
          border-top: 2px solid var(--gray-100);
        }

        .field-selection {
          padding: 20px;
          background: var(--white);
        }

        .selection-title {
          font-size: 16px;
          font-weight: 600;
          color: var(--gray-800);
          margin-bottom: 16px;
          text-align: center;
        }

        .field-options {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }

        .field-option-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          padding: 20px 16px;
          background: var(--gray-50);
          border: 2px solid var(--gray-200);
          border-radius: 16px;
          cursor: pointer;
          transition: all 0.2s ease;
          font-size: 14px;
          font-weight: 500;
          color: var(--gray-800);
        }

        .field-option-btn:hover {
          background: #F0FDF4;
          border-color: #10B981;
          color: #10B981;
          transform: translateY(-2px);
        }

        .field-icon {
          font-size: 24px;
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
          background: #F0FDF4;
          border-color: #10B981;
          color: #10B981;
        }

        .chat-input-container {
          background: var(--white);
          border-top: 1px solid var(--gray-200);
        }

        .chat-input-wrapper {
          display: flex;
          align-items: center;
          gap: 12px;
          background: var(--gray-50);
          border: 2px solid var(--gray-200);
          border-radius: 24px;
          margin: 16px;
          padding: 8px 8px 8px 20px;
          transition: all 0.2s ease;
        }

        .chat-input-wrapper:focus-within {
          border-color: #10B981;
          box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.1);
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
          background: #10B981;
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
          background: #059669;
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

        @media (max-width: 1024px) {
          .field-options {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .quote-overview {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          
          .details-grid {
            grid-template-columns: 1fr;
          }
          
          .quote-summary {
            grid-template-columns: 1fr;
          }
          
          .recommendation-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .field-options {
            grid-template-columns: 1fr;
          }
          
          .quote-generator-container {
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

export default QuoteGeneratorChat;