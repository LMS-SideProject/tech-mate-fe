import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { SessionManager } from '../utils/sessionManager';
import '../styles/global.css';

const SignupPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const returnTo = searchParams.get('returnTo') || '/matching';
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    agreeTerms: false
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.agreeTerms) {
      alert('이용약관에 동의해주세요.');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Save user login state
      SessionManager.setLoggedIn({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        signupAt: new Date().toISOString()
      });

      setIsLoading(false);
      
      // Redirect to original destination
      navigate(returnTo);
    }, 1500);
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <div className="signup-header text-center mb-8">
          <h1 className="h3 mb-4">회원가입</h1>
          <p className="text-base" style={{ color: 'var(--gray-600)' }}>
            전문가 프로필을 보려면 회원가입이 필요해요
          </p>
        </div>

        <div className="signup-card">
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="name">이름</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="이름을 입력하세요"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="email">이메일</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="이메일을 입력하세요"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">비밀번호</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="비밀번호를 입력하세요"
                required
                minLength="6"
              />
            </div>

            <div className="input-group">
              <label htmlFor="phone">휴대폰 번호</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="010-1234-5678"
                required
              />
            </div>

            <div className="checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleInputChange}
                  required
                />
                <span className="checkmark"></span>
                <span className="checkbox-text">
                  <span>이용약관</span> 및 <span>개인정보처리방침</span>에 동의합니다
                </span>
              </label>
            </div>

            <button 
              type="submit" 
              className="btn-primary btn-lg"
              style={{ width: '100%', marginTop: '24px' }}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="loading-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  가입 중...
                </>
              ) : (
                '회원가입 완료'
              )}
            </button>
          </form>

          <div className="signup-footer text-center mt-6">
            <p className="text-sm" style={{ color: 'var(--gray-600)' }}>
              이미 계정이 있으신가요? 
              <button 
                type="button"
                className="link-button"
                onClick={() => {
                  // For demo purposes, just log in as guest
                  SessionManager.setLoggedIn({ name: '게스트 사용자', email: 'guest@example.com' });
                  navigate(returnTo);
                }}
              >
                로그인하기
              </button>
            </p>
          </div>
        </div>

        <div className="guest-data-notice">
          <div className="notice-content">
            <h4 className="notice-title">💾 데이터 보존 알림</h4>
            <p className="notice-text">
              회원가입 전에 입력하신 학습 정보와 전문가 선택 정보가 안전하게 보관되어 있습니다. 
              회원가입 후 바로 이어서 진행하실 수 있어요.
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .signup-page {
          min-height: 100vh;
          background: var(--gray-50);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .signup-container {
          width: 100%;
          max-width: 480px;
        }

        .signup-card {
          background: white;
          border-radius: 24px;
          padding: 40px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        .checkbox-group {
          margin-bottom: 20px;
        }

        .checkbox-label {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          cursor: pointer;
          font-size: 14px;
          line-height: 1.5;
        }

        .checkbox-label input[type="checkbox"] {
          display: none;
        }

        .checkmark {
          width: 20px;
          height: 20px;
          border: 2px solid var(--gray-300);
          border-radius: 4px;
          position: relative;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .checkbox-label input[type="checkbox"]:checked + .checkmark {
          background: var(--primary-blue);
          border-color: var(--primary-blue);
        }

        .checkbox-label input[type="checkbox"]:checked + .checkmark::after {
          content: "✓";
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: white;
          font-size: 12px;
          font-weight: bold;
        }

        .checkbox-text span {
          color: var(--primary-blue);
          font-weight: 600;
          text-decoration: underline;
          cursor: pointer;
        }

        .link-button {
          background: none;
          border: none;
          color: var(--primary-blue);
          font-weight: 600;
          cursor: pointer;
          text-decoration: underline;
          margin-left: 4px;
        }

        .link-button:hover {
          color: var(--primary-dark);
        }

        .guest-data-notice {
          margin-top: 24px;
          background: linear-gradient(135deg, var(--blue-gradient-start), var(--blue-gradient-end));
          border-radius: 16px;
          padding: 20px;
        }

        .notice-title {
          font-size: 16px;
          font-weight: 600;
          color: var(--gray-800);
          margin: 0 0 8px 0;
        }

        .notice-text {
          font-size: 14px;
          color: var(--gray-700);
          line-height: 1.5;
          margin: 0;
        }

        .loading-dots {
          margin-right: 12px;
        }

        @media (max-width: 768px) {
          .signup-card {
            padding: 24px;
          }
        }
      `}</style>
    </div>
  );
};

export default SignupPage;