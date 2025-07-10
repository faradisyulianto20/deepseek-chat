import Dexie from 'dexie';

export interface DEX_Thread {
  id: string;
  title: string;
  created_at: Date;
  updated_at: Date;
}

class ChatDB extends Dexie {
  threads!: Dexie.Table<DEX_Thread, string>;

  constructor() {
    super("chat-db");
    this.version(1).stores({
      threads: "id, title, created_at, updated_at"
    });

    this.threads.hook("creating", (_, obj) => {
      obj.created_at = new Date();
      obj.updated_at = new Date();
    });
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
}

export const db = new ChatDB();
