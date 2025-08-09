import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SessionManager } from '../utils/sessionManager';
import '../styles/global.css';

const ProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [expert, setExpert] = useState(null);
  const [selectedTab, setSelectedTab] = useState('about');

  // Mock expert data (in real app, this would come from API)
  const expertsData = {
    1: {
      id: 1,
      name: '김민수',
      title: 'Senior Frontend Developer',
      company: '네이버',
      experience: '7년',
      avatar: '👨‍💻',
      rating: 4.9,
      reviewCount: 127,
      completedSessions: 280,
      specialties: ['React', 'JavaScript', 'TypeScript', 'Next.js', 'Redux', 'Jest'],
      price: '회당 8만원',
      responseTime: '평균 2시간 내 응답',
      description: '네이버에서 7년간 프론트엔드 개발을 담당하고 있으며, React 생태계 전문가입니다. 초보자부터 중급자까지 단계별 맞춤 교육이 가능합니다.',
      matchPercentage: 95,
      schedule: ['평일 저녁', '주말'],
      method: '온라인/오프라인',
      education: [
        '서울대학교 컴퓨터공학과 졸업',
        'Stanford CS193P 수료'
      ],
      career: [
        '네이버 - Senior Frontend Developer (2020~현재)',
        '카카오 - Frontend Developer (2017~2020)',
        '스타트업 A - Junior Developer (2016~2017)'
      ],
      portfolio: [
        {
          title: '네이버 메인 페이지 리뉴얼',
          description: 'React 18과 Next.js 13을 사용한 대규모 프로젝트',
          tech: ['React', 'Next.js', 'TypeScript']
        },
        {
          title: '실시간 채팅 시스템',
          description: 'WebSocket을 활용한 실시간 메신저 개발',
          tech: ['React', 'Socket.io', 'Node.js']
        }
      ],
      reviews: [
        {
          id: 1,
          user: '박**',
          rating: 5,
          date: '2024-01-15',
          comment: '정말 친절하고 자세하게 가르쳐주셔서 React를 빠르게 익힐 수 있었습니다. 실무 노하우도 많이 배웠어요!'
        },
        {
          id: 2,
          user: '이**',
          rating: 5,
          date: '2024-01-10',
          comment: '코드 리뷰를 꼼꼼히 해주시고, 실제 프로젝트를 함께 진행하면서 많이 배웠습니다.'
        },
        {
          id: 3,
          user: '김**',
          rating: 4,
          date: '2024-01-05',
          comment: 'TypeScript 전환 프로젝트를 도와주셨는데, 체계적인 접근법이 인상깊었습니다.'
        }
      ]
    },
    // Add other experts data here...
  };

  useEffect(() => {
    // Check if user is logged in
    if (!SessionManager.isLoggedIn()) {
      navigate(`/signup?returnTo=/profile/${id}`);
      return;
    }

    // Load expert data
    const expertData = expertsData[parseInt(id)];
    if (expertData) {
      setExpert(expertData);
    } else {
      // Expert not found
      navigate('/matching');
    }
  }, [id, navigate]);

  const handleMatchRequest = () => {
    SessionManager.updateUserData({ selectedExpert: expert });
    navigate('/matching-request');
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i}>⭐</span>);
    }
    if (hasHalfStar) {
      stars.push(<span key="half">⭐</span>);
    }
    return stars;
  };

  if (!expert) {
    return (
      <div className="loading-container">
        <div className="loading-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="container">
        {/* Header Section */}
        <div className="profile-header">
          <button 
            className="back-button"
            onClick={() => navigate('/matching')}
          >
            ← 매칭 목록으로
          </button>
          
          <div className="expert-summary">
            <div className="expert-avatar-xl">{expert.avatar}</div>
            <div className="expert-basic-info">
              <h1 className="expert-name">{expert.name}</h1>
              <p className="expert-title">{expert.title}</p>
              <p className="expert-company">{expert.company} • {expert.experience} 경력</p>
              
              <div className="expert-stats">
                <div className="stat-item">
                  <div className="stat-value">{renderStars(expert.rating)} {expert.rating}</div>
                  <div className="stat-label">{expert.reviewCount}개 리뷰</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">{expert.completedSessions}</div>
                  <div className="stat-label">완료된 세션</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">{expert.responseTime.split(' ')[1]}</div>
                  <div className="stat-label">평균 응답시간</div>
                </div>
              </div>
            </div>
            
            <div className="expert-actions">
              <div className="price-info">
                <span className="price">{expert.price}</span>
              </div>
              <button 
                className="btn-primary btn-lg"
                onClick={handleMatchRequest}
              >
                매칭 요청하기
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="profile-tabs">
          <button 
            className={`tab-button ${selectedTab === 'about' ? 'active' : ''}`}
            onClick={() => setSelectedTab('about')}
          >
            소개
          </button>
          <button 
            className={`tab-button ${selectedTab === 'experience' ? 'active' : ''}`}
            onClick={() => setSelectedTab('experience')}
          >
            경력/학력
          </button>
          <button 
            className={`tab-button ${selectedTab === 'portfolio' ? 'active' : ''}`}
            onClick={() => setSelectedTab('portfolio')}
          >
            포트폴리오
          </button>
          <button 
            className={`tab-button ${selectedTab === 'reviews' ? 'active' : ''}`}
            onClick={() => setSelectedTab('reviews')}
          >
            리뷰 ({expert.reviewCount})
          </button>
        </div>

        {/* Tab Content */}
        <div className="profile-content">
          {selectedTab === 'about' && (
            <div className="about-section">
              <div className="section-card">
                <h3 className="section-title">전문 분야</h3>
                <div className="specialties-list">
                  {expert.specialties.map((specialty, index) => (
                    <span key={index} className="specialty-badge">{specialty}</span>
                  ))}
                </div>
              </div>

              <div className="section-card">
                <h3 className="section-title">소개</h3>
                <p className="description">{expert.description}</p>
              </div>

              <div className="section-card">
                <h3 className="section-title">수업 정보</h3>
                <div className="lesson-info">
                  <div className="info-item">
                    <span className="info-label">💰 수업료:</span>
                    <span className="info-value">{expert.price}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">📅 가능 시간:</span>
                    <span className="info-value">{expert.schedule.join(', ')}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">💻 진행 방식:</span>
                    <span className="info-value">{expert.method}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">⚡ 응답 시간:</span>
                    <span className="info-value">{expert.responseTime}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'experience' && (
            <div className="experience-section">
              <div className="section-card">
                <h3 className="section-title">학력</h3>
                <ul className="timeline-list">
                  {expert.education.map((edu, index) => (
                    <li key={index} className="timeline-item">{edu}</li>
                  ))}
                </ul>
              </div>

              <div className="section-card">
                <h3 className="section-title">경력</h3>
                <ul className="timeline-list">
                  {expert.career.map((career, index) => (
                    <li key={index} className="timeline-item">{career}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {selectedTab === 'portfolio' && (
            <div className="portfolio-section">
              {expert.portfolio.map((project, index) => (
                <div key={index} className="section-card">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  <div className="project-tech">
                    {project.tech.map((tech, techIndex) => (
                      <span key={techIndex} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {selectedTab === 'reviews' && (
            <div className="reviews-section">
              {expert.reviews.map((review) => (
                <div key={review.id} className="section-card">
                  <div className="review-header">
                    <div className="review-user">
                      <span className="reviewer-name">{review.user}</span>
                      <span className="review-date">{review.date}</span>
                    </div>
                    <div className="review-rating">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                  <p className="review-comment">{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .profile-page {
          min-height: 100vh;
          background: var(--gray-50);
          padding: 20px 0;
        }

        .loading-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
        }

        .back-button {
          background: none;
          border: none;
          color: var(--primary-blue);
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          margin-bottom: 24px;
          padding: 8px 0;
        }

        .back-button:hover {
          color: var(--primary-dark);
        }

        .profile-header {
          background: white;
          border-radius: 24px;
          padding: 32px;
          margin-bottom: 24px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        .expert-summary {
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: 32px;
          align-items: center;
        }

        @media (max-width: 768px) {
          .expert-summary {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 24px;
          }
        }

        .expert-avatar-xl {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          background: var(--primary-light);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 48px;
        }

        .expert-name {
          font-size: 32px;
          font-weight: 800;
          color: var(--gray-800);
          margin: 0 0 8px 0;
        }

        .expert-title {
          font-size: 18px;
          color: var(--primary-blue);
          font-weight: 600;
          margin: 0 0 4px 0;
        }

        .expert-company {
          font-size: 16px;
          color: var(--gray-600);
          margin: 0 0 24px 0;
        }

        .expert-stats {
          display: flex;
          gap: 32px;
        }

        @media (max-width: 768px) {
          .expert-stats {
            justify-content: center;
          }
        }

        .stat-item {
          text-align: center;
        }

        .stat-value {
          font-size: 18px;
          font-weight: 700;
          color: var(--gray-800);
          margin-bottom: 4px;
        }

        .stat-label {
          font-size: 14px;
          color: var(--gray-600);
        }

        .expert-actions {
          text-align: center;
        }

        .price-info {
          margin-bottom: 16px;
        }

        .price {
          font-size: 24px;
          font-weight: 800;
          color: var(--primary-blue);
        }

        .profile-tabs {
          display: flex;
          background: white;
          border-radius: 16px;
          padding: 8px;
          margin-bottom: 24px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          overflow-x: auto;
        }

        .tab-button {
          flex: 1;
          background: none;
          border: none;
          padding: 12px 20px;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          color: var(--gray-600);
          transition: all 0.2s ease;
          white-space: nowrap;
        }

        .tab-button.active {
          background: var(--primary-blue);
          color: white;
        }

        .tab-button:hover:not(.active) {
          background: var(--gray-100);
        }

        .profile-content {
          display: grid;
          gap: 20px;
        }

        .section-card {
          background: white;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .section-title {
          font-size: 20px;
          font-weight: 700;
          color: var(--gray-800);
          margin: 0 0 16px 0;
        }

        .specialties-list {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }

        .specialty-badge {
          background: var(--primary-light);
          color: var(--primary-blue);
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 600;
        }

        .description {
          font-size: 16px;
          line-height: 1.6;
          color: var(--gray-700);
          margin: 0;
        }

        .lesson-info {
          display: grid;
          gap: 12px;
        }

        .info-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 0;
          border-bottom: 1px solid var(--gray-100);
        }

        .info-item:last-child {
          border-bottom: none;
        }

        .info-label {
          color: var(--gray-600);
          font-weight: 500;
        }

        .info-value {
          color: var(--gray-800);
          font-weight: 600;
        }

        .timeline-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .timeline-item {
          padding: 12px 0;
          padding-left: 24px;
          position: relative;
          color: var(--gray-700);
          line-height: 1.5;
        }

        .timeline-item:before {
          content: "•";
          position: absolute;
          left: 0;
          color: var(--primary-blue);
          font-weight: bold;
          font-size: 20px;
        }

        .project-title {
          font-size: 18px;
          font-weight: 700;
          color: var(--gray-800);
          margin: 0 0 8px 0;
        }

        .project-description {
          font-size: 16px;
          color: var(--gray-700);
          margin: 0 0 16px 0;
          line-height: 1.5;
        }

        .project-tech {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .tech-tag {
          background: var(--gray-100);
          color: var(--gray-700);
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 500;
        }

        .review-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .review-user {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .reviewer-name {
          font-weight: 600;
          color: var(--gray-800);
        }

        .review-date {
          font-size: 14px;
          color: var(--gray-600);
        }

        .review-rating {
          font-size: 14px;
        }

        .review-comment {
          font-size: 16px;
          line-height: 1.5;
          color: var(--gray-700);
          margin: 0;
        }
      `}</style>
    </div>
  );
};

export default ProfilePage;