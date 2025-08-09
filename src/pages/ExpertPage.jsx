import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/global.css";

const ExpertPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    expertise: "",
    experience: "",
    introduction: "",
    portfolio: "",
    resume: null,
    certificate: null,
    portfolioFiles: []
  });
  const [visibleBenefits, setVisibleBenefits] = useState([]);

  // 스크롤 애니메이션 효과
  useEffect(() => {
    const handleScroll = () => {
      const benefitCards = document.querySelectorAll('.benefit-card');
      const windowHeight = window.innerHeight;
      const scrollTop = window.scrollY;
      
      const newVisibleBenefits = [];
      
      benefitCards.forEach((card, index) => {
        const cardTop = card.offsetTop;
        const cardHeight = card.offsetHeight;
        
        if (scrollTop + windowHeight > cardTop + cardHeight * 0.3) {
          newVisibleBenefits.push(index);
        }
      });
      
      setVisibleBenefits(newVisibleBenefits);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileUpload = (e, fileType) => {
    const file = e.target.files[0];
    if (file) {
      if (fileType === 'portfolioFiles') {
        setFormData(prev => ({
          ...prev,
          portfolioFiles: [...prev.portfolioFiles, file]
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          [fileType]: file
        }));
      }
    }
  };

  const removeFile = (fileType, index = null) => {
    if (fileType === 'portfolioFiles' && index !== null) {
      setFormData(prev => ({
        ...prev,
        portfolioFiles: prev.portfolioFiles.filter((_, i) => i !== index)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [fileType]: null
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: 전문가 지원 폼 제출 로직
    console.log("전문가 지원:", formData);
    alert("지원해 주셔서 감사합니다! 빠른 시일 내에 연락드리겠습니다.");
  };

  return (
    <div className="expert-page">
      {/* Hero Section */}
      <section className="expert-hero">
        <div className="container">
          <div className="expert-hero-content">
            <h1 className="h1 mb-6">
              전문가로 참여하세요
              <br />
              <span className="highlight">함께 성장하는 교육 플랫폼</span>
            </h1>
            <p className="text-lg mb-8" style={{ color: "var(--gray-600)" }}>
              당신의 지식과 경험을 나누고, 학습자들의 성장을 도우며 수익도 창출하세요
            </p>
            <div className="hero-stats">
              <div className="stat-box">
                <div className="stat-number">200+</div>
                <div className="stat-text">활동 중인 전문가</div>
              </div>
              <div className="stat-box">
                <div className="stat-number">월 300만원</div>
                <div className="stat-text">평균 수익</div>
              </div>
              <div className="stat-box">
                <div className="stat-number">4.8/5</div>
                <div className="stat-text">전문가 만족도</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <div className="container">
          <h2 className="section-title">전문가가 되면 이런 혜택이!</h2>
          
          <div className="benefits-grid">
            <div className={`benefit-card ${visibleBenefits.includes(0) ? 'animate-up' : ''}`}>
              <div className="benefit-icon">💰</div>
              <div className="benefit-content">
                <h3>안정적인 수익 창출</h3>
                <p>시간당 3만원~10만원의 경쟁력 있는 수수료율로 안정적인 수입을 만들어보세요</p>
                <div className="benefit-features">
                  <span className="feature-tag">플랫폼 수수료 15%</span>
                  <span className="feature-tag">월 정산 시스템</span>
                  <span className="feature-tag">성과 보너스</span>
                </div>
                <div className="benefit-result">
                  <strong>💰 평균 월 수익 300만원</strong>
                </div>
              </div>
            </div>

            <div className={`benefit-card ${visibleBenefits.includes(1) ? 'animate-up' : ''}`}>
              <div className="benefit-icon">🎯</div>
              <div className="benefit-content">
                <h3>AI 맞춤형 학습자 매칭</h3>
                <p>AI가 당신의 전문성과 스케줄에 맞는 학습자를 자동으로 매칭해드립니다</p>
                <div className="benefit-features">
                  <span className="feature-tag">스케줄 맞춤</span>
                  <span className="feature-tag">전문분야 세분화</span>
                  <span className="feature-tag">레벨 매칭</span>
                </div>
                <div className="benefit-result">
                  <strong>🎯 매칭 성공률 95%</strong>
                </div>
              </div>
            </div>

            <div className={`benefit-card ${visibleBenefits.includes(2) ? 'animate-up' : ''}`}>
              <div className="benefit-icon">🛠️</div>
              <div className="benefit-content">
                <h3>완벽한 교육 지원 시스템</h3>
                <p>교육에만 집중할 수 있도록 필요한 모든 도구와 지원을 제공합니다</p>
                <div className="benefit-features">
                  <span className="feature-tag">화상회의 시스템</span>
                  <span className="feature-tag">자료 공유</span>
                  <span className="feature-tag">진도 관리</span>
                </div>
                <div className="benefit-result">
                  <strong>🛠️ 올인원 플랫폼 지원</strong>
                </div>
              </div>
            </div>

            <div className={`benefit-card ${visibleBenefits.includes(3) ? 'animate-up' : ''}`}>
              <div className="benefit-icon">🌟</div>
              <div className="benefit-content">
                <h3>전문가 브랜드 구축</h3>
                <p>개인 브랜드를 구축하고 다른 전문가들과의 네트워킹 기회를 제공합니다</p>
                <div className="benefit-features">
                  <span className="feature-tag">전문가 프로필</span>
                  <span className="feature-tag">리뷰 시스템</span>
                  <span className="feature-tag">커뮤니티</span>
                </div>
                <div className="benefit-result">
                  <strong>🌟 전문가 만족도 4.8/5</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-works-section">
        <div className="container">
          <h2 className="section-title">간단한 3단계로 시작하세요</h2>
          <div className="steps-container">
            <div className="step-item">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>지원서 제출</h3>
                <p>간단한 지원서를 작성하고 포트폴리오를 업로드하세요</p>
              </div>
            </div>
            <div className="step-arrow">→</div>
            <div className="step-item">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>심사 및 승인</h3>
                <p>전문성 검토 후 빠른 시일 내에 승인 결과를 알려드려요</p>
              </div>
            </div>
            <div className="step-arrow">→</div>
            <div className="step-item">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>매칭 및 교육 시작</h3>
                <p>학습자와 매칭되면 바로 교육을 시작할 수 있어요</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section className="application-section">
        <div className="container">
          <div className="form-container">
            <div className="form-header">
              <h2 className="h3">전문가 지원하기</h2>
              <p>당신의 전문성을 공유하고 함께 성장해요!</p>
            </div>
            
            <form onSubmit={handleSubmit} className="expert-form">
              <div className="form-row">
                <div className="input-group">
                  <label htmlFor="name">이름 *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="email">이메일 *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="input-group">
                <label htmlFor="expertise">전문 분야 *</label>
                <select
                  id="expertise"
                  name="expertise"
                  value={formData.expertise}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">선택해주세요</option>
                  <option value="frontend">프론트엔드 개발</option>
                  <option value="backend">백엔드 개발</option>
                  <option value="mobile">모바일 앱 개발</option>
                  <option value="design">UI/UX 디자인</option>
                  <option value="data">데이터 사이언스</option>
                  <option value="marketing">디지털 마케팅</option>
                  <option value="business">사업 기획/운영</option>
                  <option value="other">기타</option>
                </select>
              </div>

              {/* 이력서 업로드 */}
              <div className="input-group">
                <label htmlFor="resume">이력서 업로드</label>
                <div className="file-upload-area">
                  <input
                    type="file"
                    id="resume"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => handleFileUpload(e, 'resume')}
                    style={{ display: 'none' }}
                  />
                  <label htmlFor="resume" className="file-upload-button">
                    📄 이력서 첨부하기 (PDF, DOC)
                  </label>
                  {formData.resume && (
                    <div className="uploaded-file">
                      <span>📄 {formData.resume.name}</span>
                      <button type="button" onClick={() => removeFile('resume')}>❌</button>
                    </div>
                  )}
                </div>
              </div>

              {/* 자격증 업로드 */}
              <div className="input-group">
                <label htmlFor="certificate">자격증/경력증명서 업로드</label>
                <div className="file-upload-area">
                  <input
                    type="file"
                    id="certificate"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileUpload(e, 'certificate')}
                    style={{ display: 'none' }}
                  />
                  <label htmlFor="certificate" className="file-upload-button">
                    🏆 자격증 첨부하기 (PDF, JPG, PNG)
                  </label>
                  {formData.certificate && (
                    <div className="uploaded-file">
                      <span>🏆 {formData.certificate.name}</span>
                      <button type="button" onClick={() => removeFile('certificate')}>❌</button>
                    </div>
                  )}
                </div>
              </div>

              {/* 포트폴리오 파일들 */}
              <div className="input-group">
                <label htmlFor="portfolioFiles">포트폴리오 파일들</label>
                <div className="file-upload-area">
                  <input
                    type="file"
                    id="portfolioFiles"
                    accept=".pdf,.jpg,.jpeg,.png,.zip"
                    onChange={(e) => handleFileUpload(e, 'portfolioFiles')}
                    style={{ display: 'none' }}
                    multiple
                  />
                  <label htmlFor="portfolioFiles" className="file-upload-button">
                    🎨 포트폴리오 첨부하기 (PDF, 이미지, ZIP)
                  </label>
                  {formData.portfolioFiles.length > 0 && (
                    <div className="uploaded-files">
                      {formData.portfolioFiles.map((file, index) => (
                        <div key={index} className="uploaded-file">
                          <span>🎨 {file.name}</span>
                          <button type="button" onClick={() => removeFile('portfolioFiles', index)}>❌</button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="input-group">
                <label htmlFor="experience">경력 사항 *</label>
                <textarea
                  id="experience"
                  name="experience"
                  rows="4"
                  placeholder="관련 경력, 학력, 자격증 등을 자유롭게 작성해주세요"
                  value={formData.experience}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="introduction">자기소개</label>
                <textarea
                  id="introduction"
                  name="introduction"
                  rows="4"
                  placeholder="학습자들에게 어떤 도움을 줄 수 있는지 자유롭게 소개해주세요"
                  value={formData.introduction}
                  onChange={handleInputChange}
                />
              </div>

              <div className="input-group">
                <label htmlFor="portfolio">포트폴리오 링크</label>
                <input
                  type="url"
                  id="portfolio"
                  name="portfolio"
                  placeholder="Github, 블로그, 작품 링크 등"
                  value={formData.portfolio}
                  onChange={handleInputChange}
                />
              </div>

              <button type="submit" className="btn-primary btn-lg">
                지원하기
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Back to Home */}
      <section className="back-home">
        <div className="container text-center">
          <Link to="/" className="btn-secondary">
            메인 페이지로 돌아가기
          </Link>
        </div>
      </section>

      <style jsx>{`
        .expert-page {
          min-height: 100vh;
        }

        .expert-hero {
          background: linear-gradient(135deg, var(--primary-blue), var(--primary-dark));
          padding: 100px 0;
          color: white;
        }

        .expert-hero-content {
          text-align: center;
          max-width: 800px;
          margin: 0 auto;
        }

        .highlight {
          background: linear-gradient(45deg, #ffd700, #ffed4e);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px;
          max-width: 600px;
          margin: 0 auto;
        }

        .stat-box {
          text-align: center;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border-radius: 16px;
          padding: 24px;
        }

        .stat-number {
          font-size: 2rem;
          font-weight: 800;
          margin-bottom: 8px;
        }

        .stat-text {
          font-size: 14px;
          opacity: 0.9;
        }

        .benefits-section {
          padding: 100px 0;
          background: var(--gray-50);
        }

        .section-title {
          font-size: 2.5rem;
          font-weight: 700;
          text-align: center;
          margin-bottom: 60px;
          color: var(--gray-800);
        }

        .benefits-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 32px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .benefit-card {
          background: var(--white);
          border-radius: 24px;
          padding: 0;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid rgba(0, 0, 0, 0.06);
          display: flex;
          align-items: center;
          gap: 32px;
          min-height: 200px;
          overflow: hidden;
          opacity: 0;
          transform: translateY(60px);
        }

        .benefit-card.animate-up {
          opacity: 1;
          transform: translateY(0);
        }

        .benefit-card:nth-child(even) {
          flex-direction: row-reverse;
        }

        .benefit-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 48px rgba(0, 0, 0, 0.15);
          border-color: var(--primary-blue);
        }

        .benefit-icon {
          font-size: 4rem;
          padding: 40px;
          background: linear-gradient(135deg, var(--primary-blue), var(--primary-dark));
          color: white;
          border-radius: 24px 0 0 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 160px;
          height: 100%;
        }

        .benefit-card:nth-child(even) .benefit-icon {
          border-radius: 0 24px 24px 0;
        }

        .benefit-content {
          flex: 1;
          padding: 32px;
        }

        .benefit-card h3 {
          font-size: 1.375rem;
          font-weight: 700;
          color: var(--gray-800);
          margin-bottom: 12px;
          line-height: 1.3;
        }

        .benefit-card p {
          color: var(--gray-600);
          line-height: 1.6;
          margin-bottom: 20px;
          font-size: 0.95rem;
        }

        .benefit-features {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 20px;
        }

        .feature-tag {
          background: var(--primary-light);
          color: var(--primary-blue);
          padding: 6px 12px;
          border-radius: 12px;
          font-size: 11px;
          font-weight: 600;
          border: 1px solid rgba(46, 111, 242, 0.2);
        }

        .benefit-result {
          background: linear-gradient(45deg, #e8f5e8, #f0f9f0);
          padding: 16px;
          border-radius: 12px;
          border-left: 4px solid var(--success);
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.08);
        }

        .benefit-result strong {
          color: var(--gray-800);
          font-size: 14px;
          font-weight: 700;
          line-height: 1.4;
        }

        .how-works-section {
          padding: 100px 0;
          background: white;
        }

        .steps-container {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 40px;
          max-width: 900px;
          margin: 0 auto;
        }

        .step-item {
          text-align: center;
          flex: 1;
        }

        .step-number {
          width: 80px;
          height: 80px;
          background: var(--primary-blue);
          color: white;
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          font-weight: 800;
          margin-bottom: 24px;
        }

        .step-content h3 {
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 12px;
          color: var(--gray-800);
        }

        .step-content p {
          color: var(--gray-600);
          line-height: 1.5;
        }

        .step-arrow {
          font-size: 2rem;
          color: var(--primary-blue);
          font-weight: bold;
        }

        .application-section {
          padding: 100px 0;
          background: var(--gray-50);
        }

        .form-container {
          max-width: 600px;
          margin: 0 auto;
          background: white;
          border-radius: 24px;
          padding: 48px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
        }

        .form-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .form-header h2 {
          margin-bottom: 12px;
          color: var(--gray-800);
        }

        .form-header p {
          color: var(--gray-600);
        }

        .expert-form {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .file-upload-area {
          border: 2px dashed var(--gray-300);
          border-radius: 12px;
          padding: 20px;
          text-align: center;
          transition: all 0.3s ease;
        }

        .file-upload-area:hover {
          border-color: var(--primary-blue);
          background: var(--primary-light);
        }

        .file-upload-button {
          display: inline-block;
          background: var(--primary-blue);
          color: white;
          padding: 12px 24px;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .file-upload-button:hover {
          background: var(--primary-dark);
          transform: translateY(-2px);
        }

        .uploaded-file, .uploaded-files .uploaded-file {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: var(--gray-100);
          padding: 8px 12px;
          border-radius: 6px;
          margin-top: 8px;
        }

        .uploaded-files {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .uploaded-file button {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          font-size: 14px;
        }

        .back-home {
          padding: 60px 0;
          background: white;
        }

        @media (max-width: 1024px) {
          .benefits-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }

          .benefit-card {
            flex-direction: column !important;
            text-align: center;
            min-height: auto;
          }

          .benefit-card:nth-child(even) {
            flex-direction: column !important;
          }

          .benefit-icon {
            border-radius: 20px 20px 0 0 !important;
            min-width: 100%;
            height: 120px;
            font-size: 3rem;
            padding: 20px;
          }

          .benefit-card:nth-child(even) .benefit-icon {
            border-radius: 20px 20px 0 0 !important;
          }

          .steps-container {
            flex-direction: column;
            gap: 30px;
          }

          .step-arrow {
            transform: rotate(90deg);
          }
        }

        @media (max-width: 768px) {
          .expert-hero {
            padding: 80px 0;
          }

          .hero-stats {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .benefits-section,
          .how-works-section,
          .application-section {
            padding: 60px 0;
          }

          .section-title {
            font-size: 2rem;
            margin-bottom: 40px;
          }

          .benefit-content {
            padding: 24px;
          }

          .form-container {
            padding: 32px 24px;
            margin: 0 16px;
          }

          .form-row {
            grid-template-columns: 1fr;
            gap: 16px;
          }
        }
      `}</style>
    </div>
  );
};

export default ExpertPage;