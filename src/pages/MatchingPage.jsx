import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SessionManager } from '../utils/sessionManager';
import '../styles/global.css';

const MatchingPage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [selectedExpert, setSelectedExpert] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Mock expert data - in real app this would come from API
  const experts = [
    {
      id: 1,
      name: '김민수',
      title: 'Senior Frontend Developer',
      company: '네이버',
      experience: '7년',
      avatar: '👨‍💻',
      rating: 4.9,
      reviewCount: 127,
      specialties: ['React', 'JavaScript', 'TypeScript', 'Next.js'],
      price: '회당 8만원',
      responseTime: '평균 2시간 내 응답',
      description: '네이버에서 7년간 프론트엔드 개발을 담당하고 있으며, React 생태계 전문가입니다. 초보자부터 중급자까지 단계별 맞춤 교육이 가능합니다.',
      matchPercentage: 95,
      schedule: ['평일 저녁', '주말'],
      method: '온라인/오프라인'
    },
    {
      id: 2,
      name: '박지영',
      title: 'Full Stack Developer',
      company: '카카오',
      experience: '5년',
      avatar: '👩‍💻',
      rating: 4.8,
      reviewCount: 89,
      specialties: ['Python', 'Django', 'AWS', 'React'],
      price: '회당 7만원',
      responseTime: '평균 1시간 내 응답',
      description: '카카오에서 백엔드와 프론트엔드를 모두 다루는 풀스택 개발자입니다. 실무 중심의 프로젝트 기반 학습을 지향합니다.',
      matchPercentage: 88,
      schedule: ['평일 오후', '주말'],
      method: '온라인'
    },
    {
      id: 3,
      name: '이준호',
      title: 'DevOps Engineer',
      company: '쿠팡',
      experience: '6년',
      avatar: '👨‍🔧',
      rating: 4.7,
      reviewCount: 156,
      specialties: ['AWS', 'Docker', 'Kubernetes', 'CI/CD'],
      price: '회당 9만원',
      responseTime: '평균 3시간 내 응답',
      description: '대규모 트래픽 처리 경험이 풍부한 DevOps 전문가입니다. 클라우드 인프라부터 배포 자동화까지 체계적으로 가르쳐드립니다.',
      matchPercentage: 82,
      schedule: ['평일 저녁', '주말 오전'],
      method: '온라인/오프라인'
    }
  ];

  useEffect(() => {
    // Load user data from session
    const sessionData = SessionManager.getUserData();
    setUserData(sessionData);
    
    // Check login status
    setIsLoggedIn(SessionManager.isLoggedIn());
  }, []);

  const handleViewProfile = (expert) => {
    // Save selected expert to session
    SessionManager.updateUserData({ selectedExpert: expert });
    
    if (isLoggedIn) {
      navigate(`/profile/${expert.id}`);
    } else {
      // Redirect to signup with return path
      navigate(`/signup?returnTo=/profile/${expert.id}`);
    }
  };

  const handleMatchRequest = (expert) => {
    setSelectedExpert(expert);
    SessionManager.updateUserData({ selectedExpert: expert });
    
    if (isLoggedIn) {
      navigate('/matching-request');
    } else {
      navigate(`/signup?returnTo=/matching-request`);
    }
  };

  const handleSignupCTA = () => {
    navigate('/signup?returnTo=/matching');
  };

  return (
    <div className="matching-page">
      <div className="container">
        {/* Header Section */}
        <div className="matching-header text-center mt-12 mb-12">
          <h1 className="h2 mb-4">당신에게 딱 맞는 전문가를 찾았어요! 🎯</h1>
          <div className="user-requirements card" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h3 className="h5 mb-4">요청 정보</h3>
            <div className="requirements-grid">
              <div className="requirement-item">
                <span className="requirement-label">학습 목표:</span>
                <span className="requirement-value">{userData.skill || '정보 없음'}</span>
              </div>
              <div className="requirement-item">
                <span className="requirement-label">예산:</span>
                <span className="requirement-value">{userData.budget || '정보 없음'}</span>
              </div>
              <div className="requirement-item">
                <span className="requirement-label">일정:</span>
                <span className="requirement-value">{userData.schedule || '정보 없음'}</span>
              </div>
              <div className="requirement-item">
                <span className="requirement-label">현재 직군:</span>
                <span className="requirement-value">{userData.currentJob || '정보 없음'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Expert Cards */}
        <div className="experts-section">
          <h2 className="h3 mb-12 text-center">추천 전문가</h2>
          
          <div className="experts-grid-3x1">
            {experts.map((expert, index) => (
              <div 
                key={expert.id} 
                className={`expert-card-float expert-card-${index + 1} ${!isLoggedIn ? 'expert-card-signup' : ''}`}
                style={{ 
                  animationDelay: `${index * 0.2}s`,
                  '--float-offset': `${(index - 1) * 10}px`
                }}
              >
                <div className="expert-card-inner">
                  <div className="expert-header">
                    <div className="expert-avatar-large">{expert.avatar}</div>
                    <div className="match-badge-float">{expert.matchPercentage}% 매칭</div>
                  </div>
                  
                  <div className="expert-info">
                    <h3 className="expert-name">{expert.name}</h3>
                    <p className="expert-title">{expert.title}</p>
                    <p className="expert-company">{expert.company} • {expert.experience} 경력</p>
                    
                    <div className="expert-rating mb-4">
                      <span className="rating">⭐ {expert.rating}</span>
                      <span className="review-count">({expert.reviewCount}개 리뷰)</span>
                    </div>

                    <div className="expert-specialties mb-4">
                      {expert.specialties.slice(0, 4).map((specialty, idx) => (
                        <span key={idx} className="specialty-tag">{specialty}</span>
                      ))}
                    </div>

                    <div className="expert-key-stats">
                      <div className="stat">
                        <span className="stat-label">💰</span>
                        <span className="stat-value">{expert.price}</span>
                      </div>
                      <div className="stat">
                        <span className="stat-label">⚡</span>
                        <span className="stat-value">{expert.responseTime.split(' ')[1]}</span>
                      </div>
                    </div>

                    <p className="expert-description">
                      {expert.description.length > 100 
                        ? expert.description.substring(0, 100) + '...' 
                        : expert.description}
                    </p>

                    <div className="expert-actions">
                      {isLoggedIn ? (
                        <>
                          <button 
                            className="btn-secondary btn-xs"
                            onClick={() => handleViewProfile(expert)}
                          >
                            프로필
                          </button>
                          <button 
                            className="btn-primary btn-xs"
                            onClick={() => handleMatchRequest(expert)}
                          >
                            매칭
                          </button>
                        </>
                      ) : (
                        <div className="signup-card-cta">
                          <div className="signup-gradient-bg">
                            <p className="signup-card-text">회원가입하고 프로필 열람</p>
                            <button 
                              className="btn-signup-card"
                              onClick={handleSignupCTA}
                            >
                              무료 가입하기
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="bottom-cta text-center mt-16 mb-12">
          <p className="text-base mb-6">마음에 드는 전문가가 없으신가요?</p>
          <button 
            className="btn-secondary"
            onClick={() => navigate('/chat')}
          >
            다시 매칭받기
          </button>
        </div>

        {/* Gradient Signup CTA for non-logged users */}
        {!isLoggedIn && (
          <div className="gradient-signup-cta">
            <div className="gradient-cta-content">
              <h3 className="gradient-cta-title">
                회원가입 후 프로필 열람 또는 더 많은 전문가 찾아보기
              </h3>
              <p className="gradient-cta-subtitle">
                간단한 가입으로 모든 기능을 이용해보세요
              </p>
              <button className="btn-gradient-large" onClick={handleSignupCTA}>
                무료 회원가입하기
              </button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .matching-page {
          min-height: 100vh;
          background: var(--gray-50);
        }

        .matching-header {
          padding-top: 40px;
        }

        .user-requirements {
          background: white;
          text-align: left;
        }

        .requirements-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        @media (max-width: 768px) {
          .requirements-grid {
            grid-template-columns: 1fr;
          }
        }

        .requirement-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .requirement-label {
          font-size: 14px;
          color: var(--gray-600);
          font-weight: 500;
        }

        .requirement-value {
          font-size: 16px;
          color: var(--gray-800);
          font-weight: 600;
        }

        /* Always Horizontal Layout */
        .experts-grid-3x1 {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 0;
        }

        @media (max-width: 1024px) {
          .experts-grid-3x1 {
            gap: 16px;
          }
        }

        @media (max-width: 768px) {
          .experts-grid-3x1 {
            gap: 12px;
            padding: 20px 0;
          }
        }

        @media (max-width: 480px) {
          .experts-grid-3x1 {
            gap: 8px;
            max-width: 100%;
          }
        }

        /* Floating Cards with Glassmorphism */
        .expert-card-float {
          perspective: 1000px;
          animation: float 6s ease-in-out infinite;
        }

        .expert-card-1 {
          animation-delay: 0s;
        }

        .expert-card-2 {
          animation-delay: 2s;
        }

        .expert-card-3 {
          animation-delay: 4s;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotateX(0deg) rotateY(0deg);
          }
          25% {
            transform: translateY(-10px) rotateX(1deg) rotateY(-1deg);
          }
          50% {
            transform: translateY(-5px) rotateX(0deg) rotateY(1deg);
          }
          75% {
            transform: translateY(-15px) rotateX(-1deg) rotateY(0deg);
          }
        }

        .expert-card-inner {
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.9) 0%,
            rgba(255, 255, 255, 0.7) 70%,
            rgba(102, 126, 234, 0.1) 100%
          );
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 20px;
          padding: 20px;
          box-shadow: 
            0 8px 32px 0 rgba(31, 38, 135, 0.15),
            inset 0 1px 0 0 rgba(255, 255, 255, 0.4);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          min-height: 380px;
          display: flex;
          flex-direction: column;
        }

        .expert-card-inner::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 80px;
          background: linear-gradient(
            180deg,
            transparent 0%,
            rgba(102, 126, 234, 0.15) 50%,
            rgba(118, 75, 162, 0.2) 100%
          );
          border-radius: 0 0 20px 20px;
          pointer-events: none;
        }

        @media (max-width: 768px) {
          .expert-card-inner {
            padding: 16px;
            min-height: 320px;
          }
        }

        @media (max-width: 480px) {
          .expert-card-inner {
            padding: 12px;
            min-height: 280px;
            border-radius: 16px;
          }
        }

        .expert-card-inner::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.2),
            transparent
          );
          transition: left 0.5s;
        }

        .expert-card-float:hover .expert-card-inner {
          transform: translateY(-8px);
          box-shadow: 
            0 20px 40px 0 rgba(31, 38, 135, 0.2),
            inset 0 1px 0 0 rgba(255, 255, 255, 0.5);
        }

        .expert-card-float:hover .expert-card-inner::before {
          left: 100%;
        }

        .expert-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 16px;
        }

        .expert-avatar-large {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--primary-blue), var(--primary-dark));
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          color: white;
          box-shadow: 0 4px 15px rgba(46, 111, 242, 0.3);
        }

        @media (max-width: 480px) {
          .expert-avatar-large {
            width: 40px;
            height: 40px;
            font-size: 16px;
          }
        }

        .match-badge {
          background: linear-gradient(135deg, var(--primary-blue), var(--primary-dark));
          color: white;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
        }

        .expert-name {
          font-size: 20px;
          font-weight: 700;
          color: var(--gray-800);
          margin: 0 0 4px 0;
        }

        .expert-title {
          font-size: 16px;
          color: var(--primary-blue);
          font-weight: 600;
          margin: 0 0 4px 0;
        }

        .expert-company {
          font-size: 14px;
          color: var(--gray-600);
          margin: 0 0 12px 0;
        }

        .expert-rating {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 16px;
        }

        .rating {
          font-size: 14px;
          font-weight: 600;
        }

        .review-count {
          font-size: 14px;
          color: var(--gray-600);
        }

        .match-badge-float {
          background: linear-gradient(135deg, var(--success), #15d177);
          color: white;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          box-shadow: 0 2px 10px rgba(16, 185, 129, 0.3);
        }

        .expert-info {
          text-align: left;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .expert-name {
          font-size: 18px;
          font-weight: 700;
          margin: 0 0 4px 0;
        }

        @media (max-width: 768px) {
          .expert-name {
            font-size: 16px;
          }
        }

        @media (max-width: 480px) {
          .expert-name {
            font-size: 14px;
          }
        }

        .expert-title {
          font-size: 14px;
          margin: 0 0 4px 0;
        }

        @media (max-width: 480px) {
          .expert-title {
            font-size: 12px;
          }
        }

        .expert-company {
          font-size: 12px;
          margin: 0 0 8px 0;
        }

        @media (max-width: 480px) {
          .expert-company {
            font-size: 11px;
          }
        }

        .expert-rating {
          font-size: 12px;
        }

        @media (max-width: 480px) {
          .expert-rating {
            font-size: 11px;
          }
        }

        .expert-specialties {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
        }

        .specialty-tag {
          background: rgba(46, 111, 242, 0.1);
          color: var(--primary-blue);
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 10px;
          font-weight: 500;
          border: 1px solid rgba(46, 111, 242, 0.2);
        }

        @media (max-width: 480px) {
          .specialty-tag {
            font-size: 9px;
            padding: 1px 6px;
          }
        }

        .expert-key-stats {
          display: flex;
          gap: 12px;
          margin-bottom: 12px;
          padding: 8px;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 8px;
          backdrop-filter: blur(10px);
        }

        @media (max-width: 480px) {
          .expert-key-stats {
            gap: 8px;
            padding: 6px;
          }
        }

        .stat {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .stat-label {
          font-size: 12px;
        }

        @media (max-width: 480px) {
          .stat-label {
            font-size: 10px;
          }
        }

        .stat-value {
          font-size: 11px;
          font-weight: 600;
          color: var(--gray-800);
        }

        @media (max-width: 480px) {
          .stat-value {
            font-size: 10px;
          }
        }

        .expert-description {
          font-size: 12px;
          line-height: 1.4;
          color: var(--gray-700);
          margin-bottom: 16px;
          opacity: 0.9;
          flex: 1;
        }

        @media (max-width: 480px) {
          .expert-description {
            font-size: 11px;
            margin-bottom: 12px;
          }
        }

        .expert-actions {
          display: flex;
          gap: 6px;
          margin-top: auto;
        }

        .expert-actions button {
          flex: 1;
        }

        /* Signup Card CTA */
        .signup-card-cta {
          margin-top: auto;
          margin-bottom: -20px;
          margin-left: -20px;
          margin-right: -20px;
          margin-bottom: -20px;
        }

        @media (max-width: 768px) {
          .signup-card-cta {
            margin-left: -16px;
            margin-right: -16px;
            margin-bottom: -16px;
          }
        }

        @media (max-width: 480px) {
          .signup-card-cta {
            margin-left: -12px;
            margin-right: -12px;
            margin-bottom: -12px;
          }
        }

        .signup-gradient-bg {
          background: linear-gradient(
            135deg,
            rgba(102, 126, 234, 0.9) 0%,
            rgba(118, 75, 162, 0.9) 100%
          );
          padding: 16px;
          border-radius: 0 0 20px 20px;
          text-align: center;
          backdrop-filter: blur(10px);
        }

        @media (max-width: 480px) {
          .signup-gradient-bg {
            padding: 12px;
            border-radius: 0 0 16px 16px;
          }
        }

        .signup-card-text {
          color: white;
          font-size: 12px;
          font-weight: 600;
          margin: 0 0 12px 0;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        }

        @media (max-width: 480px) {
          .signup-card-text {
            font-size: 11px;
            margin-bottom: 8px;
          }
        }

        .btn-signup-card {
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(5px);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 12px;
          padding: 8px 16px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          width: 100%;
        }

        .btn-signup-card:hover {
          background: rgba(255, 255, 255, 0.3);
          border-color: rgba(255, 255, 255, 0.5);
          transform: translateY(-1px);
        }

        @media (max-width: 480px) {
          .btn-signup-card {
            padding: 6px 12px;
            font-size: 11px;
          }
        }

        /* Special styling for signup cards */
        .expert-card-signup .expert-card-inner {
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.9) 0%,
            rgba(255, 255, 255, 0.8) 60%,
            rgba(102, 126, 234, 0.05) 100%
          );
          border: 1px solid rgba(102, 126, 234, 0.2);
        }

        .expert-card-signup .expert-card-inner::after {
          background: linear-gradient(
            180deg,
            transparent 0%,
            rgba(102, 126, 234, 0.1) 30%,
            rgba(118, 75, 162, 0.15) 100%
          );
        }

        .btn-glass {
          background: rgba(255, 255, 255, 0.2);
          color: var(--gray-800);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 12px;
          padding: 12px 20px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          backdrop-filter: blur(10px);
        }

        .btn-glass:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-1px);
        }

        .btn-gradient {
          background: linear-gradient(135deg, var(--primary-blue), var(--primary-dark));
          color: white;
          border: none;
          border-radius: 8px;
          padding: 8px 16px;
          font-size: 11px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-gradient:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(46, 111, 242, 0.4);
        }

        @media (max-width: 480px) {
          .btn-gradient {
            padding: 6px 12px;
            font-size: 10px;
          }
        }

        /* Gradient Signup CTA */
        .gradient-signup-cta {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 40px 0;
          margin-top: 40px;
          position: relative;
          overflow: hidden;
        }

        .gradient-signup-cta::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, 
            rgba(102, 126, 234, 0.9) 0%, 
            rgba(118, 75, 162, 0.9) 100%);
          backdrop-filter: blur(10px);
        }

        .gradient-cta-content {
          position: relative;
          z-index: 1;
          text-align: center;
          max-width: 800px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .gradient-cta-title {
          font-size: 28px;
          font-weight: 800;
          color: white;
          margin: 0 0 12px 0;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .gradient-cta-subtitle {
          font-size: 16px;
          color: rgba(255, 255, 255, 0.9);
          margin: 0 0 32px 0;
          line-height: 1.5;
        }

        .btn-gradient-large {
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          color: white;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 16px;
          padding: 16px 40px;
          font-size: 18px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: none;
        }

        .btn-gradient-large:hover {
          background: rgba(255, 255, 255, 0.3);
          border-color: rgba(255, 255, 255, 0.5);
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }

        @media (max-width: 768px) {
          .gradient-cta-title {
            font-size: 22px;
          }
          
          .gradient-cta-subtitle {
            font-size: 14px;
          }
          
          .btn-gradient-large {
            padding: 14px 32px;
            font-size: 16px;
          }
        }

        @media (max-width: 480px) {
          .gradient-signup-cta {
            padding: 32px 0;
          }
          
          .gradient-cta-content {
            padding: 0 16px;
          }
          
          .gradient-cta-title {
            font-size: 18px;
            margin-bottom: 8px;
          }
          
          .gradient-cta-subtitle {
            font-size: 13px;
            margin-bottom: 24px;
          }
          
          .btn-gradient-large {
            padding: 12px 24px;
            font-size: 14px;
          }
        }
      `}</style>
    </div>
  );
};

export default MatchingPage;