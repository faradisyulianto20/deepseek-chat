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
                <DialogContent className="bg-gray-900 rounded-2xl text-white border-none shadow-md">
                    <DialogHeader className="space-y-4">
                        <DialogTitle>Create new thread</DialogTitle>
                        <div className="space-y-1">
                            <Label htmlFor='thread-title'>Thread title</Label>
                            <Input id="thread-title" value={textInput} onChange={(e) => {
                                setTextInput(e.target.value);
                            }}
                            placeholder="Your new thread title"
                            className="rounded-2xl"/>
                        </div>
                        <DialogFooter>
                            <Button variant="secondary" onClick={() => setDialogIsOpen(false) } className="bg-gray-800 text-white rounded-2xl py-1 px-4 shadow-sm hover:bg-gray-700">Cancel</Button>
                            <Button onClick={handleCreateThread } className="bg-gray-800 text-white rounded-2xl py-1 px-4 shadow-sm hover:bg-gray-700">Create Thread</Button>
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
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default ChatSidebar