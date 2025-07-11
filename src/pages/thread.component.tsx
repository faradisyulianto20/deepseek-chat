import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { db } from "../lib/dexie"
import ollama from "ollama"

import type { DEX_Thread } from "../lib/dexie" // pastikan ini diexport dari dexie.ts

import ChatMessage from '../components/ChatMessage'
import ThoughtMessage from '../components/ThoughtMessage'

import {Button} from '../components/ui/button'
import { useLiveQuery } from "dexie-react-hooks"


const Thread = () => {
    // const { threadId } = useParams()

    const [messageInput, setMessageInput] = useState("")
    const [streamedMessage, setStreamedMessage] = useState('')
    const [streamedThought, setStreamedThought] = useState('')

    const params = useParams();

    const messages = useLiveQuery(() => db.getMessagesForThread(params.threadId as string), [params.threadId])

    const handleSubmit = async () => {
        await db.createMessage({
            content: messageInput,
            role: "user",
            thought: '',
            thread_id: params.threadId as string,
        })

        setStreamedMessage("")
        setStreamedThought("")

        const stream = await ollama.chat({
            model: "deepseek-r1:1.5b",
            messages: [
                {
                    role: 'user',
                    content: messageInput.trim(),
                },
            ],
            stream: true
        })

        let fullContent = ""
        let fullThought = ""

        let outputMode: "think" | "response" = "think";

        for await (const part of stream) {
            const messageContent = part.message.content;

            if (outputMode === "think") {
                if (!(messageContent.includes("<think>") || messageContent.includes("</think>"))) {
                    fullThought += messageContent;
                }


                setStreamedThought(fullThought)

                if(messageContent.includes("</think>")) {
                    outputMode = "response"
                }
            } else {
                fullContent += messageContent
                setStreamedMessage(fullContent)
            }
        }

        await db.createMessage({
            content: fullContent,
            role: "assistant",
            thought: fullThought,
            thread_id: params.threadId as string,
        })
    }

    const { threadId } = useParams()
    const [thread, setThread] = useState<DEX_Thread | null>(null)

    useEffect(() => {
        if (!threadId) return

        const fetchThread = async () => {
        const data = await db.threads.get(threadId) // atau db.getThreadById(threadId)
        setThread(data ?? null)
        }

        fetchThread()
    }, [threadId])

    if (!thread) return <div className="p-4 text-white">Loading...</div>

    return (
        <div className="flex flex-col h-screen">
            <header className="h-16 bg-gray-900 text-white items-center px-4 shadow-md w-full border-b-2 border-b-slate-700 flex justify-between">
                <h1 className="text-lg font-semibold">AI Chat Dashboard</h1>
                <h1>{thread.title}</h1>
                <div className="text-sm text-gray-400">
                    <p>{thread.id}</p>
                    <p>Created at: {thread.created_at.toLocaleString()}</p>
                </div>
            </header>
            <div className="px-44 py-2 text-white flex-1 overflow-y-auto">
                {
                    messages?.map((message, index) => (
                        <ChatMessage key={index} role={message.role} content={message.content} thought={message.thought}/>
                    ))
                }
                {
                    !!streamedThought && 
                    <ThoughtMessage thought={streamedThought}/>
                }
                {
                    !!streamedMessage && 
                    <ChatMessage role="assistant" content={streamedMessage} />
                }
            </div>
            <div className="mt-auto bg-gray-900 px-4 border-t-2 border-t-slate-700 flex justify-center items-center">
                <div className="py-6 flex gap-2 items-center justify-center">
                    <input type="text" placeholder="type your message here..." className="text-white px-2 py-2 rounded-xl bg-gray-800  pl-4 md:w-96 w-full border-2 border-slate-700 outline-none focus:ring-0 focus:outline-none" value={messageInput} onChange={(e) => setMessageInput(e.target.value)}></input>
                    <Button className="bg-gray-800 text-white rounded-2xl py-1 px-4 shadow-sm hover:bg-gray-700 border-2 border-slate-700" onClick={handleSubmit}>Send</Button>
                </div>
            </div>
        </div>
        
    )
}

export default Thread
