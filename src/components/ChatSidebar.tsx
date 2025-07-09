import { useState } from "react";

import { Link, Outlet } from 'react-router-dom'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from "./ui/button";
import { Plus } from 'lucide-react'


const ChatSidebar = () => {

    const [dialogIsOpen, setDialogIsOpen] = useState(false)

    return (
        <>
            <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen} >
                <DialogContent className="bg-white rounded-lg">
                    <DialogHeader>
                        <DialogTitle>Create new thread</DialogTitle>
                        <div className="space-y-1">
                            <Label htmlFor='thread-title'>Thread title</Label>
                            <Input id="thread-title"/>
                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
            <div className="flex">
                <aside className="w-64 h-screen bg-black flex flex-col text-white py-6 px-4">
                    <div className="flex items-center pb-6">
                        <Button onClick={() => setDialogIsOpen(true)} className="bg-white text-black hover:bg-gray-300 rounded-xl w-full">
                            <Plus size={16} />
                            New Chat
                        </Button>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <Link to=''>Recent Chats</Link>
                        <Link to=''>React Basics</Link>
                        <Link to=''>AI Ethics</Link>
                        <Link to=''>Climate Change</Link>
                        <Link to=''>Javascript Tips</Link>
                        <Link to=''>Machine Learning Intro</Link>
                    </div>
                    {/* <h2 className="text-xl font-bold p-4">Chat Sidebar</h2> */}
                    
                    {/* Menu navigasi bisa di sini */}
                    

                </aside>
                <div className="w-full">
                    <header className="h-16 bg-black text-white flex items-center px-4 shadow-md w-full justify-between">
                        <h1 className="text-lg font-semibold">AI Chat Dashboard</h1>
                        <div className="flex gap-2">
                            <Link to="/" className="hover:bg-gray-500 rounded-xl text-white py-1 px-4 shadow-sm">Home</Link>
                            <Link to="/chat" className="hover:bg-gray-500 rounded-xl text-white py-1 px-4 shadow-sm">Chat</Link>
                        </div>
                    </header>
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default ChatSidebar