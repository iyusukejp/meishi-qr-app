import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const STORAGE_KEY = 'meishi_profile'

const defaultProfile = {
  name: '',
  nameKana: '',
  title: '',
  company: '',
  phone: '',
  email: '',
  website: '',
  x: '',
  instagram: '',
  facebook: '',
  linkedin: '',
}

export default function ProfileEditor() {
  const [profile, setProfile] = useState(defaultProfile)
  const [saved, setSaved] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        setProfile(JSON.parse(stored))
      } catch {}
    }
  }, [])

  function handleChange(e) {
    setProfile(prev => ({ ...prev, [e.target.name]: e.target.value }))
    setSaved(false)
  }

  function handleSave(e) {
    e.preventDefault()
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile))
    setSaved(true)
  }

  function handleGenerateQR() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile))
    navigate('/qr')
  }

  return (
    <div className="page">
      <div className="container">
        <header className="page-header">
          <h1 className="app-title">名刺QRコード</h1>
          <p className="app-subtitle">プロフィールを入力してQRコードを生成</p>
        </header>

        <form onSubmit={handleSave} className="form-card">
          <section className="form-section">
            <h2 className="section-title">基本情報</h2>
            <div className="field-group">
              <div className="field">
                <label>氏名</label>
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  placeholder="山田 太郎"
                />
              </div>
              <div className="field">
                <label>氏名（フリガナ）</label>
                <input
                  type="text"
                  name="nameKana"
                  value={profile.nameKana}
                  onChange={handleChange}
                  placeholder="ヤマダ タロウ"
                />
              </div>
              <div className="field">
                <label>役職</label>
                <input
                  type="text"
                  name="title"
                  value={profile.title}
                  onChange={handleChange}
                  placeholder="代表取締役"
                />
              </div>
              <div className="field">
                <label>会社名</label>
                <input
                  type="text"
                  name="company"
                  value={profile.company}
                  onChange={handleChange}
                  placeholder="株式会社サンプル"
                />
              </div>
            </div>
          </section>

          <section className="form-section">
            <h2 className="section-title">連絡先</h2>
            <div className="field-group">
              <div className="field">
                <label>電話番号</label>
                <input
                  type="tel"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  placeholder="090-1234-5678"
                />
              </div>
              <div className="field">
                <label>メールアドレス</label>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  placeholder="taro@example.com"
                />
              </div>
              <div className="field">
                <label>ウェブサイト</label>
                <input
                  type="url"
                  name="website"
                  value={profile.website}
                  onChange={handleChange}
                  placeholder="https://example.com"
                />
              </div>
            </div>
          </section>

          <section className="form-section">
            <h2 className="section-title">SNSアカウント</h2>
            <div className="field-group">
              <div className="field">
                <label className="sns-label x-label">X (Twitter)</label>
                <div className="input-prefix">
                  <span>@</span>
                  <input
                    type="text"
                    name="x"
                    value={profile.x}
                    onChange={handleChange}
                    placeholder="username"
                  />
                </div>
              </div>
              <div className="field">
                <label className="sns-label instagram-label">Instagram</label>
                <div className="input-prefix">
                  <span>@</span>
                  <input
                    type="text"
                    name="instagram"
                    value={profile.instagram}
                    onChange={handleChange}
                    placeholder="username"
                  />
                </div>
              </div>
              <div className="field">
                <label className="sns-label facebook-label">Facebook</label>
                <input
                  type="text"
                  name="facebook"
                  value={profile.facebook}
                  onChange={handleChange}
                  placeholder="プロフィールURL または ユーザーネーム"
                />
              </div>
              <div className="field">
                <label className="sns-label linkedin-label">LinkedIn</label>
                <input
                  type="text"
                  name="linkedin"
                  value={profile.linkedin}
                  onChange={handleChange}
                  placeholder="プロフィールURL または ユーザーネーム"
                />
              </div>
            </div>
          </section>

          <div className="form-actions">
            <button type="submit" className="btn btn-secondary">
              保存
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleGenerateQR}
              disabled={!profile.name}
            >
              QRコードを生成
            </button>
          </div>

          {saved && <p className="save-notice">保存しました</p>}
          {!profile.name && (
            <p className="hint">氏名を入力するとQRコードを生成できます</p>
          )}
        </form>
      </div>
    </div>
  )
}
