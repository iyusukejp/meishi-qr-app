import { Routes, Route } from 'react-router-dom'
import ProfileEditor from './pages/ProfileEditor'
import QRCodePage from './pages/QRCodePage'
import ProfileView from './pages/ProfileView'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<ProfileEditor />} />
      <Route path="/qr" element={<QRCodePage />} />
      <Route path="/profile/:data" element={<ProfileView />} />
    </Routes>
  )
}
