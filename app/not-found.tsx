"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

const NotFound = () => {
  const [glitch, setGlitch] = useState(false)

  useEffect(() => {
    // Glitch effect aléatoire toutes les 3-5 secondes
    const scheduleGlitch = () => {
      const delay = 3000 + Math.random() * 2000
      return setTimeout(() => {
        setGlitch(true)
        setTimeout(() => setGlitch(false), 200)
        scheduleGlitch()
      }, delay)
    }
    const t = scheduleGlitch()
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden flex flex-col justify-center items-center">

      {/* ── Grain overlay ── */}
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-[0.06]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px',
        }}
      />

      {/* ── Lignes horizontales scannées (CRT) ── */}
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-[0.03]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.8) 2px, rgba(255,255,255,0.8) 4px)',
        }}
      />

      {/* ── Halo rouge central ── */}
      <div className="absolute inset-0 z-0 flex justify-center items-center pointer-events-none">
        <div
          className="w-600 h-600 rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, #dc2626 0%, transparent 70%)',
          }}
        />
      </div>

      {/* ── Lignes décoratives verticales ── */}
      <div className="absolute left-8 top-0 bottom-0 w-px bg-white/5 z-0" />
      <div className="absolute right-8 top-0 bottom-0 w-px bg-white/5 z-0" />
      <div className="absolute left-1/4 top-0 bottom-0 w-px bg-white/3 z-0 hidden md:block" />
      <div className="absolute right-1/4 top-0 bottom-0 w-px bg-white/3 z-0 hidden md:block" />

      {/* ── Contenu principal ── */}
      <div className="relative z-20 text-center px-6 transition-all duration-700 opacity-100 translate-y-0">

        {/* Label supérieur */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-px w-12 bg-red-600" />
          <span className="text-red-500 text-[10px] md:text-xs font-black tracking-[0.8em] uppercase">
            Erreur Système
          </span>
          <div className="h-px w-12 bg-red-600" />
        </div>

        {/* 404 géant avec effet glitch */}
        <div className="relative select-none mb-6">
          <h1
            className="text-[20vw] md:text-[18vw] lg:text-[16rem] font-black uppercase leading-none text-white"
            style={{
              WebkitTextStroke: glitch ? '2px #dc2626' : '1px rgba(255,255,255,0.1)',
              textShadow: glitch
                ? '-4px 0 #dc2626, 4px 0 rgba(255,255,255,0.3)'
                : '0 0 80px rgba(220,38,38,0.15)',
              transition: 'text-shadow 0.1s, -webkit-text-stroke 0.1s',
              letterSpacing: '-0.05em',
            }}
          >
            404
          </h1>

          {/* Calque glitch décalé */}
          {glitch && (
            <>
              <h1
                aria-hidden
                className="absolute inset-0 text-[20vw] md:text-[18vw] lg:text-[16rem] font-black uppercase leading-none text-red-600 opacity-70"
                style={{
                  letterSpacing: '-0.05em',
                  transform: 'translate(-6px, 2px)',
                  clipPath: 'inset(30% 0 40% 0)',
                }}
              >
                404
              </h1>
              <h1
                aria-hidden
                className="absolute inset-0 text-[20vw] md:text-[18vw] lg:text-[16rem] font-black uppercase leading-none text-white opacity-40"
                style={{
                  letterSpacing: '-0.05em',
                  transform: 'translate(6px, -2px)',
                  clipPath: 'inset(60% 0 10% 0)',
                }}
              >
                404
              </h1>
            </>
          )}
        </div>

        {/* Titre */}
        <h2
          className="text-xl md:text-3xl lg:text-4xl font-black uppercase text-white tracking-[0.2em] mb-4"
          style={{ animationDelay: '200ms' }}
        >
          Page Introuvable
        </h2>

        {/* Description */}
        <p className="text-white/40 font-thin text-sm md:text-base max-w-md mx-auto mb-12 leading-relaxed tracking-wide">
          La scène que vous cherchez n&apos;existe pas ou a été supprimée du catalogue.
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
          <Link
            href="/"
            className="px-10 py-4 bg-white text-black font-black uppercase tracking-[0.3em] text-xs hover:bg-red-600 hover:text-white transition-all duration-300"
          >
            Retour Accueil
          </Link>
          <div className="h-px w-16 bg-white/20 hidden sm:block" />
          <Link
            href="/catalogue"
            className="text-xs font-black uppercase tracking-[0.4em] text-white/50 hover:text-white transition-colors duration-300"
          >
            Voir le Catalogue
          </Link>
        </div>
      </div>

      {/* ── Barre de progression en bas (comme le slider) ── */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-white/10 z-30">
        <div
          className="h-full bg-red-600"
          style={{ width: '40%', opacity: 0.6 }}
        />
      </div>

      {/* ── Numéro de slide (cohérence visuelle) ── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3">
        <span className="text-[10px] font-black text-white/20 tracking-widest uppercase">
          Not Found
        </span>
        <div className="h-px w-16 bg-white/20" />
        <span className="text-[10px] font-black text-white/20">404</span>
      </div>

      {/* ── Coin supérieur droit ── */}
      <div className="absolute top-6 right-8 z-20 flex items-center gap-3">
        <span className="text-[9px] font-black tracking-[0.4em] uppercase text-white/20">
          System Error
        </span>
        <div className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
      </div>

      {/* ── Coin supérieur gauche ── */}
      <div className="absolute top-6 left-8 z-20">
        <span className="text-[9px] font-black tracking-[0.4em] uppercase text-white/20">
          0x00000000
        </span>
      </div>

      <style>{`
        @keyframes scanline {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
      `}</style>
    </div>
  )
}

export default NotFound