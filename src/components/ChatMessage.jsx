import { categories, quotation } from '../data/mockData';

function ChatMessage({ 
  message, 
  formData, 
  onOptionClick, 
  onCategorySelect, 
  onKeywordSelect, 
  onSubmitKeywords, 
  onQuotationConfirm 
}) {
  // 사용자 메시지 렌더링
  if (message.type === "user") {
    return (
      <div key={message.id} className="flex justify-end mb-md">
        <div
          className="card"
          style={{
            background: "var(--primary-blue)",
            color: "white",
            maxWidth: "70%",
            marginLeft: "auto",
          }}
        >
          <p>{message.message}</p>
          <small className="text-gray-300">{message.timestamp}</small>
        </div>
      </div>
    );
  }

  // 봇 메시지 렌더링
  return (
    <div key={message.id} className="flex mb-md">
      <div className="flex gap-md" style={{ maxWidth: "70%" }}>
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
          <p className="mb-sm" style={{ whiteSpace: "pre-line" }}>
            {message.message}
          </p>
          <small className="text-secondary">{message.timestamp}</small>

          {/* 기본 옵션 버튼들 */}
          {message.options && (
            <div className="mt-md flex gap-sm flex-wrap">
              {message.options.map((option, index) => (
                <button
                  key={index}
                  className="btn btn-outline btn-small"
                  onClick={() => onOptionClick(option)}
                >
                  {option.text}
                </button>
              ))}
            </div>
          )}

          {/* 카테고리 선택 */}
          {message.categories && (
            <div className="mt-md flex gap-sm flex-wrap">
              {message.categories.map((category) => (
                <button
                  key={category.id}
                  className="btn btn-outline btn-small"
                  onClick={() => onCategorySelect(category.name)}
                >
                  {category.icon} {category.name}
                </button>
              ))}
            </div>
          )}

          {/* 키워드 선택 (AI 추천) */}
          {message.stepType === "keywords" && (
            <div className="mt-md">
              <div className="flex gap-sm flex-wrap mb-md">
                {message.options.map((keyword, index) => (
                  <button
                    key={index}
                    className={`btn btn-small ${
                      formData.keywords.includes(keyword)
                        ? "btn-primary"
                        : "btn-secondary"
                    }`}
                    onClick={() => onKeywordSelect(keyword)}
                  >
                    {keyword}
                  </button>
                ))}
              </div>
              <div className="flex gap-sm">
                <button
                  className="btn btn-primary btn-small"
                  onClick={onSubmitKeywords}
                  disabled={formData.keywords.length === 0}
                >
                  선택 완료 ({formData.keywords.length}개)
                </button>
                <button
                  className="btn btn-secondary btn-small"
                  onClick={() => {
                    onKeywordSelect('reset');
                  }}
                >
                  선택 초기화
                </button>
              </div>
            </div>
          )}

          {/* 버튼 옵션들 */}
          {message.stepType === "buttons" && (
            <div className="mt-md flex gap-sm flex-wrap">
              {message.options.map((option, index) => (
                <button
                  key={index}
                  className="btn btn-outline btn-small"
                  onClick={() => onCategorySelect(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          {/* 견적서 */}
          {message.quotation && (
            <div className="card bg-gradient-blue mt-md">
              <h4 className="mb-md">🎯 맞춤형 견적서</h4>

              {message.quotation.goal && (
                <div className="mb-md">
                  <strong>목표:</strong> {message.quotation.goal}
                </div>
              )}

              <div className="mb-md">
                <strong>분야:</strong> {message.quotation.category}
              </div>

              {message.quotation.duration && (
                <div className="mb-md">
                  <strong>학습 기간:</strong> {message.quotation.duration}
                </div>
              )}

              {message.quotation.schedule && (
                <div className="mb-md">
                  <strong>일정:</strong> {message.quotation.schedule}
                </div>
              )}

              <div className="mb-md">
                <strong>예산:</strong>{" "}
                {message.quotation.budget ||
                  "₩" + quotation.budget.toLocaleString()}
              </div>

              {message.quotation.experience && (
                <div className="mb-md">
                  <strong>경험 수준:</strong> {message.quotation.experience}
                </div>
              )}

              <div className="mb-md">
                <strong>필요 학습 기술:</strong>
                <div className="flex gap-xs mt-sm flex-wrap">
                  {message.quotation.keywords.map((keyword, index) => (
                    <span key={index} className="badge badge-primary">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>

              <button
                className="btn btn-primary btn-full mt-md"
                onClick={() => onQuotationConfirm(message.quotation)}
              >
                🚀 전문가 매칭 시작
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatMessage;