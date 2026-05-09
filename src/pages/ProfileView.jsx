import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const SNS_CONFIG = {
  x: {
    label: 'X (Twitter)',
    getUrl: v => `https://x.com/${v}`,
    getLabel: v => `@${v}`,
    icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.264 5.636L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/></svg>,
  },
  instagram: {
    label: 'Instagram',
    getUrl: v => `https://instagram.com/${v}`,
    getLabel: v => `@${v}`,
    icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>,
  },
  facebook: {
    label: 'Facebook',
    getUrl: v => v.startsWith('http') ? v : `https://facebook.com/${v}`,
    getLabel: () => 'Facebook',
    icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>,
  },
  line: {
    label: 'LINE',
    getUrl: v => `https://line.me/ti/p/~${v}`,
    getLabel: () => 'LINE',
    icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/></svg>,
  },
}

export default function ProfileView() {
  const { id } = useParams()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    supabase
      .from('mysns_profiles')
      .select('*')
      .eq('id', id)
      .single()
      .then(({ data, error }) => {
        if (!data || error) setNotFound(true)
        else setProfile(data)
        setLoading(false)
      })
  }, [id])

  if (loading) {
    return (
      <div className="view-page">
        <div style={{ color: 'rgba(255,255,255,0.4)', textAlign: 'center', paddingTop: 100 }}>読み込み中...</div>
      </div>
    )
  }

  if (notFound) {
    return (
      <div className="view-page">
        <div style={{ color: 'rgba(255,255,255,0.4)', textAlign: 'center', paddingTop: 100 }}>プロフィールが見つかりません</div>
      </div>
    )
  }

  const initials = profile.name?.trim().charAt(0) ?? '?'

  return (
    <div className="view-page">
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <linearGradient id="ig-grad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f09433"/>
            <stop offset="50%" stopColor="#dc2743"/>
            <stop offset="100%" stopColor="#bc1888"/>
          </linearGradient>
        </defs>
      </svg>

      <div className="view-container">
        <div className="view-avatar-wrap">
          {profile.avatar_url ? (
            <img src={profile.avatar_url} alt={profile.name} className="view-avatar view-avatar-img" />
          ) : (
            <div className="view-avatar">{initials}</div>
          )}
          <div className="view-avatar-ring" />
        </div>

        <h1 className="view-name">{profile.name}</h1>
        <p className="view-brand">MySNS</p>

        {(profile.phone || profile.email || profile.website) && (
          <div className="view-contacts">
            {profile.phone && (
              <a href={`tel:${profile.phone}`} className="contact-row">
                <span className="contact-icon-wrap">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.22 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92v2z"/></svg>
                </span>
                <span className="contact-val">{profile.phone}</span>
                <svg className="contact-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
              </a>
            )}
            {profile.email && (
              <a href={`mailto:${profile.email}`} className="contact-row">
                <span className="contact-icon-wrap">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                </span>
                <span className="contact-val">{profile.email}</span>
                <svg className="contact-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
              </a>
            )}
            {profile.website && (
              <a href={profile.website} target="_blank" rel="noopener noreferrer" className="contact-row">
                <span className="contact-icon-wrap">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>
                </span>
                <span className="contact-val">{profile.website}</span>
                <svg className="contact-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
              </a>
            )}
          </div>
        )}

        {['x', 'instagram', 'facebook', 'line'].some(k => profile[k]) && (
          <div className="view-sns">
            {['x', 'instagram', 'facebook', 'line'].map(key => {
              const val = profile[key]
              if (!val) return null
              const cfg = SNS_CONFIG[key]
              return (
                <a key={key} href={cfg.getUrl(val)} target="_blank" rel="noopener noreferrer"
                  className={`sns-btn sns-btn-${key}`}>
                  <span className="sns-btn-icon">{cfg.icon}</span>
                  <span className="sns-btn-label">{cfg.label}</span>
                  <span className="sns-btn-val">{cfg.getLabel(val)}</span>
                </a>
              )
            })}
          </div>
        )}

        <p className="view-footer">MySNS で作成</p>
      </div>
    </div>
  )
}
