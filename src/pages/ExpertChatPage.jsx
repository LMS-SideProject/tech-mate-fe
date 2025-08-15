import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { experts } from '../data/mockData'

function ExpertChatPage() {
  const { expertId } = useParams()
  const navigate = useNavigate()
  const fileInputRef = useRef(null)
  const chatEndRef = useRef(null)
  
  const [expert, setExpert] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [showWarning, setShowWarning] = useState(false)
  const [warningMessage, setWarningMessage] = useState('')

  useEffect(() => {
    const foundExpert = experts.find(e => e.id === parseInt(expertId))
    setExpert(foundExpert)
    
    if (foundExpert) {
      loadMessages(foundExpert)
    }
  }, [expertId])

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const loadMessages = (expertData) => {
    const mockMessages = [
      {
        id: 1,
        type: 'expert',
        message: `안녕하세요! ${expertData.name}입니다. 매칭 요청 감사합니다.`,
        timestamp: '09:00'
      },
      {
        id: 2,
        type: 'system',
        message: '매칭이 성공적으로 완료되었습니다! 🎉',
        timestamp: '09:01'
      },
      {
        id: 3,
        type: 'user',
        message: '안녕하세요! 웹 개발을 배우고 싶어서 연락드렸어요.',
        timestamp: '09:05'
      },
      {
        id: 4,
        type: 'expert',
        message: '네, 좋습니다! 현재 어느 정도 수준이신지 알려주시겠어요?',
        timestamp: '09:06'
      },
      {
        id: 5,
        type: 'user',
        message: 'HTML, CSS는 기본적으로 알고 있고, JavaScript와 React를 배우고 싶어요.',
        timestamp: '09:07'
      },
      {
        id: 6,
        type: 'expert',
        message: '좋네요! 그렇다면 먼저 JavaScript 기초부터 탄탄히 하고 React로 넘어가는 게 좋겠어요. 일주일에 몇 시간 정도 투자할 수 있으신가요?',
        timestamp: '09:08'
      },
      {
        id: 7,
        type: 'user',
        message: '주말에 4-5시간 정도 가능할 것 같아요.',
        timestamp: '09:10'
      },
      {
        id: 8,
        type: 'expert',
        message: '완벽해요! 그럼 이번 주말부터 시작해볼까요? 먼저 개발 환경 설정부터 해보겠습니다.',
        timestamp: '09:11'
      },
      {
        id: 9,
        type: 'system',
        message: '⚠️ AI 분석: 일정이 늦어지고 있습니다. 학습 진도를 확인해보세요.',
        timestamp: '09:15',
        isWarning: true
      }
    ]
    setMessages(mockMessages)
  }

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      message: newMessage,
      timestamp: new Date().toLocaleTimeString().slice(0, 5)
    }

    setMessages(prev => [...prev, userMessage])
    
    // Check for potential issues with AI
    checkMessageForIssues(newMessage)
    
    setNewMessage('')
    setIsTyping(true)

    // Simulate expert response
    setTimeout(() => {
      setIsTyping(false)
      const expertMessage = {
        id: messages.length + 2,
        type: 'expert',
        message: getContextualResponse(newMessage),
        timestamp: new Date().toLocaleTimeString().slice(0, 5)
      }
      setMessages(prev => [...prev, expertMessage])
    }, 1000 + Math.random() * 2000)
  }

  const checkMessageForIssues = (message) => {
    const lowerMessage = message.toLowerCase()
    
    // Check for off-topic requests
    if (lowerMessage.includes('다른 일') || lowerMessage.includes('추가 작업') || lowerMessage.includes('급해')) {
      triggerWarning('견적서 범위를 벗어난 요청이 감지되었습니다. 원래 계획을 확인해보세요.')
    }
    
    // Check for unrealistic timeline requests
    if (lowerMessage.includes('빨리') || lowerMessage.includes('내일까지') || lowerMessage.includes('급하게')) {
      triggerWarning('일정 조정이 필요할 수 있습니다. 현실적인 학습 속도를 유지하는 것이 중요합니다.')
    }
  }

  const triggerWarning = (message) => {
    setWarningMessage(message)
    setShowWarning(true)
    
    setTimeout(() => {
      const warningMsg = {
        id: messages.length + 10,
        type: 'system',
        message: `⚠️ AI 가이드: ${message}`,
        timestamp: new Date().toLocaleTimeString().slice(0, 5),
        isWarning: true
      }
      setMessages(prev => [...prev, warningMsg])
    }, 500)
  }

  const getContextualResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase()
    
    if (lowerMessage.includes('질문') || lowerMessage.includes('궁금')) {
      return '좋은 질문이네요! 천천히 설명드릴게요.'
    }
    if (lowerMessage.includes('어렵') || lowerMessage.includes('힘들')) {
      return '처음에는 누구나 어려워합니다. 단계별로 차근차근 해보세요!'
    }
    if (lowerMessage.includes('감사') || lowerMessage.includes('고마')) {
      return '별 말씀을요! 함께 성장해나가는 거니까요 😊'
    }
    if (lowerMessage.includes('시간') || lowerMessage.includes('일정')) {
      return '일정 조율은 언제든 가능해요. 무리하지 마시고 말씀해주세요.'
    }
    
    const responses = [
      '네, 이해했습니다! 다음 단계로 넘어가볼까요?',
      '좋은 접근이에요! 실제로 많이 사용되는 방법입니다.',
      '코드로 한번 보여드릴게요. 화면 공유 가능하신가요?',
      '이 부분은 실무에서도 중요한 포인트예요!',
      '잘 하고 계세요! 조금 더 연습해보시면 완전히 이해하실 거예요.'
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  const handleFileUpload = () => {
    fileInputRef.current?.click()
  }

  const handleScheduleSession = () => {
    alert('화상 교육 일정이 예약되었습니다!\n일시: 이번 주 토요일 오후 2시\n링크는 교육 시작 10분 전에 전송됩니다.')
  }

  const handleViewProgress = () => {
    alert('학습 진도:\n✅ JavaScript 기초 (완료)\n🔄 React 기초 (진행 중 - 60%)\n⏳ 프로젝트 실습 (예정)\n⏳ 배포 및 최적화 (예정)')
  }

  const renderMessage = (message) => {
    if (message.type === 'system') {
      return (
        <div key={message.id} className="text-center mb-md">
          <div className={`badge ${message.isWarning ? 'badge-warning' : 'badge-success'}`} 
               style={{ padding: '8px 16px' }}>
            {message.message}
          </div>
          <div className="text-secondary" style={{ fontSize: '0.75rem', marginTop: '4px' }}>
            {message.timestamp}
          </div>
        </div>
      )
    }

    if (message.type === 'user') {
      return (
        <div key={message.id} className="flex justify-end mb-md">
          <div className="message-bubble user-message">
            <p>{message.message}</p>
            <small className="message-time">{message.timestamp}</small>
          </div>
        </div>
      )
    }

    // Expert message
    return (
      <div key={message.id} className="flex mb-md">
        <div className="flex gap-md" style={{ maxWidth: '70%' }}>
          <img
            src={expert?.image || 'https://i.pravatar.cc/40?img=1'}
            alt={expert?.name || 'Expert'}
            style={{ width: '40px', height: '40px', borderRadius: '50%' }}
          />
          <div className="message-bubble expert-message">
            <p>{message.message}</p>
            <small className="message-time">{message.timestamp}</small>
          </div>
        </div>
      </div>
    )
  }

  if (!expert) {
    return (
      <div className="flex-center" style={{ height: '100vh' }}>
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className="expert-chat-page" style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ 
        padding: '20px', 
        borderBottom: '1px solid var(--gray-200)', 
        background: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div className="flex gap-md">
          <button onClick={() => navigate('/chat')} className="btn btn-secondary btn-small">
            ← 뒤로
          </button>
          <img
            src={expert.image}
            alt={expert.name}
            style={{ width: '48px', height: '48px', borderRadius: '50%' }}
          />
          <div>
            <h3 style={{ margin: 0 }}>{expert.name}</h3>
            <p className="text-secondary" style={{ margin: 0, fontSize: '0.875rem' }}>
              {expert.title} • 온라인
            </p>
          </div>
        </div>
        
        <div className="flex gap-sm">
          <button onClick={handleViewProgress} className="btn btn-outline btn-small">
            📊 진도 확인
          </button>
          <button onClick={handleScheduleSession} className="btn btn-primary btn-small">
            📅 화상 교육
          </button>
        </div>
      </div>

      {/* Warning Banner */}
      {showWarning && (
        <div style={{ 
          padding: '12px 20px', 
          background: 'var(--warning)', 
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <span>⚠️ {warningMessage}</span>
          <button 
            onClick={() => setShowWarning(false)}
            style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
          >
            ×
          </button>
        </div>
      )}

      {/* Expert Info Card */}
      <div className="card" style={{ margin: '20px', marginBottom: '0' }}>
        <div className="flex gap-lg">
          <div>
            <h4>현재 진행 중인 교육</h4>
            <p className="text-secondary">React 웹 개발 마스터 과정</p>
            <div className="flex gap-md mt-sm">
              <span className="badge badge-primary">3개월 과정</span>
              <span className="badge badge-success">60% 진행</span>
            </div>
          </div>
          <div>
            <h5>다음 수업</h5>
            <p className="text-secondary">토요일 오후 2:00</p>
            <p className="text-secondary">React Hooks 심화</p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div style={{ flex: 1, overflow: 'auto', padding: '20px' }}>
        {messages.map(renderMessage)}
        
        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex mb-md">
            <div className="flex gap-md">
              <img
                src={expert.image}
                alt={expert.name}
                style={{ width: '40px', height: '40px', borderRadius: '50%' }}
              />
              <div className="message-bubble expert-message">
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

      {/* Quick Actions */}
      <div style={{ padding: '0 20px' }}>
        <div className="flex gap-sm mb-md">
          <button 
            onClick={() => setNewMessage('수업 자료를 다시 보내주시겠어요?')}
            className="btn btn-secondary btn-small"
          >
            📁 자료 요청
          </button>
          <button 
            onClick={() => setNewMessage('다음 수업 일정을 조정하고 싶어요.')}
            className="btn btn-secondary btn-small"
          >
            📅 일정 조정
          </button>
          <button 
            onClick={() => setNewMessage('궁금한 게 있어서 질문드려요.')}
            className="btn btn-secondary btn-small"
          >
            ❓ 질문하기
          </button>
        </div>
      </div>

      {/* Message Input */}
      <div style={{ padding: '20px', borderTop: '1px solid var(--gray-200)', background: 'white' }}>
        <form onSubmit={handleSendMessage}>
          <div className="flex gap-md">
            <button
              type="button"
              onClick={handleFileUpload}
              className="btn btn-secondary"
              style={{ padding: '12px' }}
            >
              📎
            </button>
            <input
              type="text"
              className="form-input"
              placeholder="메시지를 입력하세요..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              style={{ flex: 1 }}
            />
            <button type="submit" className="btn btn-primary">
              전송
            </button>
          </div>
        </form>
        <input
          ref={fileInputRef}
          type="file"
          style={{ display: 'none' }}
          onChange={(e) => {
            console.log('File selected:', e.target.files[0])
          }}
        />
      </div>

      <style jsx>{`
        .message-bubble {
          max-width: 100%;
          padding: 12px 16px;
          border-radius: 18px;
          word-wrap: break-word;
        }
        
        .user-message {
          background: var(--primary-blue);
          color: white;
          margin-left: auto;
        }
        
        .expert-message {
          background: var(--gray-100);
          color: var(--gray-800);
        }
        
        .message-time {
          opacity: 0.7;
          font-size: 0.75rem;
        }
        
        .user-message .message-time {
          color: rgba(255, 255, 255, 0.8);
        }
        
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

export default ExpertChatPage