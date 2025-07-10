import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from './pages/home.component.tsx'
import Chat from './pages/chat.component.tsx'
import ChatSidebar from './components/ChatSidebar.tsx'
import Thread from './pages/thread.component.tsx'
// import {SidebarProvider} from './components/ui/sidebar.tsx'

function App() {

  // const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <Routes>
      <Route path='/' element={<ChatSidebar />}>
        <Route index element={<Home />} />
        <Route path="/chat" element={<Chat />} />
        <Route path='/thread/:threadId' element={<Thread />} />
      </Route>
    </Routes>
  )
}
export default App
