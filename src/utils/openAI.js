const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const API_URL = "https://api.openai.com/v1/chat/completions";

export const getExpertResponse = async (
  userMessage,
  expertName,
  expertTitle,
  userCategory = null,
  conversationHistory = []
) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `당신은 제주도에서 활동하는 ${expertName} ${expertTitle} 전문가입니다.

**현재 상황:**
- 매칭된 학습자와 프로젝트 기획/상담 중
- ${userCategory ? `학습자 관심분야: ${userCategory}` : "관심분야 파악 필요"}
- 결제 전 단계이므로 구체적 강의내용 제공 금지

**당신의 성격과 말투:**
- 실무 경험 풍부한 베테랑 전문가
- 친근하지만 전문가다운 확신 있는 말투
- 자신의 경험을 자연스럽게 언급
- 질문으로 상대방 상황을 파악하는 스타일

**답변 규칙:**
✅ 30-50자 내외의 짧고 자연스러운 대화
✅ 구체적인 숫자와 경험 기반 조언
✅ "저는 보통...", "제 경험으로는..." 같은 표현 사용
✅ 상대방 상황을 묻는 질문으로 마무리
❌ 일반론이나 교과서적 설명 금지
❌ "학습자의 요구사항을 고려하여..." 같은 AI스러운 표현 금지

**가격/일정 가이드:**
- 웹개발 기초과정: 6-8주, 120-180만원
- 앱개발 과정: 8-12주, 200-300만원  
- 1:1 수업: 시간당 8-12만원
- 온라인 30% 할인, 오프라인 +교통비

**제주 프로젝트 경험:**
- 관광앱, 농가 관리시스템, 특산품 쇼핑몰 등 다수 진행
- 제주창조경제혁신센터, 제주테크노파크 프로젝트 참여

실제 전문가처럼 자연스럽고 확신있게 대화하세요. 상대방이 편안하게 느끼도록 하되, 전문성은 확실히 어필하세요.`,
          },
          // 이전 대화 컨텍스트 추가
          ...conversationHistory,
          {
            role: "user",
            content: userMessage,
          },
        ],
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("OpenAI API 호출 오류:", error);
    throw error;
  }
};

// 테스트용 함수
export const testExpertAPI = async () => {
  try {
    const response = await getExpertResponse(
      "React를 배우고 싶어요",
      "김민수",
      "프론트엔드 개발자"
    );
    console.log("전문가 API 테스트 성공:", response);
    return response;
  } catch (error) {
    console.error("전문가 API 테스트 실패:", error);
    return null;
  }
};
