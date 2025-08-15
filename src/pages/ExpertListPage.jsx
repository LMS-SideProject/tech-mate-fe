import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { categories, experts } from '../data/mockData'

function ExpertListPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const [selectedCategory, setSelectedCategory] = useState(location.state?.category || '전체')
  const [filteredExperts, setFilteredExperts] = useState(experts)
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [selectedExpert, setSelectedExpert] = useState(null)

  useEffect(() => {
    if (selectedCategory === '전체') {
      setFilteredExperts(experts)
    } else {
      setFilteredExperts(experts.filter(expert => expert.category === selectedCategory))
    }
  }, [selectedCategory])

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
    navigate('/chat/expert/' + selectedExpert.id)
  }

  return (
    <div className="expert-list-page" style={{ minHeight: '100vh', paddingTop: '40px' }}>
      <div className="container">
        <h1 className="mb-xl">전문가 찾기</h1>
        
        {/* Category Filter */}
        <div className="category-filter mb-xl">
          <div className="flex gap-sm" style={{ flexWrap: 'wrap' }}>
            <button
              className={`btn ${selectedCategory === '전체' ? 'btn-primary' : 'btn-secondary'} btn-small`}
              onClick={() => setSelectedCategory('전체')}
            >
              전체
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                className={`btn ${selectedCategory === category.name ? 'btn-primary' : 'btn-secondary'} btn-small`}
                onClick={() => setSelectedCategory(category.name)}
              >
                {category.icon} {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Expert Grid */}
        <div className="grid grid-cols-3 gap-lg">
          {filteredExperts.map((expert) => (
            <div
              key={expert.id}
              className="card"
              style={{ cursor: 'pointer' }}
              onClick={() => handleExpertClick(expert)}
            >
              <div className="flex gap-md mb-md">
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

        {filteredExperts.length === 0 && (
          <div className="text-center" style={{ padding: '80px 0' }}>
            <p className="text-secondary">해당 카테고리에 등록된 전문가가 없습니다.</p>
          </div>
        )}
      </div>

      {/* Profile Modal */}
      {showProfileModal && selectedExpert && (
        <div className="modal-overlay" onClick={() => setShowProfileModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px' }}>
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

export default ExpertListPage