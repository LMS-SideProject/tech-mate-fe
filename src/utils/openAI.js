import { getExpertPrompt, getKeywordRecommendationPrompt } from '../prompts/aiPrompts';

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
        keywords: parsed.keywords,
        explanation: parsed.explanation,
      };
    } catch (parseError) {
      console.error("JSON 파싱 오류:", parseError);
      // 파싱 실패시 기본 키워드 반환
      return {
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
      keywords: ["HTML/CSS", "JavaScript", "기초 프로그래밍", "프로젝트 관리"],
      explanation: "기본적인 웹 개발 기술을 추천드립니다.",
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
