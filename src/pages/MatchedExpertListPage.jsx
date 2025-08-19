import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { experts, quotation } from '../data/mockData'

function MatchedExpertListPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [selectedExpert, setSelectedExpert] = useState(null)
  
  // 전달받은 견적서 정보
  const quotationData = location.state?.quotation
  
  // 매칭된 전문가 (상위 3명)
  const matchedExperts = experts.slice(0, 3).map(expert => ({
    ...expert,
    matchRate: expert.matchRate || Math.floor(Math.random() * 20 + 80)
  }))

  const handleExpertClick = (expert) => {
    setSelectedExpert(expert)
    setShowProfileModal(true)
  }

  const handleMatchingRequest = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    if (!user.id) {
      if (confirm('로그인이 필요한 서비스입니다. 로그인 페이지로 이동하시겠습니까?')) {
        navigate('/login')
      }
      return
    }
    
    alert(`${selectedExpert.name} 전문가에게 매칭 요청을 보냈습니다!`)
    setShowProfileModal(false)
    navigate('/chat', { state: { quotation: quotationData } })
  }

  const handleNavigateNext = (direction) => {
    const currentIndex = matchedExperts.findIndex(e => e.id === selectedExpert.id)
    let newIndex = currentIndex
    
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : matchedExperts.length - 1
    } else {
      newIndex = currentIndex < matchedExperts.length - 1 ? currentIndex + 1 : 0
    }
    
    setSelectedExpert(matchedExperts[newIndex])
  }

  return (
    <div className="matched-expert-list-page" style={{ minHeight: '100vh', paddingTop: '40px' }}>
      <div className="container">
        <h1 className="mb-xl">매칭된 전문가</h1>
        
        {/* Quotation Summary */}
        <div className="card bg-gradient-blue mb-xl">
          <h3 className="mb-md">견적서 요약</h3>
          <div className="grid grid-cols-2 gap-lg">
            <div>
              <div className="mb-md">
                <span className="text-secondary">카테고리:</span> <strong>{(quotationData || quotation).category}</strong>
              </div>
              <div className="mb-md">
                <span className="text-secondary">교육 기간:</span> <strong>{(quotationData || quotation).duration}</strong>
              </div>
              <div>
                <span className="text-secondary">일정:</span> <strong>{(quotationData || quotation).schedule}</strong>
              </div>
            </div>
            <div>
              <div className="mb-md">
                <span className="text-secondary">예산:</span> <strong>₩{(quotationData || quotation).budget.toLocaleString()}</strong>
              </div>
              <div className="mb-md">
                <span className="text-secondary">학습 키워드:</span>
                <div className="flex gap-xs mt-sm" style={{ flexWrap: 'wrap' }}>
                  {(quotationData || quotation).keywords.map((keyword, index) => (
                    <span key={index} className="badge badge-primary">{keyword}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Selected Category Highlight */}
        <div className="mb-lg">
          <span className="text-secondary">현재 선택된 분야:</span>
          <span className="badge badge-primary ml-sm" style={{ fontSize: '1rem', padding: '8px 16px' }}>
            {(quotationData || quotation).category}
          </span>
        </div>

        {/* Matched Experts */}
        <div className="grid grid-cols-3 gap-lg">
          {matchedExperts.map((expert) => (
            <div
              key={expert.id}
              className="card"
              style={{ cursor: 'pointer', position: 'relative' }}
              onClick={() => handleExpertClick(expert)}
            >
              {/* Match Rate Badge */}
              <div 
                className="badge badge-success" 
                style={{ 
                  position: 'absolute', 
                  top: '16px', 
                  right: '16px',
                  fontSize: '0.875rem'
                }}
              >
                매칭률 {expert.matchRate}%
              </div>

              <div className="flex gap-md mb-md" style={{ marginTop: '24px' }}>
                <img
                  src={expert.image}
                  alt={expert.name}
                  style={{ width: '60px', height: '60px', borderRadius: '50%' }}
                />
                <div style={{ flex: 1 }}>
                  <h4>{expert.name}</h4>
                  <p className="text-secondary">{expert.title}</p>
                </div>
              </div>
              
              <div className="flex flex-between mb-md">
                <div className="flex gap-xs">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} style={{ color: i < Math.floor(expert.rating) ? '#f59e0b' : '#e5e7eb' }}>★</span>
                  ))}
                  <span className="text-secondary">({expert.reviewCount})</span>
                </div>
                <span className="badge badge-primary">{expert.experience}</span>
              </div>

              <p className="text-secondary mb-md" style={{ fontSize: '0.875rem' }}>
                {expert.bio}
              </p>

              <div className="flex gap-xs mb-md" style={{ flexWrap: 'wrap' }}>
                {expert.skills.slice(0, 3).map((skill, index) => (
                  <span key={index} className="badge badge-secondary" style={{ fontSize: '0.75rem' }}>
                    {skill}
                  </span>
                ))}
                {expert.skills.length > 3 && (
                  <span className="badge badge-secondary" style={{ fontSize: '0.75rem' }}>
                    +{expert.skills.length - 3}
                  </span>
                )}
              </div>

              <div className="flex flex-between">
                <span className="font-semibold text-primary">
                  ₩{expert.hourlyRate.toLocaleString()}/시간
                </span>
                <button className="btn btn-primary btn-small">
                  프로필 보기
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Show More Experts Button */}
        <div className="text-center mt-xl">
          <button 
            onClick={() => navigate('/experts')}
            className="btn btn-outline btn-large"
          >
            전문가 더 보기
          </button>
        </div>
      </div>

      {/* Profile Modal with Navigation */}
      {showProfileModal && selectedExpert && (
        <div className="modal-overlay" onClick={() => setShowProfileModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px', position: 'relative' }}>
            {/* Navigation Buttons */}
            <button
              className="btn btn-secondary"
              onClick={() => handleNavigateNext('prev')}
              style={{
                position: 'absolute',
                left: '-60px',
                top: '50%',
                transform: 'translateY(-50%)',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                padding: 0
              }}
            >
              ‹
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => handleNavigateNext('next')}
              style={{
                position: 'absolute',
                right: '-60px',
                top: '50%',
                transform: 'translateY(-50%)',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                padding: 0
              }}
            >
              ›
            </button>

            <div className="modal-header">
              <h3>전문가 프로필</h3>
              <button className="modal-close" onClick={() => setShowProfileModal(false)}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="text-center mb-lg">
                <img
                  src={selectedExpert.image}
                  alt={selectedExpert.name}
                  style={{ width: '100px', height: '100px', borderRadius: '50%', marginBottom: '16px' }}
                />
                <h3>{selectedExpert.name}</h3>
                <p className="text-secondary">{selectedExpert.title}</p>
                <div className="badge badge-success mt-sm">
                  매칭률 {selectedExpert.matchRate}%
                </div>
              </div>

              <div className="mb-lg">
                <h5 className="mb-md">평점 및 경력</h5>
                <div className="flex flex-between mb-sm">
                  <span>평점</span>
                  <div className="flex gap-xs">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} style={{ color: i < Math.floor(selectedExpert.rating) ? '#f59e0b' : '#e5e7eb' }}>★</span>
                    ))}
                    <span className="text-secondary">({selectedExpert.reviewCount}개)</span>
                  </div>
                </div>
                <div className="flex flex-between mb-sm">
                  <span>경력</span>
                  <span>{selectedExpert.experience}</span>
                </div>
                <div className="flex flex-between">
                  <span>시간당 요금</span>
                  <span className="font-semibold text-primary">₩{selectedExpert.hourlyRate.toLocaleString()}</span>
                </div>
              </div>

              <div className="mb-lg">
                <h5 className="mb-md">소개</h5>
                <p className="text-secondary">{selectedExpert.bio}</p>
              </div>

              <div className="mb-lg">
                <h5 className="mb-md">보유 스킬</h5>
                <div className="flex gap-sm" style={{ flexWrap: 'wrap' }}>
                  {selectedExpert.skills.map((skill, index) => (
                    <span key={index} className="badge badge-primary">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-lg">
                <h5 className="mb-md">포트폴리오</h5>
                <a href={selectedExpert.portfolio} target="_blank" rel="noopener noreferrer" className="text-primary">
                  {selectedExpert.portfolio}
                </a>
              </div>

              <button onClick={handleMatchingRequest} className="btn btn-primary btn-full btn-large">
                매칭 요청하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MatchedExpertListPage