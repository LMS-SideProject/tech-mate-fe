import { getExpertPrompt, getKeywordRecommendationPrompt, getLearningDurationPrompt } from '../prompts/aiPrompts';

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const API_URL = "https://api.openai.com/v1/chat/completions";

// 공통 OpenAI API 호출 함수
const callOpenAI = async (messages, options = {}) => {
  const {
    maxTokens = 300,
    temperature = 0.7,
    model = "gpt-3.5-turbo"
  } = options;

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model,
        messages,
        max_tokens: maxTokens,
        temperature,
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

// 전문가 응답 생성
export const getExpertResponse = async (
  userMessage,
  expertName,
  expertTitle,
  userCategory = null,
  conversationHistory = []
) => {
  const messages = [
    {
      role: "system",
      content: getExpertPrompt(expertName, expertTitle, userCategory),
    },
    ...conversationHistory,
    {
      role: "user",
      content: userMessage,
    },
  ];

  return await callOpenAI(messages, { maxTokens: 300 });
};

// 키워드 추천 생성
export const getRecommendedKeywords = async (userGoal) => {
  const messages = [
    {
      role: "system",
      content: getKeywordRecommendationPrompt(),
    },
    {
      role: "user",
      content: `사용자가 만들고 싶어하는 것: "${userGoal}"`,
    },
  ];

  try {
    const aiResponse = await callOpenAI(messages, { maxTokens: 500 });
    
    try {
      const parsed = JSON.parse(aiResponse);
      return {
        category: parsed.category,
        keywords: parsed.keywords,
        explanation: parsed.explanation,
      };
    } catch (parseError) {
      console.error("JSON 파싱 오류:", parseError);
      // 파싱 실패시 기본 키워드 반환
      return {
        category: "웹 개발",
        keywords: [
          "HTML/CSS",
          "JavaScript",
          "기초 프로그래밍",
          "프로젝트 관리",
        ],
        explanation: "기본적인 웹 개발 기술을 추천드립니다.",
      };
    }
  } catch (error) {
    console.error("키워드 추천 API 호출 오류:", error);
    // API 호출 실패시 기본 키워드 반환
    return {
      category: "웹 개발",
      keywords: ["HTML/CSS", "JavaScript", "기초 프로그래밍", "프로젝트 관리"],
      explanation: "기본적인 웹 개발 기술을 추천드립니다.",
    };
  }
};

// 학습 기간 제안 생성
export const getSuggestedDuration = async (formData) => {
  const { goal, keywords, schedule, experience } = formData;
  
  const messages = [
    {
      role: "system",
      content: getLearningDurationPrompt(),
    },
    {
      role: "user",
      content: `
목표: ${goal}
선택된 기술: ${keywords.join(', ')}
학습 일정: ${schedule}
경험 수준: ${experience}

위 정보를 바탕으로 적절한 학습 기간을 제안해주세요.`,
    },
  ];

  try {
    const aiResponse = await callOpenAI(messages, { maxTokens: 400 });
    
    try {
      const parsed = JSON.parse(aiResponse);
      return {
        duration: parsed.duration,
        reasoning: parsed.reasoning,
        milestones: parsed.milestones || [],
      };
    } catch (parseError) {
      console.error("학습 기간 JSON 파싱 오류:", parseError);
      // 파싱 실패시 기본 기간 반환
      return {
        duration: "3개월",
        reasoning: "선택하신 기술과 경험 수준을 고려하여 3개월 정도의 학습 기간을 추천드립니다.",
        milestones: ["1개월차: 기초 학습", "2개월차: 심화 학습", "3개월차: 프로젝트 완성"],
      };
    }
  } catch (error) {
    console.error("학습 기간 제안 API 호출 오류:", error);
    // API 호출 실패시 기본 기간 반환
    return {
      duration: "3개월",
      reasoning: "선택하신 기술과 경험 수준을 고려하여 3개월 정도의 학습 기간을 추천드립니다.",
      milestones: ["1개월차: 기초 학습", "2개월차: 심화 학습", "3개월차: 프로젝트 완성"],
    };
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
