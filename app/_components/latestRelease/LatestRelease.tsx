"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Pause, Play, SkipBack, SkipForward } from "lucide-react";
import { TRACKS } from "@/data/data";



export default function LatestRelease() {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [isPlaying,    setIsPlaying]    = useState(false);
  const [progress,     setProgress]     = useState(0);
  const [currentTime,  setCurrentTime]  = useState("0:00");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isFirstMount = useRef(true);

  // Init audio
  useEffect(() => {
    const audio = new Audio();
    audio.preload = "metadata";
    audioRef.current = audio;

    const onTimeUpdate = () => {
      if (!audio.duration) return;
      setProgress((audio.currentTime / audio.duration) * 100);
      const m = Math.floor(audio.currentTime / 60);
      const s = Math.floor(audio.currentTime % 60).toString().padStart(2, "0");
      setCurrentTime(`${m}:${s}`);
    };

    const onEnded = () => {
      setCurrentIndex((prev) =>
        prev !== null ? (prev + 1) % TRACKS.length : null
      );
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  // Change de piste
  useEffect(() => {
    if (isFirstMount.current) { isFirstMount.current = false; return; }
    const audio = audioRef.current;
    if (!audio || currentIndex === null) return;
    audio.pause();
    setProgress(0);
    setCurrentTime("0:00");
    audio.src = TRACKS[currentIndex].url;
    audio.load();
    if (isPlaying) audio.play().catch(() => setIsPlaying(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  // Play/pause
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying && currentIndex !== null) {
      audio.play().catch(() => setIsPlaying(false));
    } else {
      audio.pause();
    }
  }, [isPlaying, currentIndex]);

  const selectTrack = (index: number) => {
    if (index === currentIndex) {
      setIsPlaying((p) => !p);
    } else {
      setCurrentIndex(index);
      setIsPlaying(true);
      const audio = audioRef.current;
      if (audio) {
        audio.pause();
        setProgress(0);
        setCurrentTime("0:00");
        audio.src = TRACKS[index].url;
        audio.load();
        audio.play().catch(() => setIsPlaying(false));
      }
    }
  
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    audio.currentTime = ((e.clientX - rect.left) / rect.width) * audio.duration;
  };

  const currentTrack = currentIndex !== null ? TRACKS[currentIndex] : null;

  return (
    <section  className="py-6  md:py-24 px-4 md:px-12 bg-white overflow-hidden">
      <div className=" md:px-8  container mx-auto">

        {/* Header */}
        <div className="mb-16">
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-red-600 block mb-3">
            Nouvel Album
          </span>
          <div className="flex items-end justify-between border-b-2 border-black pb-6">
            <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-none">
              Lager de l&apos;ailleurs
            </h2>
            <span className="text-xs text-gray-400 uppercase tracking-widest hidden md:block pb-1">
              Out now · 2025
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 lg:gap-20 items-center">

          {/* ── GAUCHE : Pochette + Vinyle ─────────────────────── */}
          <div className="hidden   reveal md:flex flex-col items-center">

            {/* Vinyl + Cover */}
            <div className="relative w-72 h-72 md:w-96 md:h-96 mx-auto">

              {/* Vinyle qui sort par la droite */}
              <div
                className={`absolute top-1/2 -translate-y-1/2 left-1/8 w-72 h-72 md:w-96 md:h-96 bg-[#191a1c] rounded-full shadow-2xl transition-transform duration-700 ${
                  isPlaying ? 'translate-x-[1%]' : 'translate-x-0'
                }`}
                style={{ animation: isPlaying ? 'vinylSpin 3s linear infinite' : 'none' }}>
                <style>{`
                  @keyframes vinylSpin {
                    from { transform: translateY(-0%) translateX(${isPlaying ? '40%' : '0'}) rotate(0deg); }
                    to   { transform: translateY(0%) translateX(${isPlaying ? '40%' : '0'}) rotate(360deg); }
                  }
                `}</style>
                {/* Sillons */}
                {[2,6,10,14,18,22].map((i) => (
                  <div key={i} className={`absolute rounded-full border border-white/5`}
                    style={{ inset: `${i * 4}px` }} />
                ))}
                {/* Label centre */}
                <div className="absolute inset-[35%] bg-red-600 rounded-full border-4 border-black flex items-center justify-center">
                  <span className="text-white font-black text-[8px] uppercase tracking-tight text-center leading-none">
                    Les Refugiés
                  </span>
                </div>
              </div>

              {/* Pochette */}
              <div className="relative z-10 w-72 h-72 md:w-96 md:h-96 shadow-2xl overflow-hidden">
                <div className="relative w-full h-full">
                  <Image
                  fill
                  src="/images/members/studio.png"
                  alt="Les Refugiés — Lager de l'ailleurs"
                  className=" object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                </div>
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-white font-black text-2xl leading-none uppercase">Les Refugiés</h3>
                  <p className="text-white/70 text-xs italic mt-1">Lager de l&apos;ailleurs</p>
                </div>

                {/* Bouton play central sur la cover */}
                <button
                  onClick={() => {
                    if (currentIndex === null) selectTrack(0);
                    else setIsPlaying((p) => !p);
                  }}
                  className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/30 transition-all group cursor-pointer">
                  <div className="w-14 h-14 bg-white/10 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    {isPlaying
                      ? <Pause size={20} className="text-white" />
                      : <Play  size={20} className="text-white ml-1" />}
                  </div>
                </button>
              </div>
            </div>

            {/* Plateformes */}
            <div className="flex flex-wrap gap-3 mt-10 justify-center">
              {[
                { name: 'Apple Music',  bg: 'bg-black' },
                { name: 'Amazon Music', bg: 'bg-[#00A8E0]' },
                { name: 'Deezer',       bg: 'bg-[#A238FF]' },
                { name: 'Spotify',      bg: 'bg-[#1DB954]' },
              ].map((p) => (
                <button key={p.name} className={`${p.bg} text-white px-4 py-2 text-[10px] font-black uppercase tracking-widest hover:opacity-80 transition-opacity cursor-pointer`}>
                  {p.name}
                </button>
              ))}
            </div>
          </div>

          {/* ── DROITE : Tracklist + mini player ───────────────── */}
          <div>
            {/* Mini player actif */}
            <div className={`mb-6 overflow-hidden transition-all duration-500 ${currentTrack ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'}`}>
              {currentTrack && (
                <div className="bg-black text-white p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-[9px] uppercase tracking-[0.4em] text-red-500 mb-0.5">
                        {isPlaying ? '▶ En lecture' : '⏸ En pause'}
                      </p>
                      <p className="text-sm font-black uppercase tracking-tight">{currentTrack.title}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button onClick={() => setCurrentIndex((i) => i !== null ? (i - 1 + TRACKS.length) % TRACKS.length : 0)} className="hover:text-red-500 transition-colors cursor-pointer">
                        <SkipBack size={16} />
                      </button>
                      <button onClick={() => setIsPlaying((p) => !p)} className="w-9 h-9 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center cursor-pointer">
                        {isPlaying ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}
                      </button>
                      <button onClick={() => setCurrentIndex((i) => i !== null ? (i + 1) % TRACKS.length : 0)} className="hover:text-red-500 transition-colors cursor-pointer">
                        <SkipForward size={16} />
                      </button>
                    </div>
                  </div>
                  {/* Barre progression */}
                  <div className="flex items-center gap-3">
                    <span className="text-[9px] text-gray-400 w-7 tabular-nums">{currentTime}</span>
                    <div className="flex-1 h-0.5 bg-white/20 cursor-pointer group" onClick={handleSeek}>
                      <div className="h-full bg-red-600 group-hover:bg-red-500 transition-colors" style={{ width: `${progress}%` }} />
                    </div>
                    <span className="text-[9px] text-gray-400 w-7 tabular-nums text-right">{currentTrack.duration}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Tracklist */}
            <ul className="divide-y divide-black/8">
              {TRACKS.map((track, i) => {
                const isActive  = currentIndex === i;
                const isThisPlaying = isActive && isPlaying;
                return (
                  <li key={track.id}>
                    <button
                      onClick={() => selectTrack(i)}
                      className={`w-full flex items-center gap-4 px-4 py-4 transition-all group cursor-pointer text-left ${
                        isActive ? 'bg-red-600 text-white' : 'hover:bg-black/4'
                      }`}>

                      {/* Numéro / icône */}
                      <div className={`w-8 h-8 shrink-0 flex items-center justify-center border transition-colors ${
                        isActive
                          ? 'border-white/30 bg-black/80 text-white'
                          : 'border-black/15 text-gray-400 group-hover:border-black/30'
                      }`}>
                        {isThisPlaying ? (
                          /* Bars animées */
                          <span className=" flex items-end gap-px h-4">
                            {[0, 1, 2].map((b) => (
                              <span
                                key={b}
                                className="w-0.5 bg-white animate-bounce"
                                style={{ height: `${[60, 100, 75][b]}%`, animationDelay: `${b * 0.15}s` }}
                              />
                            ))}
                          </span>
                        ) : (
                          <span className={`text-xs font-black tabular-nums ${isActive ? 'opacity-0 group-hover:opacity-100' : ''}`}>
                            {isActive
                              ? <Play size={12} className="text-white" />
                              : String(i + 1).padStart(2, '0')}
                          </span>
                        )}
                        {isActive && !isThisPlaying && (
                          <Pause size={12} className="text-white absolute" />
                        )}
                      </div>

                      {/* Titre */}
                      <span className={`flex-1 text-sm font-bold uppercase tracking-wide ${
                        isActive ? 'text-white' : 'text-black group-hover:text-black'
                      }`}>
                        {track.title}
                      </span>

                      {/* Durée */}
                      <span className={`text-xs tabular-nums font-bold ${
                        isActive ? 'text-white/70' : 'text-gray-400'
                      }`}>
                        {track.duration}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* Compteur */}
            <p className="mt-4 px-4 text-[10px] text-gray-400 uppercase tracking-widest">
              {TRACKS.length} titres · Album complet disponible sur toutes les plateformes
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}