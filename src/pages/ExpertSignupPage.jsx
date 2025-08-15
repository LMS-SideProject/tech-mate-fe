import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function ExpertSignupPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      birth: ''
    },
    careerInfo: {
      resume: '',
      experience: '',
      portfolio: '',
      github: ''
    },
    teachingAreas: []
  })

  const handlePersonalInfoSubmit = (e) => {
    e.preventDefault()
    setStep(2)
  }

  const handleCareerInfoSubmit = (e) => {
    e.preventDefault()
    setStep(3)
    // AI 분석 시뮬레이션
    setTimeout(() => {
      const suggestedAreas = [
        'React 웹 개발',
        'Node.js 백엔드',
        'AWS 클라우드',
        'UI/UX 디자인'
      ]
      setFormData(prev => ({ ...prev, teachingAreas: suggestedAreas }))
    }, 1000)
  }

  const handleFinalSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    // 가입 완료 시뮬레이션
    setTimeout(() => {
      alert('전문가 등록이 완료되었습니다!\n2-3일 이내로 인증 결과를 알려드리겠습니다.')
      navigate('/')
    }, 1500)
  }

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <form onSubmit={handlePersonalInfoSubmit}>
            <h3 className="mb-lg">개인 정보</h3>
            <div className="form-group">
              <label className="form-label">이름</label>
              <input
                type="text"
                className="form-input"
                required
                value={formData.personalInfo.name}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  personalInfo: { ...prev.personalInfo, name: e.target.value }
                }))}
              />
            </div>
            <div className="form-group">
              <label className="form-label">이메일</label>
              <input
                type="email"
                className="form-input"
                required
                value={formData.personalInfo.email}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  personalInfo: { ...prev.personalInfo, email: e.target.value }
                }))}
              />
            </div>
            <div className="form-group">
              <label className="form-label">전화번호</label>
              <input
                type="tel"
                className="form-input"
                required
                value={formData.personalInfo.phone}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  personalInfo: { ...prev.personalInfo, phone: e.target.value }
                }))}
              />
            </div>
            <div className="form-group">
              <label className="form-label">생년월일</label>
              <input
                type="date"
                className="form-input"
                required
                value={formData.personalInfo.birth}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  personalInfo: { ...prev.personalInfo, birth: e.target.value }
                }))}
              />
            </div>
            <button type="submit" className="btn btn-primary btn-full">
              다음 단계
            </button>
          </form>
        )
      
      case 2:
        return (
          <form onSubmit={handleCareerInfoSubmit}>
            <h3 className="mb-lg">경력 정보</h3>
            <div className="form-group">
              <label className="form-label">이력서</label>
              <textarea
                className="form-textarea"
                placeholder="주요 경력사항을 입력해주세요"
                required
                value={formData.careerInfo.resume}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  careerInfo: { ...prev.careerInfo, resume: e.target.value }
                }))}
              />
            </div>
            <div className="form-group">
              <label className="form-label">경력 기간</label>
              <select
                className="form-select"
                required
                value={formData.careerInfo.experience}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  careerInfo: { ...prev.careerInfo, experience: e.target.value }
                }))}
              >
                <option value="">선택하세요</option>
                <option value="1-3">1-3년</option>
                <option value="3-5">3-5년</option>
                <option value="5-10">5-10년</option>
                <option value="10+">10년 이상</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">포트폴리오 URL</label>
              <input
                type="url"
                className="form-input"
                placeholder="https://..."
                value={formData.careerInfo.portfolio}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  careerInfo: { ...prev.careerInfo, portfolio: e.target.value }
                }))}
              />
            </div>
            <div className="form-group">
              <label className="form-label">GitHub URL</label>
              <input
                type="url"
                className="form-input"
                placeholder="https://github.com/..."
                value={formData.careerInfo.github}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  careerInfo: { ...prev.careerInfo, github: e.target.value }
                }))}
              />
            </div>
            <div className="flex gap-md">
              <button 
                type="button" 
                onClick={() => setStep(1)}
                className="btn btn-secondary"
              >
                이전
              </button>
              <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                AI 분석 시작
              </button>
            </div>
          </form>
        )
      
      case 3:
        return (
          <form onSubmit={handleFinalSubmit}>
            <h3 className="mb-lg">교육 분야 설정</h3>
            <div className="card bg-gradient-blue mb-lg">
              <p className="font-semibold mb-md">AI가 분석한 추천 교육 분야</p>
              <div className="flex flex-column gap-sm">
                {formData.teachingAreas.map((area, index) => (
                  <div key={index} className="flex flex-between">
                    <span>{area}</span>
                    <button
                      type="button"
                      onClick={() => {
                        const newAreas = [...formData.teachingAreas]
                        newAreas.splice(index, 1)
                        setFormData(prev => ({ ...prev, teachingAreas: newAreas }))
                      }}
                      className="text-error"
                      style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                      삭제
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="form-group">
              <label className="form-label">교육 분야 추가</label>
              <input
                type="text"
                className="form-input"
                placeholder="추가할 교육 분야를 입력하고 Enter를 누르세요"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    const value = e.target.value.trim()
                    if (value) {
                      setFormData(prev => ({
                        ...prev,
                        teachingAreas: [...prev.teachingAreas, value]
                      }))
                      e.target.value = ''
                    }
                  }
                }}
              />
            </div>

            <div className="card bg-gray-50 mb-lg">
              <p className="font-semibold mb-sm">등록 후 절차</p>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li className="mb-sm">✓ 제출하신 정보를 검토합니다</li>
                <li className="mb-sm">✓ 2-3일 이내 인증 결과를 알려드립니다</li>
                <li className="mb-sm">✓ 승인 후 바로 교육을 시작할 수 있습니다</li>
              </ul>
            </div>

            <div className="flex gap-md">
              <button 
                type="button" 
                onClick={() => setStep(2)}
                className="btn btn-secondary"
              >
                이전
              </button>
              <button 
                type="submit" 
                className="btn btn-primary" 
                style={{ flex: 1 }}
                disabled={isLoading || formData.teachingAreas.length === 0}
              >
                {isLoading ? <span className="spinner"></span> : '전문가 등록 완료'}
              </button>
            </div>
          </form>
        )
      
      default:
        return null
    }
  }

  return (
    <div className="expert-signup-page" style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #e8d5ff, #d5e8ff)', padding: '40px 0' }}>
      <div className="container">
        <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 className="text-center mb-lg">전문가 등록</h2>
          
          {/* Progress Bar */}
          <div className="mb-xl">
            <div className="flex flex-between mb-sm">
              <span className={step >= 1 ? 'text-primary font-semibold' : 'text-secondary'}>
                1. 개인정보
              </span>
              <span className={step >= 2 ? 'text-primary font-semibold' : 'text-secondary'}>
                2. 경력정보
              </span>
              <span className={step >= 3 ? 'text-primary font-semibold' : 'text-secondary'}>
                3. 교육분야
              </span>
            </div>
            <div style={{ height: '4px', background: 'var(--gray-200)', borderRadius: '2px', overflow: 'hidden' }}>
              <div 
                style={{ 
                  height: '100%', 
                  background: 'var(--primary-blue)', 
                  width: `${(step / 3) * 100}%`,
                  transition: 'width 0.3s ease'
                }}
              />
            </div>
          </div>

          {renderStep()}
        </div>
      </div>
    </div>
  )
}

export default ExpertSignupPage