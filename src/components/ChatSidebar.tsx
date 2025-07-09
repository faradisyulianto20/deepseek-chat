import { useState } from "react";

import { Link, Outlet } from 'react-router-dom'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "./ui/dialog"
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from "./ui/button";
import { Plus } from 'lucide-react'


const ChatSidebar = () => {

    const [dialogIsOpen, setDialogIsOpen] = useState(false)
    const [textInput, setTextInput]= useState("")

    return (
        <>
            <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen} >
                <DialogContent className="bg-gray-900 rounded-lg text-white">
                    <DialogHeader>
                        <DialogTitle>Create new thread</DialogTitle>
                        <div className="space-y-1">
                            <Label htmlFor='thread-title'>Thread title</Label>
                            <Input id="thread-title" value={textInput} onChange={(e) => {
                                setTextInput(e.target.value);
                            }}
                            placeholder="Your new thread title"/>
                        </div>
                        <DialogFooter>
                            <Button variant={"secondary"} onClick={() => setDialogIsOpen(false) }>Cancel</Button>
                            <Button>Create Thread</Button>
                        </DialogFooter>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
            <div className="flex">
                <aside className="w-64 h-screen bg-gray-900 flex flex-col text-white py-2 px-2 shadow-md space-y-6 border-r-2 border-r-slate-700">
                    <Button onClick={() => setDialogIsOpen(true)} className=" hover:bg-gray-800 rounded-lg w-full">
                        <Plus size={16} />
                        New Chat
                    </Button>
                    <div className="flex flex-col space-y-2 px-2 text-sm">
                        <Link to='' className="font-bold">Recent Chats</Link>
                        <div className="px-1 flex flex-col space-y-2">
                            <Link to=''>React Basics</Link>
                            <Link to=''>AI Ethics</Link>
                            <Link to=''>Climate Change</Link>
                            <Link to=''>Javascript Tips</Link>
                            <Link to=''>Machine Learning Intro</Link>
                        </div>
                        
                    </div>
                    {/* <h2 className="text-xl font-bold p-4">Chat Sidebar</h2> */}
                    
                    {/* Menu navigasi bisa di sini */}
                    

                </aside>
                <div className="w-full shadow-md">
                    <header className="h-16 bg-gray-900 text-white flex items-center px-4 shadow-md w-full justify-between border-b-2 border-b-slate-700">
                        <h1 className="text-lg font-semibold">AI Chat Dashboard</h1>

                        <div className="flex gap-2">
                            <Link to="/" className="hover:bg-gray-200 hover:text-gray-800 rounded-2xl text-white py-1 px-4 shadow-sm">Home</Link>
                            <Link to="/chat" className="hover:bg-gray-200 hover:text-gray-800 rounded-2xl text-white py-1 px-4 shadow-sm">Chat</Link>
                        </div>
                    </header>
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default ChatSidebar