// AI 상담 단계별 질문 정의
export const aiConsultSteps = [
  {
    question: "어떤 것을 만들고 싶으신가요?",
    type: "text",
    placeholder:
      "예: 쇼핑몰 웹사이트, AI 이미지 생성 도구, 데이터 분석 대시보드",
  },
  {
    question: "추천된 학습 키워드 중에서 관심 있는 것을 선택해주세요:",
    type: "keywords",
    options: [], // 동적으로 설정됨
  },
  {
    question: "일정은 어떻게 원하시나요?",
    type: "buttons",
    options: ["주 1회 2시간", "주 2회 2시간", "주 3회 1시간", "매일 1시간"],
  },
  {
    question: "시간당 예산은 어느 정도 생각하고 계신가요?",
    type: "buttons",
    options: ["5만원 이하", "5-10만원", "10-15만원", "15만원 이상"],
  },
  {
    question: "해당 분야 경험은 어느 정도이신가요?",
    type: "buttons",
    options: ["초급 (경험 없음)", "중급 (기초 지식)", "고급 (실무 경험)"],
  },
];
