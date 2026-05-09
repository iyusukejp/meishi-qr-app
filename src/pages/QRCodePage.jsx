import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { QRCodeCanvas } from 'qrcode.react'

const STORAGE_KEY = 'meishi_profile'

export default function QRCodePage() {
  const [profile, setProfile] = useState(null)
  const [profileUrl, setProfileUrl] = useState('')
  const qrRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) {
      navigate('/')
      return
    }
    const data = JSON.parse(stored)
    setProfile(data)

    const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(data))))
    const url = `${window.location.origin}${window.location.pathname}#/profile/${encoded}`
    setProfileUrl(url)
  }, [navigate])

  function handleDownload() {
    const canvas = qrRef.current?.querySelector('canvas')
    if (!canvas) return
    const url = canvas.toDataURL('image/png')
    const a = document.createElement('a')
    a.href = url
    a.download = 'meishi-qr.png'
    a.click()
  }

  if (!profile) return null

  return (
    <div className="page">
      <div className="container container-narrow">
        <header className="page-header">
          <h1 className="app-title">QRコード</h1>
          <p className="app-subtitle">{profile.name} さんの名刺QRコード</p>
        </header>

        <div className="qr-card">
          <div className="qr-wrapper" ref={qrRef}>
            <QRCodeCanvas
              value={profileUrl}
              size={220}
              level="M"
              includeMargin={true}
              bgColor="#ffffff"
              fgColor="#1a1a2e"
            />
          </div>
          <p className="qr-hint">スキャンするとプロフィールが表示されます</p>

          <div className="qr-actions">
            <button className="btn btn-primary" onClick={handleDownload}>
              画像をダウンロード
            </button>
            <button className="btn btn-secondary" onClick={() => navigate('/')}>
              プロフィールを編集
            </button>
          </div>
        </div>

        <div className="preview-card">
          <h2 className="section-title">プロフィール確認</h2>
          <dl className="preview-list">
            {profile.name && (
              <div className="preview-item">
                <dt>氏名</dt>
                <dd>{profile.name}{profile.nameKana && <span className="kana"> ({profile.nameKana})</span>}</dd>
              </div>
            )}
            {profile.title && (
              <div className="preview-item">
                <dt>役職</dt>
                <dd>{profile.title}</dd>
              </div>
            )}
            {profile.company && (
              <div className="preview-item">
                <dt>会社</dt>
                <dd>{profile.company}</dd>
              </div>
            )}
            {profile.phone && (
              <div className="preview-item">
                <dt>電話</dt>
                <dd>{profile.phone}</dd>
              </div>
            )}
            {profile.email && (
              <div className="preview-item">
                <dt>メール</dt>
                <dd>{profile.email}</dd>
              </div>
            )}
            {profile.website && (
              <div className="preview-item">
                <dt>Web</dt>
                <dd>{profile.website}</dd>
              </div>
            )}
            {profile.x && (
              <div className="preview-item">
                <dt>X</dt>
                <dd>@{profile.x}</dd>
              </div>
            )}
            {profile.instagram && (
              <div className="preview-item">
                <dt>Instagram</dt>
                <dd>@{profile.instagram}</dd>
              </div>
            )}
            {profile.facebook && (
              <div className="preview-item">
                <dt>Facebook</dt>
                <dd>{profile.facebook}</dd>
              </div>
            )}
            {profile.linkedin && (
              <div className="preview-item">
                <dt>LinkedIn</dt>
                <dd>{profile.linkedin}</dd>
              </div>
            )}
          </dl>
        </div>
      </div>
    </div>
  )
}
