import { quotation } from '../data/mockData';

export const generateQuotation = (formData, recommendedKeywords) => {
  return {
    goal: formData.goal,
    category: formData.category || quotation.category,
    keywords: formData.keywords.length > 0 ? formData.keywords : recommendedKeywords,
    duration: formData.duration || quotation.duration,
    schedule: formData.schedule || quotation.schedule,
    budget: formData.budget || quotation.budget,
    experience: formData.experience,
    description: formData.goal ? `${formData.goal}을(를) 위한 맞춤형 교육` : quotation.description,
    requirements: formData.experience === '초급 (경험 없음)' 
      ? '프로그래밍 기초 지식 불필요' 
      : '기초 지식 보유자 대상',
  };
};

export const generateDirectQuotation = (categoryName) => {
  return {
    ...quotation,
    category: categoryName,
  };
};