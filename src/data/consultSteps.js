// AI 상담 단계별 질문 정의
export const aiConsultSteps = [
  {
    question: "어떤 것을 만들고 싶으신가요?",
    type: "text",
    placeholder: "예: 쇼핑몰 웹사이트, AI 이미지 생성 도구, 데이터 분석 대시보드",
  },
  {
    question: "추천된 학습 키워드 중에서 관심 있는 것을 선택해주세요:",
    type: "keywords",
    options: [], // 동적으로 설정됨
  },
  {
    question: "희망하는 학습 기간은 어느 정도인가요?",
    type: "buttons",
    options: ["1개월", "3개월", "6개월", "1년"],
  },
  {
    question: "일정은 어떻게 원하시나요?",
    type: "buttons",
    options: ["주 1회 2시간", "주 2회 2시간", "주 3회 1시간", "매일 1시간"],
  },
  {
    question: "예산은 어느 정도 생각하고 계신가요?",
    type: "buttons",
    options: ["50만원 이하", "50-100만원", "100-200만원", "200만원 이상"],
  },
  {
    question: "해당 분야 경험은 어느 정도이신가요?",
    type: "buttons",
    options: ["초급 (경험 없음)", "중급 (기초 지식)", "고급 (실무 경험)"],
  },
];