'use client'
import * as React from 'react'
import { useEffect, useRef } from 'react'
import { createNoise2D } from 'simplex-noise'

interface Point {
  x: number
  y: number
  wave: { x: number; y: number }
  cursor: { x: number; y: number; vx: number; vy: number }
}

interface WavesProps {
  className?: string
  strokeColor?: string
  backgroundColor?: string
}

export function Waves({
  className = "",
  strokeColor = "#ffffff",
  backgroundColor = "#000000",
}: WavesProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -10, y: 0, lx: 0, ly: 0, sx: 0, sy: 0, v: 0, vs: 0, a: 0, set: false })
  const linesRef = useRef<Point[][]>([])
  const noiseRef = useRef<((x: number, y: number) => number) | null>(null)
  const rafRef = useRef<number | null>(null)
  const sizeRef = useRef({ width: 0, height: 0 })
  const boundingRef = useRef<DOMRect | null>(null)

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return

    noiseRef.current = createNoise2D()
    setSize()
    setLines()

    window.addEventListener('resize', onResize)
    window.addEventListener('mousemove', onMouseMove)
    containerRef.current.addEventListener('touchmove', onTouchMove, { passive: false })
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMouseMove)
      containerRef.current?.removeEventListener('touchmove', onTouchMove)
    }
  }, [])

  const setSize = () => {
    if (!containerRef.current || !canvasRef.current) return
    boundingRef.current = containerRef.current.getBoundingClientRect()
    const { width, height } = boundingRef.current
    const dpr = Math.min(window.devicePixelRatio || 1, 2) // cap at 2x for perf
    canvasRef.current.width = width * dpr
    canvasRef.current.height = height * dpr
    canvasRef.current.style.width = `${width}px`
    canvasRef.current.style.height = `${height}px`
    const ctx = canvasRef.current.getContext('2d')
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    sizeRef.current = { width, height }
  }

  const setLines = () => {
    const { width, height } = sizeRef.current
    linesRef.current = []

    // xGap=16 → ~half the lines vs SVG version, still looks great
    const xGap = 16
    const yGap = 8
    const totalLines = Math.ceil((width + 200) / xGap)
    const totalPoints = Math.ceil((height + 30) / yGap)
    const xStart = (width - xGap * totalLines) / 2
    const yStart = (height - yGap * totalPoints) / 2

    for (let i = 0; i < totalLines; i++) {
      const points: Point[] = []
      for (let j = 0; j < totalPoints; j++) {
        points.push({
          x: xStart + xGap * i,
          y: yStart + yGap * j,
          wave: { x: 0, y: 0 },
          cursor: { x: 0, y: 0, vx: 0, vy: 0 },
        })
      }
      linesRef.current.push(points)
    }
  }

  const onResize = () => { setSize(); setLines() }

  const onMouseMove = (e: MouseEvent) => updateMouse(e.pageX, e.pageY)
  const onTouchMove = (e: TouchEvent) => {
    e.preventDefault()
    updateMouse(e.touches[0].clientX, e.touches[0].clientY)
  }

  const updateMouse = (x: number, y: number) => {
    if (!boundingRef.current) return
    const m = mouseRef.current
    m.x = x - boundingRef.current.left
    m.y = y - boundingRef.current.top + window.scrollY
    if (!m.set) {
      m.sx = m.x; m.sy = m.y
      m.lx = m.x; m.ly = m.y
      m.set = true
    }
  }

  const movePoints = (time: number) => {
    const m = mouseRef.current
    const noise = noiseRef.current
    if (!noise) return

    for (const points of linesRef.current) {
      for (const p of points) {
        const n = noise((p.x + time * 0.008) * 0.003, (p.y + time * 0.003) * 0.002) * 8
        p.wave.x = Math.cos(n) * 12
        p.wave.y = Math.sin(n) * 6

        const dx = p.x - m.sx
        const dy = p.y - m.sy
        const d = Math.hypot(dx, dy)
        const l = Math.max(175, m.vs)

        if (d < l) {
          const f = Math.cos(d * 0.001) * (1 - d / l)
          p.cursor.vx += Math.cos(m.a) * f * l * m.vs * 0.00035
          p.cursor.vy += Math.sin(m.a) * f * l * m.vs * 0.00035
        }

        p.cursor.vx += (0 - p.cursor.x) * 0.01
        p.cursor.vy += (0 - p.cursor.y) * 0.01
        p.cursor.vx *= 0.95
        p.cursor.vy *= 0.95
        p.cursor.x = Math.min(50, Math.max(-50, p.cursor.x + p.cursor.vx))
        p.cursor.y = Math.min(50, Math.max(-50, p.cursor.y + p.cursor.vy))
      }
    }
  }

  const draw = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const { width, height } = sizeRef.current

    // Single clear + single strokeStyle set per frame
    ctx.clearRect(0, 0, width, height)
    ctx.strokeStyle = strokeColor
    ctx.lineWidth = 1

    for (const points of linesRef.current) {
      if (points.length < 2) continue
      ctx.beginPath()
      const p0 = points[0]
      ctx.moveTo(p0.x + p0.wave.x, p0.y + p0.wave.y)
      for (let i = 1; i < points.length; i++) {
        const p = points[i]
        ctx.lineTo(p.x + p.wave.x + p.cursor.x, p.y + p.wave.y + p.cursor.y)
      }
      ctx.stroke()
    }
  }

  const tick = (time: number) => {
    const m = mouseRef.current
    m.sx += (m.x - m.sx) * 0.1
    m.sy += (m.y - m.sy) * 0.1

    const dx = m.x - m.lx
    const dy = m.y - m.ly
    const d = Math.hypot(dx, dy)
    m.vs += (d - m.vs) * 0.1
    m.vs = Math.min(100, m.vs)
    m.lx = m.x; m.ly = m.y
    m.a = Math.atan2(dy, dx)

    movePoints(time)
    draw()
    rafRef.current = requestAnimationFrame(tick)
  }

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden ${className}`}
      style={{ backgroundColor }}
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  )
}
