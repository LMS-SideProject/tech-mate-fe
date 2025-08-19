import { useState } from 'react';
import { getRecommendedKeywords } from '../utils/openAI';
import { generateQuotation } from '../utils/quotationGenerator';
import { aiConsultSteps } from '../data/consultSteps';

export const useAIConsult = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [recommendedKeywords, setRecommendedKeywords] = useState([]);
  const [formData, setFormData] = useState({
    goal: "",
    keywords: [],
    duration: "",
    schedule: "",
    budget: "",
    experience: "",
  });

  const handleAIConsultFlow = async (message, setMessages, setIsTyping) => {
    const step = aiConsultSteps[currentStep];
    const newFormData = { ...formData };

    // 첫 번째 질문 (목표) 처리
    if (currentStep === 0) {
      newFormData.goal = message;
      setFormData(newFormData);

      try {
        setIsTyping(true);
        const aiResult = await getRecommendedKeywords(message);
        setRecommendedKeywords(aiResult.keywords);

        setTimeout(() => {
          setIsTyping(false);
          const nextStep = currentStep + 1;
          setCurrentStep(nextStep);

          const botMessage = {
            id: Date.now() + 1,
            type: "bot",
            message: `${aiResult.explanation}\n\n${aiConsultSteps[nextStep].question}`,
            timestamp: new Date().toLocaleTimeString().slice(0, 5),
            stepType: aiConsultSteps[nextStep].type,
            options: aiResult.keywords,
          };
          setMessages((prev) => [...prev, botMessage]);
        }, 1500);
      } catch (error) {
        console.error("키워드 추천 실패:", error);
        setTimeout(() => {
          setIsTyping(false);
          const nextStep = currentStep + 1;
          setCurrentStep(nextStep);

          const botMessage = {
            id: Date.now() + 1,
            type: "bot",
            message: aiConsultSteps[nextStep].question,
            timestamp: new Date().toLocaleTimeString().slice(0, 5),
            stepType: aiConsultSteps[nextStep].type,
            options: ["HTML/CSS", "JavaScript", "기초 프로그래밍"],
          };
          setMessages((prev) => [...prev, botMessage]);
        }, 1500);
      }
      return;
    }

    // 나머지 단계 처리
    if (currentStep === 1) newFormData.keywords = formData.keywords;
    else if (currentStep === 2) newFormData.duration = message;
    else if (currentStep === 3) newFormData.schedule = message;
    else if (currentStep === 4) newFormData.budget = message;
    else if (currentStep === 5) newFormData.experience = message;

    setFormData(newFormData);

    setTimeout(() => {
      setIsTyping(false);

      if (currentStep < aiConsultSteps.length - 1) {
        const nextStep = currentStep + 1;
        setCurrentStep(nextStep);

        const botMessage = {
          id: Date.now() + 1,
          type: "bot",
          message: aiConsultSteps[nextStep].question,
          timestamp: new Date().toLocaleTimeString().slice(0, 5),
          stepType: aiConsultSteps[nextStep].type,
          options: aiConsultSteps[nextStep].options,
        };
        setMessages((prev) => [...prev, botMessage]);
      } else {
        // AI 상담 완료 - 견적서 생성
        const quotationData = generateQuotation(newFormData, recommendedKeywords);
        const botMessage = {
          id: Date.now() + 1,
          type: "bot",
          message: "분석이 완료되었습니다! 맞춤형 견적서를 생성해드렸어요.",
          timestamp: new Date().toLocaleTimeString().slice(0, 5),
          quotation: quotationData,
        };
        setMessages((prev) => [...prev, botMessage]);
      }
    }, 1500);
  };

  const handleKeywordSelect = (keyword) => {
    if (keyword === 'reset') {
      setFormData({ ...formData, keywords: [] });
      return;
    }
    
    const newKeywords = formData.keywords.includes(keyword)
      ? formData.keywords.filter((k) => k !== keyword)
      : [...formData.keywords, keyword];

    setFormData({ ...formData, keywords: newKeywords });
  };

  const handleSubmitKeywords = (handleSendMessage) => {
    const message = `선택된 키워드: ${formData.keywords.join(", ")}`;
    handleSendMessage(message);
  };

  return {
    currentStep,
    formData,
    handleAIConsultFlow,
    handleKeywordSelect,
    handleSubmitKeywords,
  };
};