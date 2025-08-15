import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { categories, reviews } from '../data/mockData'

function LandingPage() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReviewIndex((prev) => (prev + 1) % reviews.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate('/matching', { state: { query: searchQuery } })
    }
  }

  const handleCategoryClick = (category) => {
    navigate('/experts', { state: { category: category.name } })
  }

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section bg-gradient-blue">
        <div className="container">
          <div className="text-center" style={{ padding: '80px 0' }}>
            <h1 className="mb-lg">
              AI 기술로 당신의 비즈니스를
              <br />
              <span className="text-primary">한 단계 더 성장</span>시키세요
            </h1>
            <p className="text-secondary mb-xl" style={{ fontSize: '1.25rem' }}>
              전문가와 함께하는 맞춤형 AI 기술 교육 플랫폼
            </p>
            
            <form onSubmit={handleSearch} className="search-form" style={{ maxWidth: '600px', margin: '0 auto' }}>
              <div className="flex gap-md">
                <input
                  type="text"
                  className="form-input"
                  placeholder="어떤 기술을 배우고 싶으신가요? (예: 쇼핑몰 제작, AI 이미지 생성)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ borderRadius: '24px' }}
                />
                <button type="submit" className="btn btn-primary btn-large" style={{ borderRadius: '24px' }}>
                  시작하기
                </button>
              </div>
            </form>

            <div className="categories mt-xl">
              <p className="text-secondary mb-md">또는 카테고리로 전문가 찾기</p>
              <div className="flex flex-center gap-md" style={{ flexWrap: 'wrap' }}>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryClick(category)}
                    className="btn btn-outline btn-small"
                    style={{ borderRadius: '20px' }}
                  >
                    {category.icon} {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Introduction Section */}
      <section className="section">
        <div className="container">
          <h2 className="text-center mb-xl">AI 기술을 우리 분야에 적용하세요</h2>
          <div className="grid grid-cols-3 gap-lg">
            <div className="card text-center">
              <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🤖</div>
              <h4 className="mb-md">AI 챗봇 상담</h4>
              <p className="text-secondary">
                AI가 분석한 맞춤형 교육 커리큘럼으로 효율적인 학습이 가능합니다
              </p>
            </div>
            <div className="card text-center">
              <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🎯</div>
              <h4 className="mb-md">정확한 매칭</h4>
              <p className="text-secondary">
                당신의 목표와 현재 수준에 맞는 최적의 전문가를 찾아드립니다
              </p>
            </div>
            <div className="card text-center">
              <div style={{ fontSize: '3rem', marginBottom: '16px' }}>💬</div>
              <h4 className="mb-md">실시간 소통</h4>
              <p className="text-secondary">
                전문가와 직접 소통하며 실무 노하우를 전수받을 수 있습니다
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="section bg-gray-50">
        <div className="container">
          <h2 className="text-center mb-xl">일회성 외주가 아닌, 내 손으로 만드는 결과물</h2>
          <div className="grid grid-cols-2 gap-xl" style={{ alignItems: 'center' }}>
            <div>
              <h3 className="mb-lg">직접 만들어가는 성장의 즐거움</h3>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li className="flex gap-md mb-md">
                  <span className="text-primary">✓</span>
                  <span>AI 이미지 생성으로 디자인 역량 강화</span>
                </li>
                <li className="flex gap-md mb-md">
                  <span className="text-primary">✓</span>
                  <span>웹페이지 제작으로 비즈니스 확장</span>
                </li>
                <li className="flex gap-md mb-md">
                  <span className="text-primary">✓</span>
                  <span>데이터 분석으로 인사이트 도출</span>
                </li>
                <li className="flex gap-md">
                  <span className="text-primary">✓</span>
                  <span>자동화 시스템으로 업무 효율 극대화</span>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-purple rounded-xl p-xl text-center">
              <h4 className="mb-lg">교육 후 변화</h4>
              <div className="grid grid-cols-2 gap-md">
                <div className="bg-white rounded-lg p-lg">
                  <div className="text-primary font-bold" style={{ fontSize: '2rem' }}>87%</div>
                  <p className="text-secondary">실무 적용률</p>
                </div>
                <div className="bg-white rounded-lg p-lg">
                  <div className="text-primary font-bold" style={{ fontSize: '2rem' }}>3.5배</div>
                  <p className="text-secondary">평균 성장률</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="section">
        <div className="container">
          <h2 className="text-center mb-xl">수강생들의 성공 스토리</h2>
          <div className="reviews-slider" style={{ position: 'relative', overflow: 'hidden', height: '400px' }}>
            <div className="reviews-track" style={{
              display: 'flex',
              gap: '24px',
              animation: 'slide 20s linear infinite',
              position: 'absolute',
              top: 0
            }}>
              {[...reviews, ...reviews].map((review, index) => (
                <div key={`${review.id}-${index}`} className="card" style={{ minWidth: '350px' }}>
                  <div className="flex gap-md mb-md">
                    <img 
                      src={review.userImage} 
                      alt={review.userName}
                      style={{ width: '48px', height: '48px', borderRadius: '50%' }}
                    />
                    <div>
                      <h5>{review.userName}</h5>
                      <p className="text-secondary">{review.category}</p>
                    </div>
                  </div>
                  <div className="flex gap-xs mb-md">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} style={{ color: i < review.rating ? '#f59e0b' : '#e5e7eb' }}>★</span>
                    ))}
                  </div>
                  <p className="mb-md">{review.comment}</p>
                  <div className="badge badge-success">{review.growth}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-gradient-blue">
        <div className="container text-center">
          <h2 className="mb-lg">지금 시작하세요!</h2>
          <p className="mb-xl" style={{ fontSize: '1.125rem' }}>
            AI 기술로 당신의 비즈니스를 혁신할 시간입니다
          </p>
          <div className="grid grid-cols-2 gap-lg" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <div className="card" style={{ background: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(10px)' }}>
              <h4 className="mb-md">구매자로 시작하기</h4>
              <p className="text-secondary mb-lg">전문가에게 배우고 싶다면</p>
              <button 
                onClick={() => navigate('/signup')}
                className="btn btn-primary btn-full"
              >
                회원가입
              </button>
            </div>
            <div className="card" style={{ background: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(10px)' }}>
              <h4 className="mb-md">전문가로 시작하기</h4>
              <p className="text-secondary mb-lg">지식을 나누고 싶다면</p>
              <button 
                onClick={() => navigate('/signup/expert')}
                className="btn btn-outline btn-full"
              >
                전문가 등록
              </button>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes slide {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}

export default LandingPage