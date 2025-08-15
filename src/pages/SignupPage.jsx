import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

function SignupPage() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [userType, setUserType] = useState(null)

  const handleSocialSignup = (provider) => {
    setIsLoading(true)
    
    // Simulate signup process
    setTimeout(() => {
      // Save user session to localStorage
      const mockUser = {
        id: 1,
        name: '홍길동',
        email: 'hong@example.com',
        provider: provider,
        userType: userType || 'buyer',
        signupTime: new Date().toISOString()
      }
      localStorage.setItem('user', JSON.stringify(mockUser))
      
      // Redirect based on user type
      if (userType === 'expert') {
        navigate('/signup/expert')
      } else {
        navigate('/')
      }
    }, 1000)
  }

  if (!userType) {
    return (
      <div className="signup-page" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #e8d5ff, #d5e8ff)' }}>
        <div className="container">
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2 className="text-center mb-lg">회원가입</h2>
            <p className="text-center text-secondary mb-xl">
              어떤 목적으로 Tech Mate를 사용하시나요?
            </p>

            <div className="grid grid-cols-2 gap-lg">
              <div 
                className="card" 
                style={{ 
                  cursor: 'pointer', 
                  background: 'rgba(255, 255, 255, 0.9)', 
                  backdropFilter: 'blur(10px)',
                  border: '2px solid transparent',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--primary-blue)'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'transparent'}
                onClick={() => setUserType('buyer')}
              >
                <div className="text-center">
                  <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🎓</div>
                  <h4 className="mb-md">구매자로 시작하기</h4>
                  <p className="text-secondary">
                    전문가에게 AI 기술을 배우고 싶어요
                  </p>
                </div>
              </div>

              <div 
                className="card" 
                style={{ 
                  cursor: 'pointer', 
                  background: 'rgba(255, 255, 255, 0.9)', 
                  backdropFilter: 'blur(10px)',
                  border: '2px solid transparent',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--primary-blue)'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'transparent'}
                onClick={() => setUserType('expert')}
              >
                <div className="text-center">
                  <div style={{ fontSize: '3rem', marginBottom: '16px' }}>👨‍🏫</div>
                  <h4 className="mb-md">전문가로 시작하기</h4>
                  <p className="text-secondary">
                    제 지식과 경험을 나누고 싶어요
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center mt-xl">
              <p className="text-secondary">
                이미 계정이 있으신가요?{' '}
                <Link to="/login" className="text-primary">
                  로그인
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="signup-page" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #e8d5ff, #d5e8ff)' }}>
      <div className="container">
        <div className="card" style={{ maxWidth: '400px', margin: '0 auto' }}>
          <button 
            onClick={() => setUserType(null)}
            className="btn btn-secondary btn-small mb-lg"
          >
            ← 뒤로가기
          </button>

          <h2 className="text-center mb-lg">
            {userType === 'expert' ? '전문가' : '구매자'} 회원가입
          </h2>
          <p className="text-center text-secondary mb-xl">
            소셜 계정으로 간편하게 시작하세요
          </p>

          <div className="flex flex-column gap-md">
            <button
              onClick={() => handleSocialSignup('google')}
              className="btn btn-secondary btn-full"
              disabled={isLoading}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              {isLoading ? <span className="spinner"></span> : 'Google로 계속하기'}
            </button>

            <button
              onClick={() => handleSocialSignup('kakao')}
              className="btn btn-full"
              disabled={isLoading}
              style={{ 
                backgroundColor: '#FEE500', 
                color: '#000000',
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: '8px' 
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="#000000" d="M12 3c5.514 0 10 3.592 10 8.007 0 4.917-5.144 7.961-9.91 7.961-1.937 0-3.384-.397-4.394-.644-.356-.086-.686-.165-1.01-.165-.207 0-.392.04-.672.122l-.737.223c-1.045.316-2.201.665-3.084-.445-.721-.905-.532-2.023-.337-3.159l.032-.186c.025-.149.048-.286.063-.407-.343-1.096-.526-2.267-.526-3.507C2 6.592 6.486 3 12 3z"/>
              </svg>
              {isLoading ? <span className="spinner"></span> : '카카오로 계속하기'}
            </button>

            <button
              onClick={() => handleSocialSignup('naver')}
              className="btn btn-full"
              disabled={isLoading}
              style={{ 
                backgroundColor: '#03C75A', 
                color: '#FFFFFF',
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: '8px' 
              }}
            >
              <span style={{ fontWeight: 'bold', fontSize: '18px' }}>N</span>
              {isLoading ? <span className="spinner"></span> : '네이버로 계속하기'}
            </button>
          </div>

          <div className="text-center mt-xl">
            <p className="text-secondary">
              이미 계정이 있으신가요?{' '}
              <Link to="/login" className="text-primary">
                로그인
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignupPage