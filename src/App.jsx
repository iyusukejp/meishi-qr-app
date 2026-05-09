import { Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'

const ProfileEditor = lazy(() => import('./pages/ProfileEditor'))
const QRCodePage = lazy(() => import('./pages/QRCodePage'))
const ProfileView = lazy(() => import('./pages/ProfileView'))

export default function App() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<ProfileEditor />} />
        <Route path="/qr" element={<QRCodePage />} />
        <Route path="/profile/:id" element={<ProfileView />} />
      </Routes>
    </Suspense>
  )
}
