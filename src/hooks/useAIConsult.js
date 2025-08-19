import { useState } from 'react';
import { getRecommendedKeywords, getSuggestedDuration } from '../utils/openAI';
import { generateQuotation } from '../utils/quotationGenerator';
import { aiConsultSteps } from '../data/consultSteps';

export const useAIConsult = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [recommendedKeywords, setRecommendedKeywords] = useState([]);
  const [suggestedDuration, setSuggestedDuration] = useState(null);
  const [formData, setFormData] = useState({
    goal: "",
    keywords: [],
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
        
        // AI가 분석한 카테고리를 formData에 저장
        newFormData.category = aiResult.category;
        setFormData(newFormData);

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
    else if (currentStep === 2) newFormData.schedule = message;
    else if (currentStep === 3) newFormData.budget = message;
    else if (currentStep === 4) newFormData.experience = message;

    setFormData(newFormData);

    // 마지막 단계인 경우 AI에게 학습 기간 제안 요청
    if (currentStep === aiConsultSteps.length - 1) {
      try {
        setIsTyping(true);
        const durationSuggestion = await getSuggestedDuration(newFormData);
        setSuggestedDuration(durationSuggestion);

        setTimeout(() => {
          setIsTyping(false);
          
          // AI 제안 기간과 함께 견적서 생성
          const quotationData = generateQuotation({
            ...newFormData,
            duration: durationSuggestion.duration
          }, recommendedKeywords);
          
          const botMessage = {
            id: Date.now() + 1,
            type: "bot",
            message: `분석이 완료되었습니다! 

📊 **AI 학습 기간 분석 결과**
${durationSuggestion.reasoning}

🎯 **학습 로드맵**
${durationSuggestion.milestones.map((milestone, index) => `${index + 1}. ${milestone}`).join('\n')}

맞춤형 견적서를 생성해드렸어요.`,
            timestamp: new Date().toLocaleTimeString().slice(0, 5),
            quotation: quotationData,
          };
          setMessages((prev) => [...prev, botMessage]);
        }, 2000);
      } catch (error) {
        console.error("학습 기간 제안 실패:", error);
        setTimeout(() => {
          setIsTyping(false);
          
          // 오류 시 기본 견적서 생성
          const quotationData = generateQuotation({
            ...newFormData,
            duration: "3개월"
          }, recommendedKeywords);
          
          const botMessage = {
            id: Date.now() + 1,
            type: "bot",
            message: "분석이 완료되었습니다! 맞춤형 견적서를 생성해드렸어요.",
            timestamp: new Date().toLocaleTimeString().slice(0, 5),
            quotation: quotationData,
          };
          setMessages((prev) => [...prev, botMessage]);
        }, 1500);
      }
    } else {
      // 다음 단계로 진행
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
          options: aiConsultSteps[nextStep].options,
        };
        setMessages((prev) => [...prev, botMessage]);
      }, 1500);
    }
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