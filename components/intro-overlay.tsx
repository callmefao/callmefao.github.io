"use client"
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { personalInfo } from '@/lib/portfolio-data'
import { AnimatePresence, motion } from 'motion/react'

// Config tuned for a consistent total duration ~3.5s (3–4s target)
// We derive charDelay dynamically so typing phase + pauses + hold + fade ≈ TARGET_TOTAL
const TARGET_TOTAL = 3900 // total ~3.9s (typing + hold + fade)
const INTRO = {
    linePause: 80,
    holdAfter: 1000,
    exitFade: 600,
}
const PARTICLE_COUNT = 26
interface ParticleMeta { id: number; x: number; y: number; size: number; delay: number; duration: number }

export function IntroOverlay() {
    const lines = useMemo(() => {
        const role = personalInfo.title.replace(/\s*\/\s*/g, ' · ')
        return [
            'Welcome to my portfolio website',
            'Hello 👋',
            `I\'m ${personalInfo.name}`,
            role,
        ]
    }, [])
    const Cursor = () => <span className="ml-1 inline-block h-5 w-[2px] animate-pulse rounded-sm bg-sky-300 align-middle" />

    const [typed, setTyped] = useState<string[]>(() => Array(lines.length).fill(''))
    const [lineIndex, setLineIndex] = useState(0)
    const [charIndex, setCharIndex] = useState(0)
    const [exiting, setExiting] = useState(false)
    const [show, setShow] = useState(true)
    const [mounted, setMounted] = useState(false)
    const [charDelay, setCharDelay] = useState(40)
    const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 })
    const startedExit = useRef(false)

    useEffect(() => {
        setMounted(true)
        // Remove server-rendered blocking overlay (if present) as soon as the client overlay mounts
        try {
            const init = document.getElementById('initial-overlay')
            if (init && init.parentNode) init.parentNode.removeChild(init)
        } catch (e) {
            /* ignore in non-browser or if element missing */
        }
        const totalChars = lines.reduce((a, l) => a + l.length, 0)
        const pauses = INTRO.linePause * (lines.length - 1)
        const fixed = INTRO.holdAfter + INTRO.exitFade + pauses
        const typingBudget = Math.max(400, TARGET_TOTAL - fixed)
        setCharDelay(Math.max(15, Math.floor(typingBudget / totalChars)))
        const failsafe = setTimeout(() => setShow(false), TARGET_TOTAL + 2000)
        return () => clearTimeout(failsafe)
    }, [lines])

    useEffect(() => {
        const handler = (e: MouseEvent) => setMouse({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight })
        window.addEventListener('mousemove', handler)
        return () => window.removeEventListener('mousemove', handler)
    }, [])

    useEffect(() => {
        if (!mounted || exiting) return
        if (lineIndex >= lines.length) {
            if (!startedExit.current) {
                startedExit.current = true
                const exitTimer = setTimeout(() => setExiting(true), INTRO.holdAfter)
                const removeTimer = setTimeout(() => setShow(false), INTRO.holdAfter + INTRO.exitFade)
                return () => { clearTimeout(exitTimer); clearTimeout(removeTimer) }
            }
            return
        }
        if (charIndex < lines[lineIndex].length) {
            const t = setTimeout(() => {
                setTyped(prev => {
                    const next = [...prev]
                    next[lineIndex] += lines[lineIndex][charIndex]
                    return next
                })
                setCharIndex(c => c + 1)
            }, charDelay)
            return () => clearTimeout(t)
        }
        const pause = setTimeout(() => { setLineIndex(i => i + 1); setCharIndex(0) }, INTRO.linePause)
        return () => clearTimeout(pause)
    }, [mounted, exiting, lineIndex, charIndex, lines, charDelay])

    const particles = useMemo<ParticleMeta[]>(() => {
        if (!mounted) return []
        let s = 42
        const rand = () => { s = (s * 1664525 + 1013904223) % 4294967296; return s / 4294967296 }
        return Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
            id: i,
            x: rand() * 100,
            y: rand() * 100,
            size: 4 + rand() * 14,
            delay: rand() * 2,
            duration: 5 + rand() * 7,
        }))
    }, [mounted])
    // Estimate total duration for progress bar (charDelay * totalChars + pauses + hold + fade)
    const totalChars = lines.reduce((a, l) => a + l.length, 0)
    const estimatedTyping = totalChars * charDelay + INTRO.linePause * (lines.length - 1)
    const totalDuration = estimatedTyping + INTRO.holdAfter + INTRO.exitFade

    const skip = () => {
        if (exiting) return
        setExiting(true)
        setTimeout(() => setShow(false), INTRO.exitFade - 200)
    }
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => { if (['Escape', 'Enter', ' '].includes(e.key) || e.key.toLowerCase() === 's') skip() }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [])

    if (!mounted || !show) return null

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 1 }}
                    animate={{ opacity: exiting ? 0 : 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                    aria-label="Intro overlay"
                    aria-hidden={exiting}
                    className={
                        'fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#0f172a] via-slate-900 to-[#0d1524] text-slate-100 selection:bg-indigo-500/40 ' +
                        (exiting ? 'pointer-events-none' : '')
                    }
                >
                    <style>{`@keyframes shine {0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}`}</style>
                    <div className="absolute inset-0 opacity-[0.15] [background:radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0,transparent_60%),repeating-linear-gradient(0deg,transparent_0,transparent_23px,rgba(255,255,255,0.04)_24px),repeating-linear-gradient(90deg,transparent_0,transparent_23px,rgba(255,255,255,0.04)_24px)]" />
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(99,102,241,0.13),transparent_65%)]" />
                    <div className="pointer-events-none absolute inset-0 mix-blend-soft-light opacity-[0.08] [background-image:repeating-conic-gradient(from_0deg,rgba(255,255,255,0.09)_0deg,rgba(255,255,255,0)_10deg)] animate-[spin_22s_linear_infinite]" />
                    <div className="pointer-events-none absolute inset-0 opacity-[0.10] [background:radial-gradient(circle_at_30%_70%,rgba(56,189,248,0.25),transparent_60%),radial-gradient(circle_at_75%_25%,rgba(16,185,129,0.22),transparent_55%)]" />
                    {!exiting && (
                        <button
                            onClick={skip}
                            className="absolute top-5 right-5 rounded-full border border-slate-600/40 bg-slate-800/50 px-4 py-1 text-xs font-medium tracking-wide text-slate-300 backdrop-blur-sm transition hover:border-slate-400/60 hover:text-white hover:bg-slate-700/60 active:scale-95"
                        >
                            Skip
                        </button>
                    )}
                    <div className="absolute inset-0 pointer-events-none">
                        {particles.map(p => (
                            <motion.span key={p.id} className={"absolute rounded-full backdrop-blur-[1px] mix-blend-screen " + (p.size > 12 ? 'bg-emerald-400/25' : p.size < 7 ? 'bg-indigo-400/30' : 'bg-sky-400/25')} style={{ width: p.size, height: p.size, left: `${p.x}%`, top: `${p.y}%` }} initial={{ opacity: 0, scale: 0.4 }} animate={{ opacity: [0, 1, 0], scale: [0.4, 1, 0.4], y: [0, -40, 0], x: [0, 10 * Math.sin(p.id), 0] }} transition={{ repeat: Infinity, repeatType: 'loop', duration: p.duration, delay: p.delay, ease: 'easeInOut' }} />
                        ))}
                    </div>
                    <motion.div className="relative flex flex-col items-center gap-5 px-6 text-center will-change-transform" initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1, rotateX: (mouse.y - 0.5) * 8, rotateY: -(mouse.x - 0.5) * 12 }} transition={{ duration: 0.8, ease: 'easeOut' }}>
                        <motion.div className="relative h-28 w-28 overflow-hidden rounded-full ring-2 ring-indigo-500/40 shadow-lg shadow-indigo-500/20" initial={{ scale: 0.6, rotate: -10, opacity: 0 }} animate={{ scale: 1, rotate: 0, opacity: 1 }} transition={{ type: 'spring', stiffness: 160, damping: 18 }}>
                            <img src={personalInfo.avatar} alt={personalInfo.name + ' avatar'} className="h-full w-full object-cover" loading="eager" />
                            <motion.span aria-hidden className="pointer-events-none absolute inset-0 rounded-full border border-transparent [mask:linear-gradient(#fff,#fff)_content-box,linear-gradient(#fff,#fff)] [mask-composite:exclude] p-[2px]" style={{ background: 'conic-gradient(from 0deg,var(--tw-gradient-stops))' }} initial={{ rotate: 0 }} animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 6, ease: 'linear' }} />
                        </motion.div>
                        <div className="flex flex-col gap-2">
                            {typed.map((t, i) => {
                                const cls = i === 0 ? 'text-2xl sm:text-3xl font-semibold tracking-tight text-slate-200' : i === 1 ? 'text-3xl font-bold tracking-tight sm:text-4xl bg-gradient-to-r from-indigo-400 via-sky-400 to-emerald-400 bg-clip-text text-transparent [background-size:200%_auto] animate-[shine_4s_ease_infinite]' : i === 2 ? 'text-lg sm:text-xl font-medium' : 'text-sm sm:text-base text-slate-300'
                                return <motion.p key={i} className={cls} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>{t}{i === lineIndex && !exiting && <Cursor />}</motion.p>
                            })}
                            <motion.p className="text-xs tracking-wide text-slate-400/80" initial={{ opacity: 0, y: 6 }} animate={{ opacity: lineIndex >= 2 ? 1 : 0, y: lineIndex >= 2 ? 0 : 6 }} transition={{ duration: 0.6, delay: 0.1 }}>Crafting intelligent & immersive web experiences</motion.p>
                            {/* Removed quick mode for consistent timing */}
                        </div>
                        <motion.div className="mt-4 text-[10px] uppercase tracking-[0.3em] text-slate-400/80" initial={{ opacity: 0, y: 10 }} animate={{ opacity: lineIndex >= lines.length - 1 ? 1 : 0, y: lineIndex >= lines.length - 1 ? 0 : 10 }} transition={{ duration: 0.6 }}>Entering portfolio...</motion.div>
                        <div className="mt-6 h-1 w-56 overflow-hidden rounded-full bg-slate-600/30">
                            <motion.div className="h-full w-full bg-gradient-to-r from-indigo-500 via-sky-400 to-emerald-400" initial={{ x: '-100%' }} animate={{ x: exiting ? 0 : '0%' }} style={{ transformOrigin: 'left' }} transition={{ duration: totalDuration / 1000, ease: 'linear' }} />
                        </div>
                    </motion.div>
                    <motion.div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-indigo-600/25 blur-3xl" initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.2, ease: 'easeOut' }} />
                    <motion.div className="pointer-events-none absolute bottom-[-80px] right-[-60px] h-96 w-96 rounded-full bg-emerald-600/15 blur-[110px]" initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }} />
                    <motion.div className="pointer-events-none absolute inset-0" initial={{ rotate: 0 }} animate={{ rotate: 360, scale: 1 + (mouse.x - 0.5) * 0.05 }} transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}>
                        <div className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-indigo-400/10" />
                    </motion.div>
                    <motion.div className="pointer-events-none absolute inset-0 [mask:radial-gradient(circle_at_center,white,transparent_70%)]" initial={{ rotate: 0 }} animate={{ rotate: 360 }} transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}>
                        <div className="absolute inset-0 bg-conic-gradient from-indigo-500/15 via-transparent to-emerald-500/10" />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
// Default export for compatibility with default import pattern
export default IntroOverlay
