import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { experts } from '../data/mockData'

function ChatPage() {
  const navigate = useNavigate()
  const fileInputRef = useRef(null)
  const chatEndRef = useRef(null)
  
  const [conversations, setConversations] = useState([])
  const [selectedConversation, setSelectedConversation] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    // Initialize conversations with mock data
    const mockConversations = experts.slice(0, 3).map(expert => ({
      id: expert.id,
      expertId: expert.id,
      expertName: expert.name,
      expertImage: expert.image,
      expertTitle: expert.title,
      lastMessage: '안녕하세요! 매칭 요청 감사합니다.',
      lastMessageTime: '10:30',
      unreadCount: Math.floor(Math.random() * 3),
      isOnline: Math.random() > 0.5
    }))
    
    setConversations(mockConversations)
    if (mockConversations.length > 0) {
      setSelectedConversation(mockConversations[0])
      loadMessages(mockConversations[0].expertId)
    }
  }, [])

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const loadMessages = (expertId) => {
    // Mock messages for the selected conversation
    const mockMessages = [
      {
        id: 1,
        type: 'expert',
        message: '안녕하세요! 매칭 요청 감사합니다.',
        timestamp: '10:30',
        expertId: expertId
      },
      {
        id: 2,
        type: 'system',
        message: '매칭이 성공적으로 완료되었습니다! 🎉',
        timestamp: '10:31'
      },
      {
        id: 3,
        type: 'user',
        message: '안녕하세요! 웹 개발을 배우고 싶습니다.',
        timestamp: '10:32'
      },
      {
        id: 4,
        type: 'expert',
        message: '좋습니다! 먼저 현재 어느 정도 수준이신지 알려주시겠어요?',
        timestamp: '10:33',
        expertId: expertId
      },
      {
        id: 5,
        type: 'user',
        message: 'HTML, CSS는 기본적으로 알고 있고, JavaScript를 배우고 싶어요.',
        timestamp: '10:35'
      },
      {
        id: 6,
        type: 'expert',
        message: '네, 그렇다면 React부터 시작해보는 게 좋을 것 같아요. 언제부터 시작할 수 있으신가요?',
        timestamp: '10:36',
        expertId: expertId
      }
    ]
    setMessages(mockMessages)
  }

  const handleConversationSelect = (conversation) => {
    setSelectedConversation(conversation)
    loadMessages(conversation.expertId)
    
    // Mark as read
    setConversations(prev => prev.map(conv => 
      conv.id === conversation.id 
        ? { ...conv, unreadCount: 0 }
        : conv
    ))
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
    setNewMessage('')
    setIsTyping(true)

    // Simulate expert response
    setTimeout(() => {
      setIsTyping(false)
      const expertMessage = {
        id: messages.length + 2,
        type: 'expert',
        message: getRandomResponse(),
        timestamp: new Date().toLocaleTimeString().slice(0, 5),
        expertId: selectedConversation.expertId
      }
      setMessages(prev => [...prev, expertMessage])
    }, 1000 + Math.random() * 2000)

    // Update conversation last message
    setConversations(prev => prev.map(conv =>
      conv.id === selectedConversation.id
        ? { ...conv, lastMessage: newMessage, lastMessageTime: userMessage.timestamp }
        : conv
    ))
  }

  const getRandomResponse = () => {
    const responses = [
      '네, 좋은 질문이에요! 차근차근 설명드릴게요.',
      '그 부분은 실무에서도 자주 사용되는 패턴이에요.',
      '한번 같이 코드를 작성해볼까요?',
      '이해가 잘 되시나요? 더 궁금한 점 있으시면 언제든 물어보세요!',
      '좋습니다! 다음 단계로 넘어가볼까요?'
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  const handleFileUpload = () => {
    fileInputRef.current?.click()
  }

  const renderMessage = (message) => {
    if (message.type === 'system') {
      return (
        <div key={message.id} className="text-center mb-md">
          <div className="badge badge-success" style={{ padding: '8px 16px' }}>
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
    const expert = experts.find(e => e.id === message.expertId)
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

  return (
    <div className="chat-page" style={{ height: '100vh', display: 'flex' }}>
      {/* Conversations Sidebar */}
      <div style={{ width: '320px', borderRight: '1px solid var(--gray-200)', background: 'var(--gray-50)' }}>
        <div style={{ padding: '20px', borderBottom: '1px solid var(--gray-200)' }}>
          <h3>대화 목록</h3>
        </div>
        
        <div style={{ height: 'calc(100vh - 80px)', overflow: 'auto' }}>
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`conversation-item ${selectedConversation?.id === conversation.id ? 'active' : ''}`}
              style={{
                padding: '16px 20px',
                cursor: 'pointer',
                borderBottom: '1px solid var(--gray-200)',
                backgroundColor: selectedConversation?.id === conversation.id ? 'var(--primary-light)' : 'transparent'
              }}
              onClick={() => handleConversationSelect(conversation)}
            >
              <div className="flex gap-md">
                <div style={{ position: 'relative' }}>
                  <img
                    src={conversation.expertImage}
                    alt={conversation.expertName}
                    style={{ width: '48px', height: '48px', borderRadius: '50%' }}
                  />
                  {conversation.isOnline && (
                    <div style={{
                      position: 'absolute',
                      bottom: '0',
                      right: '0',
                      width: '12px',
                      height: '12px',
                      background: 'var(--success)',
                      borderRadius: '50%',
                      border: '2px solid white'
                    }} />
                  )}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="flex flex-between mb-xs">
                    <h5 style={{ margin: 0 }}>{conversation.expertName}</h5>
                    <small className="text-secondary">{conversation.lastMessageTime}</small>
                  </div>
                  <p className="text-secondary" style={{ 
                    margin: 0, 
                    fontSize: '0.875rem',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {conversation.expertTitle}
                  </p>
                  <p style={{ 
                    margin: '4px 0 0 0', 
                    fontSize: '0.875rem',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {conversation.lastMessage}
                  </p>
                </div>
                {conversation.unreadCount > 0 && (
                  <div className="badge badge-error" style={{ 
                    minWidth: '20px', 
                    height: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.75rem'
                  }}>
                    {conversation.unreadCount}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      {selectedConversation ? (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Chat Header */}
          <div style={{ 
            padding: '20px', 
            borderBottom: '1px solid var(--gray-200)', 
            background: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div className="flex gap-md">
              <img
                src={selectedConversation.expertImage}
                alt={selectedConversation.expertName}
                style={{ width: '40px', height: '40px', borderRadius: '50%' }}
              />
              <div>
                <h4 style={{ margin: 0 }}>{selectedConversation.expertName}</h4>
                <p className="text-secondary" style={{ margin: 0, fontSize: '0.875rem' }}>
                  {selectedConversation.expertTitle}
                </p>
              </div>
            </div>
            
            <button 
              className="btn btn-outline btn-small"
              onClick={() => navigate(`/chat/expert/${selectedConversation.expertId}`)}
            >
              상세 채팅
            </button>
          </div>

          {/* Messages Area */}
          <div style={{ flex: 1, overflow: 'auto', padding: '20px' }}>
            {messages.map(renderMessage)}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex mb-md">
                <div className="flex gap-md">
                  <img
                    src={selectedConversation.expertImage}
                    alt={selectedConversation.expertName}
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
                // Handle file upload
                console.log('File selected:', e.target.files[0])
              }}
            />
          </div>
        </div>
      ) : (
        <div style={{ 
          flex: 1, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          background: 'var(--gray-50)'
        }}>
          <p className="text-secondary">대화를 선택해주세요</p>
        </div>
      )}

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

export default ChatPage