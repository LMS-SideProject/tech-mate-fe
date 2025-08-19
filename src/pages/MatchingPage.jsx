import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { categories } from "../data/mockData";
import { generateDirectQuotation } from "../utils/quotationGenerator";
import { useAIConsult } from "../hooks/useAIConsult";
import ChatMessage from "../components/ChatMessage";

function MatchingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const chatEndRef = useRef(null);

  // 상태 관리
  const [chatMode, setChatMode] = useState(null); // 'ai-consult' or 'quotation'
  const [messages, setMessages] = useState([]);
  const [currentInput, setCurrentInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // AI 상담 훅
  const {
    currentStep,
    formData,
    handleAIConsultFlow,
    handleKeywordSelect,
    handleSubmitKeywords,
  } = useAIConsult();

  // 초기 메시지 설정
  useEffect(() => {
    const initialQuery = location.state?.query;
    if (initialQuery) {
      setMessages([
        {
          id: 1,
          type: "bot",
          message: `"${initialQuery}"에 대해 도움을 드리겠습니다! 어떤 방식으로 진행하시겠습니까?`,
          timestamp: new Date().toLocaleTimeString().slice(0, 5),
          options: [
            { text: "AI 상담받기", value: "ai-consult" },
            { text: "견적서 바로 작성", value: "quotation" },
          ],
        },
      ]);
    } else {
      setMessages([
        {
          id: 1,
          type: "bot",
          message: "안녕하세요! Tech Mate AI 상담사입니다. 어떤 방식으로 도움을 드릴까요?",
          timestamp: new Date().toLocaleTimeString().slice(0, 5),
          options: [
            { text: "AI 상담받기", value: "ai-consult" },
            { text: "견적서 바로 작성", value: "quotation" },
          ],
        },
      ]);
    }
  }, [location.state]);

  // 자동 스크롤
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 옵션 클릭 처리
  const handleOptionClick = (option) => {
    const userMessage = {
      id: messages.length + 1,
      type: "user",
      message: option.text,
      timestamp: new Date().toLocaleTimeString().slice(0, 5),
    };
    setMessages((prev) => [...prev, userMessage]);

    if (option.value === "ai-consult") {
      setChatMode("ai-consult");
      setTimeout(() => {
        const botMessage = {
          id: messages.length + 2,
          type: "bot",
          message: "어떤 것을 만들고 싶으신가요?",
          timestamp: new Date().toLocaleTimeString().slice(0, 5),
        };
        setMessages((prev) => [...prev, botMessage]);
      }, 1000);
    } else if (option.value === "quotation") {
      setChatMode("quotation");
      setTimeout(() => {
        const botMessage = {
          id: messages.length + 2,
          type: "bot",
          message: "어떤 분야의 견적서를 작성하시겠습니까?",
          timestamp: new Date().toLocaleTimeString().slice(0, 5),
          categories: categories,
        };
        setMessages((prev) => [...prev, botMessage]);
      }, 1000);
    }
  };

  // 메시지 전송 처리
  const handleSendMessage = (message) => {
    const userMessage = {
      id: messages.length + 1,
      type: "user",
      message: message,
      timestamp: new Date().toLocaleTimeString().slice(0, 5),
    };
    setMessages((prev) => [...prev, userMessage]);
    setCurrentInput("");
    setIsTyping(true);

    if (chatMode === "ai-consult") {
      handleAIConsultFlow(message, setMessages, setIsTyping);
    } else if (chatMode === "quotation") {
      handleQuotationFlow(message);
    }
  };

  // 견적서 바로 작성 플로우
  const handleQuotationFlow = (categoryName) => {
    setTimeout(() => {
      setIsTyping(false);
      const quotationData = generateDirectQuotation(categoryName);
      const botMessage = {
        id: messages.length + 2,
        type: "bot",
        message: `${categoryName} 분야의 견적서를 생성해드렸습니다.`,
        timestamp: new Date().toLocaleTimeString().slice(0, 5),
        quotation: quotationData,
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1500);
  };

  // 견적서 확인 처리
  const handleQuotationConfirm = (quotationData) => {
    navigate("/experts/matched", { state: { quotation: quotationData } });
  };

  // 키워드 초기화 처리
  const handleKeywordSelectWrapper = (keyword) => {
    handleKeywordSelect(keyword);
  };

  // 키워드 제출 처리
  const handleSubmitKeywordsWrapper = () => {
    handleSubmitKeywords(handleSendMessage);
  };

  return (
    <div
      className="matching-page"
      style={{ height: "100vh", display: "flex", flexDirection: "column" }}
    >
      {/* Header */}
      <div
        style={{
          padding: "20px 0",
          borderBottom: "1px solid var(--gray-200)",
          background: "white",
        }}
      >
        <div className="container">
          <h2>🤖 AI 매칭 상담</h2>
        </div>
      </div>

      {/* Chat Area */}
      <div style={{ flex: 1, overflow: "auto", padding: "20px 0" }}>
        <div className="container">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
              formData={formData}
              onOptionClick={handleOptionClick}
              onCategorySelect={handleSendMessage}
              onKeywordSelect={handleKeywordSelectWrapper}
              onSubmitKeywords={handleSubmitKeywordsWrapper}
              onQuotationConfirm={handleQuotationConfirm}
            />
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex mb-md">
              <div className="flex gap-md">
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    background: "var(--primary-blue)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontSize: "1.2rem",
                  }}
                >
                  🤖
                </div>
                <div className="card">
                  <div className="flex gap-xs">
                    <div className="typing-dot"></div>
                    <div className="typing-dot"></div>
                    <div className="typing-dot"></div>
                  </div>
                  <small className="text-secondary mt-sm">
                    AI가 분석 중입니다...
                  </small>
                </div>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>
      </div>

      {/* Input Area */}
      {chatMode && currentStep === 0 && (
        <div
          style={{
            borderTop: "1px solid var(--gray-200)",
            padding: "20px 0",
            background: "white",
          }}
        >
          <div className="container">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (currentInput.trim()) {
                  handleSendMessage(currentInput);
                }
              }}
            >
              <div className="flex gap-md">
                <input
                  type="text"
                  className="form-input"
                  placeholder="만들고 싶은 것을 구체적으로 설명해주세요..."
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

      <style>{`
        .typing-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: var(--gray-400);
          animation: typing 1.4s infinite;
        }

        .typing-dot:nth-child(1) {
          animation-delay: 0s;
        }
        .typing-dot:nth-child(2) {
          animation-delay: 0.2s;
        }
        .typing-dot:nth-child(3) {
          animation-delay: 0.4s;
        }

        @keyframes typing {
          0%,
          60%,
          100% {
            transform: scale(0.8);
            opacity: 0.5;
          }
          30% {
            transform: scale(1.2);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

export default MatchingPage;