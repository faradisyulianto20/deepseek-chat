import { Routes, Route } from 'react-router-dom'
import Home from './pages/home.component.jsx'
import Chat from './pages/chat.component.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  )
}
export default App
