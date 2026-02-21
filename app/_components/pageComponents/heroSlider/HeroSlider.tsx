"use client";

import { slides } from '@/data/data';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const SLIDE_DURATION = 6000;

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);
  const [progressKey, setProgressKey] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
      setProgressKey((prev) => prev + 1);
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, []);

  const handleIndicatorClick = (i: number) => {
    setCurrent(i);
    setProgressKey((prev) => prev + 1);
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          
          className={`absolute inset-0 transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] ${
            index === current
              ? 'opacity-100 scale-100 pointer-events-auto'
              : 'opacity-0 scale-110 pointer-events-none'
          }`}
        >
          {/* Fullscreen Background Image avec effet Ken Burns */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(to bottom, rgba(255,255,255,0.2), rgba(0,0,0,0.6)), url('${slide.image}')`,
             
              transform: index === current ? 'scale(1.08)' : 'scale(1)',
              transition: 'transform 8000ms ease-out',
            }}
          ></div>

          {/* Overlay Content */}
          <div className="relative bg-black/50 w-full h-full z-20 flex flex-col justify-center items-center text-center px-4">
            <div
              className={`transition-all duration-1000 delay-500 ${
                index === current ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
              }`}
            >
              <span className="text-red-500 text-xs md:text-lg font-black tracking-[0.8em] uppercase mb-6 block drop-shadow-lg">
                {slide.sub}
              </span>
              <h1
                className="text-4xl md:text-7xl lg:text-[10rem] mb-8 leading-[0.8] font-black uppercase text-white drop-shadow-2xl"
                dangerouslySetInnerHTML={{ __html: slide.title }}
              ></h1>
              <p className="text-xl md:text-2xl text-white/70 font-thin max-w-xl mx-auto mb-12 leading-relaxed drop-shadow-md">
                {slide.desc}
              </p>
              <div className="flex justify-center gap-8 items-center">
                <Link
                  href={slide.link}
                  className="px-10 py-4 bg-white text-black font-black uppercase tracking-[0.3em] text-xs hover:bg-red-600 hover:text-white transition-all"
                >
                  Explorer
                </Link>
                <div className="h-px w-20 bg-white/50 hidden md:block"></div>
                <button className="cursor-pointer text-xs font-black uppercase tracking-[0.4em] text-white hover:text-red-600 transition-colors hidden md:block">
                  Play Trailer
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-white/10 z-30">
        <div
          key={progressKey}
          style={{
            height: '100%',
            backgroundColor: '#9ca3af',
            width: '0%',
            animation: `progressBar ${SLIDE_DURATION}ms linear forwards`,
          }}
        ></div>
      </div>

      {/* Animation keyframe injectée via style tag */}
      <style>{`
        @keyframes progressBar {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>

      {/* Indicators */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex items-center gap-6">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => handleIndicatorClick(i)}
            className="transition-all duration-500 flex flex-col items-center group"
          >
            <span
              className={`text-[10px] font-black mb-2 transition-colors ${
                i === current ? 'text-white' : 'text-white/30'
              }`}
            >
              0{i + 1}
            </span>
            <div
              className={`h-0.5 transition-all duration-500 ${
                i === current ? 'w-16 bg-red-600' : 'w-4 bg-white/20 group-hover:bg-white/50'
              }`}
            ></div>
          </button>
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;