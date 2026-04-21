import { NextRequest, NextResponse } from 'next/server'
import { retrieve } from '@/lib/retrieval'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const q = (body as { q?: unknown })?.q
  if (typeof q !== 'string' || q.trim().length === 0) {
    return NextResponse.json({ error: 'Missing "q" string' }, { status: 400 })
  }
  if (q.length > 400) {
    return NextResponse.json({ error: 'Query too long' }, { status: 400 })
  }

  const result = retrieve(q.trim(), 3)

  // Generation layer intentionally omitted. Swap in OpenAI/Anthropic here
  // when a key is configured to synthesize a cited answer from `result.hits`.
  return NextResponse.json(result)
}
