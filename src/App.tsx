import { Routes, Route } from 'react-router-dom'
import Home from './pages/home.component.tsx'
import Chat from './pages/chat.component.tsx'
import ChatSidebar from './components/ChatSidebar.tsx'

function App() {
  return (
    <Routes>
      <Route path='/' element={<ChatSidebar />}>
        <Route index element={<Home />} />
        <Route path="/chat" element={<Chat />} />
      </Route>
    </Routes>
  )
}
export default App
