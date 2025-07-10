import { useLayoutEffect, useState } from "react";
import {useLocation} from 'react-router';

import { Link, Outlet } from 'react-router-dom'
import { useLiveQuery } from 'dexie-react-hooks'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "./ui/dialog"
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from "./ui/button";
import { Plus } from 'lucide-react'

import { db } from '../lib/dexie'


const ChatSidebar = () => {

    const [activeThread, setActiveThread] = useState("")
    const [dialogIsOpen, setDialogIsOpen] = useState(false)
    const [textInput, setTextInput]= useState("")

    const handleCreateThread = async () => {
        const threadId = await db.createThread(textInput);

        setDialogIsOpen(false);
        setTextInput('')
    }

    const threads = useLiveQuery(() => db.getAllThreads(), [])
    console.log(threads);

    const location = useLocation();
    // console.log(location);
    

    useLayoutEffect(() => {
        const activeThreadId = location.pathname.split('/')[2]
        setActiveThread(activeThreadId)
    }, [location.pathname])
    

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
                            <Button variant="secondary" onClick={() => setDialogIsOpen(false) }>Cancel</Button>
                            <Button onClick={handleCreateThread }>Create Thread</Button>
                        </DialogFooter>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
            <div className="flex bg-slate-900">
                <aside className="w-64 h-screen bg-gray-900 flex flex-col text-white py-2 px-2 shadow-md space-y-6 border-r-2 border-r-slate-700">
                    <Button onClick={() => setDialogIsOpen(true)} className=" hover:bg-gray-800 rounded-2xl w-full border-2 border-slate-700">
                        <Plus size={16} />
                        New Chat
                    </Button>
                    <div className="flex flex-col space-y-2 text-sm">
                        <p className="font-bold px-3">Recent Chats</p>
                        <div className=" flex flex-col">
                            {
                                threads?.map((thread) => (
                                    <Link to={`/thread/${thread.id}`}
  className={`px-2 py-2 rounded-lg hover:bg-gray-800 ${
    thread.id === activeThread ? 'bg-gray-800 font-semibold' : ''
  }`}>{thread.title}</Link>
                                ))
                            }
                        </div>
                        
                    </div>
                    {/* <h2 className="text-xl font-bold p-4">Chat Sidebar</h2> */}
                    
                    {/* Menu navigasi bisa di sini */}
                    

                </aside>
                <div className="w-full shadow-md flex flex-col">
                    <header className="h-16 bg-gray-900 text-white flex items-center px-4 shadow-md w-full border-b-2 border-b-slate-700">
                        <h1 className="text-lg font-semibold">AI Chat Dashboard</h1>
                    </header>
                    <Outlet />
                    <div className="mt-auto bg-gray-900 px-4 border-t-2 border-t-slate-700 flex justify-center items-center">
                        <div className="py-6 flex gap-2 items-center justify-center">
                            <input type="text" placeholder="type your message here..." className="text-white px-2 py-2 rounded-xl bg-gray-800  pl-4 md:w-96 w-full"></input>
                            <Button className="bg-gray-800 text-white rounded-2xl py-1 px-4 shadow-sm hover:bg-gray-400">Send</Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChatSidebar