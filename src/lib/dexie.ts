import Dexie from 'dexie';
// import { threadId } from 'node:worker_threads';

export interface DEX_Thread {
  id: string;
  title: string;
  created_at: Date;
  updated_at: Date;
}

interface DEX_Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  thought: string;
  created_at: Date;
  thread_id: string;
}

class ChatDB extends Dexie {
  threads!: Dexie.Table<DEX_Thread, string>;
  messages!: Dexie.Table<DEX_Message>

  constructor() {
    super("chat-db");
    this.version(1).stores({
      threads: "id, title, created_at, updated_at",
      messages: "id, role, content, thought, created_at, thread_id"
    });

    this.threads.hook("creating", (_, obj) => {
      obj.created_at = new Date();
      obj.updated_at = new Date();
    });

    this.messages.hook("creating", (_,obj) => {
      obj.created_at = new Date()
    })
  }

  async createThread(title: string) {
    const id = crypto.randomUUID();
    await this.threads.add({
      id,
      title,
      created_at: new Date(),
      updated_at: new Date(),
    });
    return id;
  }

  async getAllThreads() {
    return this.threads.reverse().sortBy("updated_at");
  }

  async getThreadById(id: string): Promise<DEX_Thread | undefined> {
    return await this.threads.get(id);
  }

  async createMessage(
    message: Pick<DEX_Message, "content" | "role" | "thread_id" | "thought" >
  ) {
    const messageId = crypto.randomUUID();

    await this.transaction("rw", [this.threads, this.messages], async () => {
      await this.messages.add({
        ...message,
        id: messageId,
        created_at: new Date()
      })

      await this.threads.update(message.thread_id, {
        updated_at: new Date()
      })
    })
  }
}

export const db = new ChatDB();
