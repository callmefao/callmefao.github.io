"use client"
import React, { useEffect, useRef } from 'react'

/* Lightweight decorative cursor (tùy chỉnh)
    Tùy chọn nhanh:
    - HIDE_NATIVE: Ẩn con trỏ hệ thống (true để chỉ thấy ring custom)
    - RING_EASE:   Tốc độ đuổi theo (0.2–0.5). Cao hơn = nhanh hơn.
    - TRAIL_POINTS: Số điểm vệt.
*/
const HIDE_NATIVE = true
// Hiện cursor hệ thống tại interactive elements nếu muốn: true = hiện; false = vẫn ẩn
const SHOW_SYSTEM_POINTER_ON_INTERACTIVE = false
const TRAIL_POINTS = 18 // số điểm lưu để tạo vệt (càng nhiều càng nặng)
const RING_EASE = 0.34 // tốc độ đuổi theo (lerp)
function lerp(a: number, b: number, t: number) { return a + (b - a) * t }

export default function MagicCursor() {
    const active = useRef(true)
    const pos = useRef({ x: 0, y: 0 })
    const ring = useRef({ x: 0, y: 0 })
    const ringRef = useRef<HTMLDivElement | null>(null)
    const dotRef = useRef<HTMLDivElement | null>(null)
    const trailRef = useRef<HTMLDivElement | null>(null)
    const points = useRef<{ x: number; y: number; t: number }[]>([])
    const hover = useRef(false)

    useEffect(() => {
        if (typeof window === 'undefined') return
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.matchMedia('(pointer: coarse)').matches) { active.current = false; return }

    // Init data-hover
    if (ringRef.current && !ringRef.current.dataset.hover) ringRef.current.dataset.hover = '0'
    if (dotRef.current && !dotRef.current.dataset.hover) dotRef.current.dataset.hover = '0'

        const isInteractive = (el: Element | null) => !!el && el.closest('a,button,input,textarea,select,[role=button],[role=link],.cursor-pointer')
        const onMove = (e: PointerEvent) => {
            pos.current.x = e.clientX; pos.current.y = e.clientY
            points.current.unshift({ x: e.clientX, y: e.clientY, t: performance.now() }); if (points.current.length > TRAIL_POINTS) points.current.length = TRAIL_POINTS
            const inter = !!isInteractive(e.target as Element | null)
                if (inter !== hover.current) {
                    hover.current = inter
                    if (ringRef.current) ringRef.current.dataset.hover = inter ? '1' : '0'
                    if (dotRef.current) dotRef.current.dataset.hover = inter ? '1' : '0'
                }
            // dot phản hồi tức thì (không lerp) cho cảm giác chính xác
            if (dotRef.current) {
                const scale = hover.current ? 1.85 : 1
                dotRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) scale(${scale})`
                if (hover.current) {
                    dotRef.current.style.boxShadow = '0 0 14px 4px rgba(16,185,129,0.65),0 0 24px 8px rgba(56,189,248,0.35)'
                } else {
                    dotRef.current.style.boxShadow = '0 0 4px 1px rgba(56,189,248,0.55)'
                }
            }
        }
        window.addEventListener('pointermove', onMove, { passive: true })
        const loop = () => {
            if (!active.current) return
            const now = performance.now()
            ring.current.x = lerp(ring.current.x, pos.current.x, RING_EASE)
            ring.current.y = lerp(ring.current.y, pos.current.y, RING_EASE)
            if (ringRef.current) ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px)`
            if (trailRef.current) {
                const children = trailRef.current.children as any as HTMLSpanElement[]
                points.current.forEach((p, i) => {
                    const span = children[i]; if (!span) return
                    const age = now - p.t
                    const life = 560
                    const r = 1 - age / life
                    if (r <= 0) { span.style.opacity = '0'; return }
                    const hue = (195 + i * 8 + age * 0.06) % 360
                        const scale = 0.5 + r * 1.05
                        const alpha = 0.18 + r * 0.65
                        span.style.opacity = alpha.toString()
                        span.style.transform = `translate(${p.x}px,${p.y}px) scale(${scale})`
                        span.style.background = `radial-gradient(circle, hsla(${hue},95%,70%,${0.55 * r}), hsla(${(hue + 50) % 360},90%,60%,${0.25 * r}) 60%, hsla(${(hue + 90) % 360},90%,55%,0) 78%)`
                        span.style.filter = `blur(${(1 - r) * 1.4 + 0.35}px)`
                        span.style.boxShadow = `0 0 ${8 + 14 * r}px ${3 * r}px hsla(${hue},95%,65%,${0.5 * r})`
                })
                points.current = points.current.filter(p => now - p.t < 560)
            }
            requestAnimationFrame(loop)
        }
        requestAnimationFrame(loop)
        return () => window.removeEventListener('pointermove', onMove)
    }, [])

    if (!active.current) return null
    return (
        <div className="pointer-events-none fixed inset-0 z-[90] select-none" aria-hidden>
            {HIDE_NATIVE && (
                <style>{`
                    body{cursor:none}
                    ${SHOW_SYSTEM_POINTER_ON_INTERACTIVE ? `a,button,[role=button],[role=link],.cursor-pointer{cursor:pointer}` : `a,button,[role=button],[role=link],.cursor-pointer{cursor:none}`}
                    input,textarea,select{cursor:${SHOW_SYSTEM_POINTER_ON_INTERACTIVE ? 'text' : 'none'}}
                    input[type=text], textarea{cursor:text}
                `}</style>
            )}
            <div ref={trailRef} className="absolute inset-0">
                {Array.from({ length: TRAIL_POINTS }).map((_, i) => (
                    <span
                        key={i}
                        className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 will-change-transform rounded-full"
                        style={{
                            width: 5 + i * 0.55,
                            height: 5 + i * 0.55,
                            opacity: 0,
                            mixBlendMode: 'screen',
                            background: 'radial-gradient(circle, rgba(125,211,252,0.6), rgba(99,102,241,0.18) 55%, rgba(14,165,233,0.05) 75%)',
                            filter: 'blur(0.6px)'
                        }}
                    />
                ))}
            </div>
            <div
                ref={ringRef}
                className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 h-5 w-5 rounded-full border border-indigo-400/35 bg-indigo-400/10 backdrop-blur-[1px] shadow-[0_0_0_1px_rgba(99,102,241,0.25),0_0_10px_-2px_rgba(56,189,248,0.45)] transition-all duration-200 ease-out z-0"
            />
            <div
                ref={dotRef}
                className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-gradient-to-tr from-sky-300 to-indigo-400 transition-[transform,box-shadow] duration-200 ease-out z-10 will-change-transform data-[hover=1]:from-emerald-300 data-[hover=1]:to-cyan-300"
            />
        </div>
    )
}
