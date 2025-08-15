import { useState, useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { categories, learningKeywords, quotation } from '../data/mockData'

function MatchingPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const chatEndRef = useRef(null)
  
  const [chatMode, setChatMode] = useState(null) // 'ai-consult' or 'quotation'
  const [messages, setMessages] = useState([])
  const [currentInput, setCurrentInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    goal: '',
    keywords: [],
    duration: '',
    schedule: '',
    budget: '',
    currentJob: '',
    experience: '',
    category: ''
  })

  // AI 상담 단계별 질문
  const aiConsultSteps = [
    {
      question: '어떤 것을 만들고 싶으신가요?',
      type: 'text',
      placeholder: '예: 쇼핑몰 웹사이트, AI 이미지 생성 도구, 데이터 분석 대시보드'
    },
    {
      question: '추천된 학습 키워드 중에서 관심 있는 것을 선택해주세요:',
      type: 'keywords',
      options: learningKeywords
    },
    {
      question: '희망하는 학습 기간은 어느 정도인가요?',
      type: 'buttons',
      options: ['1개월', '3개월', '6개월', '1년']
    },
    {
      question: '일정은 어떻게 원하시나요?',
      type: 'buttons',
      options: ['주 1회 2시간', '주 2회 2시간', '주 3회 1시간', '매일 1시간']
    },
    {
      question: '예산은 어느 정도 생각하고 계신가요?',
      type: 'buttons',
      options: ['50만원 이하', '50-100만원', '100-200만원', '200만원 이상']
    },
    {
      question: '현재 직무가 어떻게 되시나요?',
      type: 'text',
      placeholder: '예: 마케팅 담당자, 디자이너, 개발자, 학생'
    },
    {
      question: '프로그래밍 경험은 어느 정도이신가요?',
      type: 'buttons',
      options: ['초급 (경험 없음)', '중급 (기초 지식)', '고급 (실무 경험)']
    }
  ]

  useEffect(() => {
    const initialQuery = location.state?.query
    if (initialQuery) {
      setMessages([
        {
          id: 1,
          type: 'bot',
          message: `"${initialQuery}"에 대해 도움을 드리겠습니다! 어떤 방식으로 진행하시겠습니까?`,
          timestamp: new Date().toLocaleTimeString().slice(0, 5),
          options: [
            { text: 'AI 상담받기', value: 'ai-consult' },
            { text: '견적서 바로 작성', value: 'quotation' }
          ]
        }
      ])
    } else {
      setMessages([
        {
          id: 1,
          type: 'bot',
          message: '안녕하세요! Tech Mate AI 상담사입니다. 어떤 방식으로 도움을 드릴까요?',
          timestamp: new Date().toLocaleTimeString().slice(0, 5),
          options: [
            { text: 'AI 상담받기', value: 'ai-consult' },
            { text: '견적서 바로 작성', value: 'quotation' }
          ]
        }
      ])
    }
  }, [location.state])

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleOptionClick = (option) => {
    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      message: option.text,
      timestamp: new Date().toLocaleTimeString().slice(0, 5)
    }
    setMessages(prev => [...prev, userMessage])

    if (option.value === 'ai-consult') {
      setChatMode('ai-consult')
      setTimeout(() => {
        const botMessage = {
          id: messages.length + 2,
          type: 'bot',
          message: aiConsultSteps[0].question,
          timestamp: new Date().toLocaleTimeString().slice(0, 5)
        }
        setMessages(prev => [...prev, botMessage])
      }, 1000)
    } else if (option.value === 'quotation') {
      setChatMode('quotation')
      setTimeout(() => {
        const botMessage = {
          id: messages.length + 2,
          type: 'bot',
          message: '어떤 분야의 견적서를 작성하시겠습니까?',
          timestamp: new Date().toLocaleTimeString().slice(0, 5),
          categories: categories
        }
        setMessages(prev => [...prev, botMessage])
      }, 1000)
    }
  }

  const handleSendMessage = (message) => {
    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      message: message,
      timestamp: new Date().toLocaleTimeString().slice(0, 5)
    }
    setMessages(prev => [...prev, userMessage])
    setCurrentInput('')
    setIsTyping(true)

    if (chatMode === 'ai-consult') {
      handleAIConsultFlow(message)
    } else if (chatMode === 'quotation') {
      handleQuotationFlow(message)
    }
  }

  const handleAIConsultFlow = (message) => {
    const step = aiConsultSteps[currentStep]
    const newFormData = { ...formData }

    if (currentStep === 0) {
      newFormData.goal = message
    }

    setFormData(newFormData)

    setTimeout(() => {
      setIsTyping(false)
      
      if (currentStep < aiConsultSteps.length - 1) {
        const nextStep = currentStep + 1
        setCurrentStep(nextStep)
        
        const botMessage = {
          id: messages.length + 2,
          type: 'bot',
          message: aiConsultSteps[nextStep].question,
          timestamp: new Date().toLocaleTimeString().slice(0, 5),
          stepType: aiConsultSteps[nextStep].type,
          options: aiConsultSteps[nextStep].options
        }
        setMessages(prev => [...prev, botMessage])
      } else {
        // AI 상담 완료 - 견적서 생성
        generateQuotation()
      }
    }, 1500)
  }

  const handleQuotationFlow = (categoryName) => {
    setTimeout(() => {
      setIsTyping(false)
      generateDirectQuotation(categoryName)
    }, 1500)
  }

  const generateQuotation = () => {
    const botMessage = {
      id: messages.length + 2,
      type: 'bot',
      message: '분석이 완료되었습니다! 맞춤형 견적서를 생성해드렸어요.',
      timestamp: new Date().toLocaleTimeString().slice(0, 5),
      quotation: {
        ...quotation,
        goal: formData.goal,
        keywords: formData.keywords.length > 0 ? formData.keywords : quotation.keywords
      }
    }
    setMessages(prev => [...prev, botMessage])
  }

  const generateDirectQuotation = (categoryName) => {
    const botMessage = {
      id: messages.length + 2,
      type: 'bot',
      message: `${categoryName} 분야의 견적서를 생성해드렸습니다.`,
      timestamp: new Date().toLocaleTimeString().slice(0, 5),
      quotation: {
        ...quotation,
        category: categoryName
      }
    }
    setMessages(prev => [...prev, botMessage])
  }

  const handleKeywordSelect = (keyword) => {
    const newKeywords = formData.keywords.includes(keyword)
      ? formData.keywords.filter(k => k !== keyword)
      : [...formData.keywords, keyword]
    
    setFormData({ ...formData, keywords: newKeywords })
  }

  const handleSubmitKeywords = () => {
    const message = `선택된 키워드: ${formData.keywords.join(', ')}`
    handleSendMessage(message)
  }

  const handleQuotationConfirm = (quotationData) => {
    navigate('/experts/matched', { state: { quotation: quotationData } })
  }

  const renderMessage = (message) => {
    if (message.type === 'user') {
      return (
        <div key={message.id} className="flex justify-end mb-md">
          <div className="card" style={{ 
            background: 'var(--primary-blue)', 
            color: 'white', 
            maxWidth: '70%',
            marginLeft: 'auto'
          }}>
            <p>{message.message}</p>
            <small className="text-gray-300">{message.timestamp}</small>
          </div>
        </div>
      )
    }

    return (
      <div key={message.id} className="flex mb-md">
        <div className="flex gap-md" style={{ maxWidth: '70%' }}>
          <div style={{ 
            width: '40px', 
            height: '40px', 
            background: 'var(--primary-blue)', 
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '1.2rem'
          }}>
            🤖
          </div>
          <div className="card">
            <p className="mb-sm">{message.message}</p>
            <small className="text-secondary">{message.timestamp}</small>
            
            {/* Options */}
            {message.options && (
              <div className="mt-md flex gap-sm flex-wrap">
                {message.options.map((option, index) => (
                  <button
                    key={index}
                    className="btn btn-outline btn-small"
                    onClick={() => handleOptionClick(option)}
                  >
                    {option.text}
                  </button>
                ))}
              </div>
            )}

            {/* Categories */}
            {message.categories && (
              <div className="mt-md flex gap-sm flex-wrap">
                {message.categories.map((category) => (
                  <button
                    key={category.id}
                    className="btn btn-outline btn-small"
                    onClick={() => handleSendMessage(category.name)}
                  >
                    {category.icon} {category.name}
                  </button>
                ))}
              </div>
            )}

            {/* Keywords Selection */}
            {message.stepType === 'keywords' && (
              <div className="mt-md">
                <div className="flex gap-sm flex-wrap mb-md">
                  {message.options.map((keyword, index) => (
                    <button
                      key={index}
                      className={`btn btn-small ${formData.keywords.includes(keyword) ? 'btn-primary' : 'btn-secondary'}`}
                      onClick={() => handleKeywordSelect(keyword)}
                    >
                      {keyword}
                    </button>
                  ))}
                </div>
                <button
                  className="btn btn-primary btn-small"
                  onClick={handleSubmitKeywords}
                  disabled={formData.keywords.length === 0}
                >
                  선택 완료
                </button>
              </div>
            )}

            {/* Button Options */}
            {message.stepType === 'buttons' && (
              <div className="mt-md flex gap-sm flex-wrap">
                {message.options.map((option, index) => (
                  <button
                    key={index}
                    className="btn btn-outline btn-small"
                    onClick={() => handleSendMessage(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}

            {/* Quotation */}
            {message.quotation && (
              <div className="card bg-gradient-blue mt-md">
                <h4 className="mb-md">견적서</h4>
                <div className="mb-md">
                  <strong>분야:</strong> {message.quotation.category}
                </div>
                <div className="mb-md">
                  <strong>기간:</strong> {message.quotation.duration}
                </div>
                <div className="mb-md">
                  <strong>일정:</strong> {message.quotation.schedule}
                </div>
                <div className="mb-md">
                  <strong>예산:</strong> ₩{message.quotation.budget.toLocaleString()}
                </div>
                <div className="mb-md">
                  <strong>학습 키워드:</strong>
                  <div className="flex gap-xs mt-sm flex-wrap">
                    {message.quotation.keywords.map((keyword, index) => (
                      <span key={index} className="badge badge-primary">{keyword}</span>
                    ))}
                  </div>
                </div>
                <button
                  className="btn btn-primary btn-full mt-md"
                  onClick={() => handleQuotationConfirm(message.quotation)}
                >
                  전문가 매칭 시작
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="matching-page" style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ padding: '20px 0', borderBottom: '1px solid var(--gray-200)', background: 'white' }}>
        <div className="container">
          <h2>AI 매칭 상담</h2>
        </div>
      </div>

      {/* Chat Area */}
      <div style={{ flex: 1, overflow: 'auto', padding: '20px 0' }}>
        <div className="container">
          {messages.map(renderMessage)}
          
          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex mb-md">
              <div className="flex gap-md">
                <div style={{ 
                  width: '40px', 
                  height: '40px', 
                  background: 'var(--primary-blue)', 
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '1.2rem'
                }}>
                  🤖
                </div>
                <div className="card">
                  <div className="flex gap-xs">
                    <div className="typing-dot"></div>
                    <div className="typing-dot"></div>
                    <div className="typing-dot"></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={chatEndRef} />
        </div>
      </div>

      {/* Input Area */}
      {chatMode && (
        <div style={{ borderTop: '1px solid var(--gray-200)', padding: '20px 0', background: 'white' }}>
          <div className="container">
            <form onSubmit={(e) => {
              e.preventDefault()
              if (currentInput.trim()) {
                handleSendMessage(currentInput)
              }
            }}>
              <div className="flex gap-md">
                <input
                  type="text"
                  className="form-input"
                  placeholder="메시지를 입력하세요..."
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  style={{ flex: 1 }}
                />
                <button type="submit" className="btn btn-primary">
                  전송
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        .typing-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: var(--gray-400);
          animation: typing 1.4s infinite;
        }
        
        .typing-dot:nth-child(1) { animation-delay: 0s; }
        .typing-dot:nth-child(2) { animation-delay: 0.2s; }
        .typing-dot:nth-child(3) { animation-delay: 0.4s; }
        
        @keyframes typing {
          0%, 60%, 100% { transform: scale(0.8); opacity: 0.5; }
          30% { transform: scale(1.2); opacity: 1; }
        }
      `}</style>
    </div>
  )
}

export default MatchingPage