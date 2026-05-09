import { useParams } from 'react-router-dom'
import { useMemo } from 'react'

function SnsLink({ href, label, colorClass, children }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`sns-link ${colorClass}`}>
      {children}
      <span>{label}</span>
    </a>
  )
}

export default function ProfileView() {
  const { data } = useParams()

  const profile = useMemo(() => {
    try {
      return JSON.parse(decodeURIComponent(escape(atob(data))))
    } catch {
      return null
    }
  }, [data])

  if (!profile) {
    return (
      <div className="page">
        <div className="container container-narrow">
          <p className="error-msg">プロフィールデータが無効です</p>
        </div>
      </div>
    )
  }

  return (
    <div className="page profile-view-page">
      <div className="container container-narrow">
        <div className="profile-card">
          <div className="profile-header">
            <div className="avatar">
              {profile.name.charAt(0)}
            </div>
            <div className="profile-name-block">
              <h1 className="profile-name">{profile.name}</h1>
              {profile.nameKana && <p className="profile-kana">{profile.nameKana}</p>}
              {(profile.title || profile.company) && (
                <p className="profile-position">
                  {profile.title && <span>{profile.title}</span>}
                  {profile.title && profile.company && <span className="sep"> / </span>}
                  {profile.company && <span>{profile.company}</span>}
                </p>
              )}
            </div>
          </div>

          <div className="contact-list">
            {profile.phone && (
              <a href={`tel:${profile.phone}`} className="contact-item">
                <span className="contact-icon phone-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.22 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92v2z"/>
                  </svg>
                </span>
                <span className="contact-text">{profile.phone}</span>
              </a>
            )}
            {profile.email && (
              <a href={`mailto:${profile.email}`} className="contact-item">
                <span className="contact-icon email-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </span>
                <span className="contact-text">{profile.email}</span>
              </a>
            )}
            {profile.website && (
              <a href={profile.website} target="_blank" rel="noopener noreferrer" className="contact-item">
                <span className="contact-icon web-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="2" y1="12" x2="22" y2="12"/>
                    <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
                  </svg>
                </span>
                <span className="contact-text">{profile.website}</span>
              </a>
            )}
          </div>

          {(profile.x || profile.instagram || profile.facebook || profile.linkedin) && (
            <div className="sns-section">
              <h2 className="sns-title">SNS</h2>
              <div className="sns-grid">
                {profile.x && (
                  <SnsLink
                    href={`https://x.com/${profile.x}`}
                    label={`@${profile.x}`}
                    colorClass="sns-x"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.264 5.636L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
                    </svg>
                  </SnsLink>
                )}
                {profile.instagram && (
                  <SnsLink
                    href={`https://instagram.com/${profile.instagram}`}
                    label={`@${profile.instagram}`}
                    colorClass="sns-instagram"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </SnsLink>
                )}
                {profile.facebook && (
                  <SnsLink
                    href={profile.facebook.startsWith('http') ? profile.facebook : `https://facebook.com/${profile.facebook}`}
                    label="Facebook"
                    colorClass="sns-facebook"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </SnsLink>
                )}
                {profile.linkedin && (
                  <SnsLink
                    href={profile.linkedin.startsWith('http') ? profile.linkedin : `https://linkedin.com/in/${profile.linkedin}`}
                    label="LinkedIn"
                    colorClass="sns-linkedin"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </SnsLink>
                )}
              </div>
            </div>
          )}

          <div className="profile-footer">
            <p>名刺QRコードアプリで作成</p>
          </div>
        </div>
      </div>
    </div>
  )
}
