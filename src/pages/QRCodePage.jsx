import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { QRCodeCanvas } from 'qrcode.react'
import { supabase } from '../lib/supabase'

const PROFILE_ID_KEY = 'mysns_profile_id'

export default function QRCodePage() {
  const [profile, setProfile] = useState(null)
  const [profileUrl, setProfileUrl] = useState('')
  const qrRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    const profileId = localStorage.getItem(PROFILE_ID_KEY)
    if (!profileId) { navigate('/'); return }

    supabase
      .from('mysns_profiles')
      .select('*')
      .eq('id', profileId)
      .single()
      .then(({ data, error }) => {
        if (!data || error) { navigate('/'); return }
        setProfile(data)
        const base = `${window.location.origin}${window.location.pathname}`
        setProfileUrl(`${base}#/profile/${profileId}`)
      })
  }, [navigate])

  function handleDownload() {
    const canvas = qrRef.current?.querySelector('canvas')
    if (!canvas) return
    const a = document.createElement('a')
    a.href = canvas.toDataURL('image/png')
    a.download = 'mysns-qr.png'
    a.click()
  }

  if (!profile) {
    return (
      <div className="qr-page">
        <div style={{ color: '#71717a', textAlign: 'center', paddingTop: 80 }}>読み込み中...</div>
      </div>
    )
  }

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

        <p className="qr-note">
          このQRコードは永久に使えます。<br />
          プロフィールを編集してもQRコードは変わりません。
        </p>

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
