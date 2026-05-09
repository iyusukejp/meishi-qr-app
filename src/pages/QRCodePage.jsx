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
    if (!stored) { navigate('/'); return }
    const data = JSON.parse(stored)
    setProfile(data)
    const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(data))))
    const url = `${window.location.origin}${window.location.pathname}#/profile/${encoded}`
    setProfileUrl(url)
  }, [navigate])

  function handleDownload() {
    const canvas = qrRef.current?.querySelector('canvas')
    if (!canvas) return
    const a = document.createElement('a')
    a.href = canvas.toDataURL('image/png')
    a.download = 'mysns-qr.png'
    a.click()
  }

  if (!profile) return null

  return (
    <div className="qr-page">
      <div className="qr-container">
        <button className="back-btn" onClick={() => navigate('/')}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          編集に戻る
        </button>

        <div className="qr-hero">
          <div className="qr-logo-small">MySNS</div>
          <h1 className="qr-name">{profile.name}</h1>
          <p className="qr-desc">QRコードをスキャンしてプロフィールを表示</p>
        </div>

        <div className="qr-card">
          <div className="qr-glow" />
          <div className="qr-inner" ref={qrRef}>
            <QRCodeCanvas
              value={profileUrl}
              size={200}
              level="M"
              includeMargin={false}
              bgColor="transparent"
              fgColor="#0f0f0f"
            />
          </div>
        </div>

        <div className="qr-actions">
          <button className="btn-dl" onClick={handleDownload}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            画像をダウンロード
          </button>
        </div>
      </div>
    </div>
  )
}
