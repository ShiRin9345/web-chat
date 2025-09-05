import { ChromaClient } from 'chromadb'
import { config } from '../config/index.ts'
import type { Collection, Metadata } from 'chromadb'

class ChromaService {
  private client: ChromaClient
  private collectionPromise: Promise<Collection>

  constructor() {
    this.client = new ChromaClient({ path: config.chroma.url })
    this.collectionPromise = this.client.getOrCreateCollection({
      name: config.chroma.collection,
    })
  }

  private async getCollection() {
    return this.collectionPromise
  }

  async upsertUser(userId: string, tags: Array<string>) {
    const collection = await this.getCollection()
    const doc = tags.join(', ')
    await collection.upsert({
      ids: [userId],
      documents: [doc],
      metadatas: [
        {
          user_id: userId,
          tags: tags.join(','),
          tag_count: tags.length,
        } as Metadata,
      ],
    })
  }

  async recommendByUser(userId: string, limit = 4) {
    const collection = await this.getCollection()
    // Fetch the target user's vector by querying with its own doc
    const userDoc = await collection.get({ ids: [userId] })
    const doc = userDoc.documents?.[0]
    if (!doc) return { ids: [], distances: [] }

    const result = await collection.query({
      queryTexts: [doc],
      nResults: limit + 1,
      where: { user_id: { $ne: userId } },
    })
    return result
  }
}

export const chromaService = new ChromaService()
