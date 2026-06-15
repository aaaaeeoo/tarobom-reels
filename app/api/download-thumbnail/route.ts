import { NextRequest, NextResponse } from 'next/server'
import sharp from 'sharp'
import { keywordImageMap } from '@/lib/keywordImages'

const IMG_W = 280
const IMG_H = Math.round(IMG_W * 20 / 9) // 622 — 9:20 비율
const BORDER = 3
const GAP = 16
const PADDING = 40
const BORDER_COLOR = { r: 232, g: 232, b: 232 } // #E8E8E8

const TOTAL_W = PADDING * 2 + (IMG_W + BORDER * 2) * 3 + GAP * 2
const TOTAL_H = PADDING * 2 + IMG_H + BORDER * 2

export async function POST(request: NextRequest) {
  const { keywords } = await request.json().catch(() => ({ keywords: [] }))

  if (!Array.isArray(keywords) || keywords.length !== 3) {
    return new NextResponse('keywords must be an array of 3', { status: 400 })
  }

  const imageBuffers = await Promise.all(
    keywords.map(async (kw: string) => {
      const url = keywordImageMap[kw]
      if (!url) return null
      const res = await fetch(url)
      if (!res.ok) return null
      return Buffer.from(await res.arrayBuffer())
    })
  )

  const resizedWithBorder = await Promise.all(
    imageBuffers.map(async (buf) => {
      if (!buf) {
        return sharp({
          create: { width: IMG_W, height: IMG_H, channels: 3, background: { r: 30, g: 30, b: 30 } },
        }).png().toBuffer()
      }
      return sharp(buf)
        .resize(IMG_W, IMG_H, { fit: 'cover', position: 'centre' })
        .extend({ top: BORDER, bottom: BORDER, left: BORDER, right: BORDER, background: BORDER_COLOR })
        .toBuffer()
    })
  )

  const blockW = IMG_W + BORDER * 2

  const composite = resizedWithBorder.map((buf, i) => ({
    input: buf,
    left: PADDING + i * (blockW + GAP),
    top: PADDING,
  }))

  const output = await sharp({
    create: { width: TOTAL_W, height: TOTAL_H, channels: 3, background: { r: 0, g: 0, b: 0 } },
  })
    .composite(composite)
    .jpeg({ quality: 92 })
    .toBuffer()

  return new NextResponse(output.buffer as ArrayBuffer, {
    headers: {
      'Content-Type': 'image/jpeg',
      'Content-Disposition': `attachment; filename*=UTF-8''${encodeURIComponent('릴스_썸네일.jpg')}`,
    },
  })
}
