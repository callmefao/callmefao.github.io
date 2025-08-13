"use client"
import { DotGrid } from "@paper-design/shaders-react"

type DotGridShaderProps = React.ComponentProps<typeof DotGrid>

"use client"
import { useEffect, useRef } from "react"

interface ParticleAnimationProps {
  className?: string
  style?: React.CSSProperties
}

export default function DotGridShader({ className, style, ...props }: ParticleAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    let dpi = window.devicePixelRatio || 1
    let W: number, H: number
    let animationId: number

    // Configuration - Slower and smoother
    const cfg = {
      density: 0.00010,      // particle density / pixel (reduced from 0.00012)
      maxDist: 120,          // distance to connect lines (slightly reduced)
      speed: 0.15,           // px/frame (reduced from 0.3)
      mouseInfluence: 0.08,  // mouse attraction force (reduced from 0.12)
      jitter: 0.08           // movement noise (reduced from 0.15)
    }

    const particles: Array<{x: number, y: number, vx: number, vy: number}> = []
    const mouse = { x: null as number | null, y: null as number | null, active: false }

    function resize() {
      if (!canvas || !ctx) return
      const { clientWidth, clientHeight } = canvas
      W = canvas.width  = Math.floor(clientWidth  * dpi)
      H = canvas.height = Math.floor(clientHeight * dpi)
      ctx.setTransform(dpi, 0, 0, dpi, 0, 0)
      initParticles()
    }

    function initParticles() {
      particles.length = 0
      const count = Math.max(40, Math.floor(W * H * cfg.density / (dpi * dpi)))
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * cfg.speed,
          vy: (Math.random() - 0.5) * cfg.speed
        })
      }
    }

    function step() {
      if (!ctx || !canvas) return
      
      ctx.clearRect(0, 0, W, H)

      // Update particles
      for (const p of particles) {
        if (mouse.active && mouse.x !== null && mouse.y !== null) {
          const dx = (mouse.x * dpi) - p.x
          const dy = (mouse.y * dpi) - p.y
          const d2 = dx*dx + dy*dy
          if (d2 > 0) {
            const f = cfg.mouseInfluence / Math.sqrt(d2)
            p.vx += dx * f
            p.vy += dy * f
          }
        }

        p.vx += (Math.random() - 0.5) * cfg.jitter
        p.vy += (Math.random() - 0.5) * cfg.jitter

        p.x += p.vx
        p.y += p.vy

        // Wrap edges
        if (p.x < 0) p.x += W
        else if (p.x > W) p.x -= W
        if (p.y < 0) p.y += H
        else if (p.y > H) p.y -= H
      }

      // Draw links - softer and less distracting
      ctx.lineWidth = 0.8
      ctx.strokeStyle = 'rgba(255,255,255,0.08)'
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j]
          const dx = a.x - b.x, dy = a.y - b.y
          const dist = Math.hypot(dx, dy)
          if (dist < cfg.maxDist * dpi) {
            ctx.globalAlpha = (1 - (dist / (cfg.maxDist * dpi))) * 0.6
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }
      ctx.globalAlpha = 1

      // Draw dots - softer appearance
      ctx.fillStyle = 'rgba(255,255,255,0.6)'
      for (const p of particles) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, 1.5 * dpi, 0, Math.PI * 2)
        ctx.fill()
      }

      animationId = requestAnimationFrame(step)
    }

    // Event handlers
    const handleResize = () => resize()
    const handlePointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
      mouse.active = true
    }
    const handlePointerLeave = () => {
      mouse.active = false
    }

    // Setup events
    window.addEventListener('resize', handleResize)
    canvas.addEventListener('pointermove', handlePointerMove)
    canvas.addEventListener('pointerleave', handlePointerLeave)

    // Respect reduced-motion preference
    const prefersReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    resize()
    if (!prefersReduce) {
      animationId = requestAnimationFrame(step)
    }

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      canvas.removeEventListener('pointermove', handlePointerMove)
      canvas.removeEventListener('pointerleave', handlePointerLeave)
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [])

  return (
    <div 
      className={`relative w-full h-full overflow-hidden ${className || ''}`}
      style={{ 
        background: '#0b0f17',
        ...style 
      }}
      {...props}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
        style={{ display: 'block' }}
      />
    </div>
  )
}
