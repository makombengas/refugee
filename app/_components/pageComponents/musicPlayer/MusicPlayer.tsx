"use client";

import { TRACKS } from '@/data/data';
import React, { useState, useEffect, useRef, useCallback } from 'react';





const MusicPlayer: React.FC = () => {
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [showPlaylist, setShowPlaylist] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isFirstMount = useRef(true);

  const currentTrack = TRACKS[trackIndex];

  // Charge une piste dans l'élément audio existant
  const loadTrack = useCallback((index: number, autoPlay: boolean) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    setProgress(0);
    setCurrentTime("0:00");
    audio.src = TRACKS[index].url;
    audio.load();
    if (autoPlay) {
      audio.play().catch(() => setIsPlaying(false));
    } else {
      setIsPlaying(false);
    }
  }, []);

  // Initialise l'audio une seule fois
  useEffect(() => {
    const audio = new Audio(TRACKS[0].url);
    audio.preload = "metadata";
    audioRef.current = audio;

    const onTimeUpdate = () => {
      if (!audio.duration) return;
      setProgress((audio.currentTime / audio.duration) * 100);
      const m = Math.floor(audio.currentTime / 60);
      const s = Math.floor(audio.currentTime % 60).toString().padStart(2, "0");
      setCurrentTime(`${m}:${s}`);
    };

    // Passage auto au morceau suivant à la fin
    const onEnded = () => {
      setTrackIndex((prev) => (prev + 1) % TRACKS.length);
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("ended", onEnded);
    };
   
  }, []);

  // Recharge l'audio quand trackIndex change (sauf au premier rendu)
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    loadTrack(trackIndex, isPlaying);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trackIndex]);

  // Play / Pause
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false));
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  const handlePrev = () => {
    const audio = audioRef.current;
    // Revient au début si > 3s dans le morceau, sinon piste précédente
    if (audio && audio.currentTime > 3) {
      audio.currentTime = 0;
      return;
    }
    setTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
  };

  const handleNext = () => {
    setTrackIndex((prev) => (prev + 1) % TRACKS.length);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    audio.currentTime = ratio * audio.duration;
  };

  const handleSelectTrack = (index: number) => {
    const wasPlaying = isPlaying;
    console.log(wasPlaying)
    setShowPlaylist(false);
    setTrackIndex(index);
    setIsPlaying(true);
    // Charge et joue immédiatement (l'effet sur trackIndex gère le reste)
    setTimeout(() => {
      const audio = audioRef.current;
      if (!audio) return;
      audio.pause();
      setProgress(0);
      setCurrentTime("0:00");
      audio.src = TRACKS[index].url;
      audio.load();
      audio.play().catch(() => setIsPlaying(false));
    }, 0);
  };

  return (
    <div className="z-10 w-full bg-white border-b shadow border-black/10 py-6 px-4 md:px-12 relative">
      <div className=" max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-16">

        {/* Vinyl Disc */}
        <div className="relative shrink-0">
          <div
            className={`w-32 h-32 md:w-40 md:h-40 bg-[#111] rounded-full flex items-center justify-center relative shadow-2xl transition-transform duration-1000 ${
              isPlaying ? 'scale-105' : 'scale-100'
            }`}
            style={{ animation: isPlaying ? 'spin 4s linear infinite' : 'none' }}>
            <style>{`
              @keyframes spin {
                from { transform: rotate(0deg) scale(1.05); }
                to   { transform: rotate(360deg) scale(1.05); }
              }
            `}</style>
            <div className="absolute inset-2  border border-white/5 rounded-full" />
            <div className="absolute inset-6  border border-white/5 rounded-full" />
            <div className="absolute inset-10 border border-white/5 rounded-full" />
            <div className="w-12 h-12 md:w-16 md:h-16 bg-red-600 rounded-full border-4 border-black flex items-center justify-center relative overflow-hidden z-10">
              <span className="text-white font-black text-[8px] uppercase tracking-tighter text-center leading-none select-none">
                Les<br />Refugiés
              </span>
              <div className="absolute w-2 h-2 bg-white rounded-full" />
            </div>
          </div>

          {/* Bras de lecture */}
          <div
            className="absolute top-0 -right-4 origin-top transition-transform duration-700"
            style={{ transform: isPlaying ? 'rotate(25deg)' : 'rotate(0deg)' }}>
            <div className="w-1 h-20 bg-gray-300 relative">
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-6 bg-gray-400" />
            </div>
          </div>
        </div>

        {/* Contrôles */}
        <div className="grow w-full flex flex-col justify-center">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-red-600 block mb-1">
                {isPlaying ? `Piste ${trackIndex + 1} / ${TRACKS.length}` : 'Appuyez pour jouer'}
              </span>
              <h3 className="text-xl md:text-3xl font-black uppercase tracking-tight leading-none">
                {currentTrack.title}
              </h3>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-2">
                {currentTrack.artist} — <span className="text-gray-300">{currentTrack.label}</span>
              </p>
            </div>

            <div className="flex items-center gap-4">
              {/* Prev */}
              <button onClick={handlePrev} className="cursor-pointer hover:text-red-600 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" />
                </svg>
              </button>

              {/* Play / Pause */}
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="cursor-pointer w-14 h-14 bg-black text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-all transform hover:scale-105">
                {isPlaying ? (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>

              {/* Next */}
              <button onClick={handleNext} className="cursor-pointer hover:text-red-600 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 18h2V6h-2zM6 18l8.5-6L6 6z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Barre de progression */}
          <div
            className={`transition-all ease-in-out duration-500 ${
              isPlaying
                ? 'mt-5 relative w-full h-1 bg-gray-300 cursor-pointer group opacity-100'
                : 'opacity-0'
            }`}
            onClick={handleSeek}>
            <div
              className="h-full bg-black transition-none group-hover:bg-red-600"
              style={{ width: `${progress}%` }}
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-black rounded-full opacity-0 group-hover:opacity-100 transition-opacity -translate-x-1/2"
              style={{ left: `${progress}%` }}
            />
            <span className="absolute -top-6 left-0 text-[10px] font-bold text-gray-400">{currentTime}</span>
            <span className="absolute -top-6 right-0 text-[10px] font-bold text-gray-400">{currentTrack.duration}</span>
          </div>

          {/* Bouton playlist */}
          <button
            onClick={() => setShowPlaylist(!showPlaylist)}
            className="mt-6 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest hover:text-red-600 transition-colors self-start cursor-pointer">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z" />
            </svg>
            {showPlaylist ? 'Fermer' : `Playlist · ${TRACKS.length} titres`}
          </button>

          {/* Playlist déroulante */}
          {showPlaylist && (
            <ul className="mt-3 border-t border-black/5 w-full">
              {TRACKS.map((track, i) => (
                <li
                  key={track.id}
                  onClick={() => handleSelectTrack(i)}
                  className={`flex items-center justify-between py-3 px-2 cursor-pointer border-b border-black/5 transition-colors ${
                    i === trackIndex ? 'bg-red-50' : 'hover:bg-gray-50'
                  }`}>
                  <div className="flex items-center gap-3">
                    <span className={`text-[10px] font-black w-4 tabular-nums ${i === trackIndex ? 'text-red-600' : 'text-gray-300'}`}>
                      {i === trackIndex && isPlaying ? '▶' : String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <p className={`text-xs font-black uppercase tracking-tight ${i === trackIndex ? 'text-red-600' : ''}`}>
                        {track.title}
                      </p>
                      <p className="text-[10px] text-gray-400 uppercase tracking-widest">{track.artist}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-gray-400">{track.duration}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Liens streaming */}
        <div className="hidden md:mt-3 lg:flex flex-col gap-4">
          <a href="#" className="flex items-center gap-2 hover:text-green-600 transition-colors">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
            </svg>
            <span className="text-[10px] font-black uppercase tracking-widest">Spotify</span>
          </a>
          <a href="#" className="flex items-center gap-2 hover:text-red-600 transition-colors">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
            </svg>
            <span className="text-[10px] font-black uppercase tracking-widest">YouTube</span>
          </a>
        </div>

      </div>
    </div>
  );
};

export default MusicPlayer;