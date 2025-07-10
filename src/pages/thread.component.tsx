import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { db } from "../lib/dexie"

import type { DEX_Thread } from "../lib/dexie" // pastikan ini diexport dari dexie.ts

const Thread = () => {
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
    <div className="px-4 py-6 text-white">
      <h1 className="text-2xl font-bold mb-2">Thread ID:</h1>
      <p className="mb-4">{thread.id}</p>
      <p className="text-sm text-gray-400">
        Created at: {thread.created_at.toLocaleString()}
      </p>
    </div>
  )
}

export default Thread
