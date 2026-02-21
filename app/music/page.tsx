"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play, SkipBack, SkipForward, Download, Lock } from "lucide-react";
import { TRACKS } from "@/data/data";
import Image from "next/image";
import Link from "next/link";

interface Track {
  id: number;
  title: string;
  artist: string;
  label: string;
  url: string;
  duration: string;
  price: number;
  paypalMe: string;
}

const PREVIEW_LIMIT = 60; // secondes

/* ─── Modale PayPal ───────────────────────────────────────── */
const PurchaseModal = ({
  track,
  onClose,
}: {
  track: Track;
  onClose: () => void;
}) => {
  const paypalUrl = `https://www.paypal.com/paypalme/${track.paypalMe}/${track.price}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.5)", backdropFilter: "blur(6px)" }}
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-md overflow-hidden"
        style={{ boxShadow: "0 40px 100px rgba(0,0,0,0.25)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-1 bg-red-600 w-full" />
        <div className="px-7 py-7">

          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <span className="text-[9px] font-black uppercase tracking-[0.4em] text-red-600 block mb-1">
                Téléchargement MP3
              </span>
              <h3 className="text-xl font-black uppercase tracking-tight leading-none">
                {track.title}
              </h3>
              <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest">
                {track.artist}
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 border border-black/10 flex items-center justify-center text-gray-400 hover:text-black hover:border-black transition-colors cursor-pointer"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Récap */}
          <div className="border-2 border-black p-4 mb-6 flex items-center justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-wide">{track.title}</p>
              <p className="text-[10px] text-gray-400 mt-0.5 uppercase tracking-widest">
                MP3 · 320 kbps · {track.duration} · Titre complet
              </p>
            </div>
            <p className="text-2xl font-black">
              {track.price.toFixed(2)}<span className="text-base">€</span>
            </p>
          </div>

          {/* Étapes */}
          <div className="space-y-3 mb-6">
            {[
              "Cliquez sur Payer avec PayPal ci-dessous",
              "Complétez le paiement sécurisé sur PayPal",
              "Envoyez-nous votre confirmation pour recevoir le fichier",
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="w-5 h-5 bg-black text-white text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <p className="text-xs text-gray-600 leading-relaxed">{step}</p>
              </div>
            ))}
          </div>

          {/* Bouton PayPal */}
          <Link
            href={paypalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 w-full py-4 bg-[#003087] text-white text-[10px] md:text-xs font-black uppercase tracking-[0.3em]  hover:bg-[#001f5c] transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 opacity-90">
              <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42c-.93 4.778-4.005 7.201-9.138 7.201h-2.19a.563.563 0 0 0-.556.479l-1.187 7.527h3.882c.46 0 .85-.334.922-.788l.816-5.09a.932.932 0 0 1 .923-.788h.58c3.76 0 6.705-1.528 7.565-5.946.36-1.847.174-3.388-.777-4.471a3.35 3.35 0 0 0-.84-.124z" />
            </svg>
            Payer {track.price.toFixed(2)} € avec PayPal
          </Link>

          <p className="text-center text-[10px] text-gray-400 mt-3 uppercase tracking-widest">
            Paiement sécurisé · Aucun compte requis
          </p>
        </div>
      </div>
    </div>
  );
};

/* ════════════════════════════════════════════════════════════
   Page Musiques
════════════════════════════════════════════════════════════ */
export default function MusicPage() {
  const [currentIndex,  setCurrentIndex]  = useState<number | null>(null);
  const [isPlaying,     setIsPlaying]     = useState(false);
  const [progress,      setProgress]      = useState(0);
  const [currentTime,   setCurrentTime]   = useState("0:00");
  const [modalTrack,    setModalTrack]    = useState<Track | null>(null);
  // Set des indices dont la preview a été écoutée jusqu'à la limite
  const [lockedTracks,  setLockedTracks]  = useState<Set<number>>(new Set());

  const audioRef     = useRef<HTMLAudioElement | null>(null);
  const isFirstMount = useRef(true);

  /* ── Init audio ── */
  useEffect(() => {
    const audio = new Audio();
    audio.preload = "metadata";
    audioRef.current = audio;

    const onTimeUpdate = () => {
      if (!audio.duration) return;

      // ✅ Limite preview : stoppe à PREVIEW_LIMIT secondes
      if (audio.currentTime >= PREVIEW_LIMIT) {
        audio.pause();
        setIsPlaying(false);
        // Marque cette piste comme "locked" (preview terminée)
        setCurrentIndex((prev) => {
          if (prev !== null) {
            setLockedTracks((locks) => new Set(locks).add(prev));
            // Ouvre automatiquement la modale d'achat
            setModalTrack(TRACKS[prev] as Track);
          }
          return prev;
        });
        return;
      }

      setProgress((audio.currentTime / audio.duration) * 100);
      const m = Math.floor(audio.currentTime / 60);
      const s = Math.floor(audio.currentTime % 60).toString().padStart(2, "0");
      setCurrentTime(`${m}:${s}`);
    };

    const onEnded = () =>
      setCurrentIndex((prev) =>
        prev !== null ? (prev + 1) % TRACKS.length : null
      );

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("ended",      onEnded);
    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("ended",      onEnded);
    };
  }, []);

  /* ── Changement de piste ── */
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

  /* ── Play / Pause ── */
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying && currentIndex !== null) audio.play().catch(() => setIsPlaying(false));
    else audio.pause();
  }, [isPlaying, currentIndex]);

  const selectTrack = (index: number) => {
    // Si la piste est locked → ouvre directement la modale
    if (lockedTracks.has(index)) {
      setModalTrack(TRACKS[index] as Track);
      return;
    }
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
    const rect  = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    // Empêche de seek au-delà de PREVIEW_LIMIT
    const maxRatio = PREVIEW_LIMIT / audio.duration;
    audio.currentTime = Math.min(ratio, maxRatio) * audio.duration;
  };

  const currentTrack = currentIndex !== null ? TRACKS[currentIndex] : null;
  const isLocked     = currentIndex !== null && lockedTracks.has(currentIndex);

  // Secondes restantes pour la preview en cours
  const previewSecondsLeft = (() => {
    const audio = audioRef.current;
    if (!audio || currentIndex === null) return PREVIEW_LIMIT;
    return Math.max(0, PREVIEW_LIMIT - audio.currentTime);
  })();

  return (
    <section className="py-24 px-4 md:px-12 bg-white overflow-hidden min-h-screen">
      {modalTrack && (
        <PurchaseModal track={modalTrack as Track} onClose={() => setModalTrack(null)} />
      )}

      <div className="container mx-auto md:px-8">

        {/* ── Header ── */}
        <div className="mb-16">
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-red-600 block mb-3">
            Catalogue
          </span>
          <div className="flex items-end justify-between border-b-2 border-black pb-6">
            <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-none">
              Nos Musiques
            </h2>
            <span className="text-xs text-gray-400 uppercase tracking-widest hidden md:block pb-1">
              {TRACKS.length} titres · 2025
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 lg:gap-20 items-start">

          {/* ══ GAUCHE ══ */}
          <div className="hidden md:flex flex-col items-center">

            {/* Vinyle animé + pochette */}
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
            

            {/* Badge preview */}
            <div className="w-full mb-6 flex items-center gap-3 bg-black/4 px-4 py-3">
              <div className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0" />
              <p className="text-[10px] text-gray-600 uppercase tracking-widest font-bold">
                Aperçu gratuit · 1 minute par titre
              </p>
            </div>

            {/* Plateformes */}
            <div className="w-full">
              <p className="text-[9px] font-black uppercase tracking-[0.4em] text-gray-400 mb-3 text-center">Disponible sur</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {[
                  { name: "Spotify",      bg: "bg-[#1DB954]" },
                  { name: "Apple Music",  bg: "bg-black"     },
                  { name: "Deezer",       bg: "bg-[#A238FF]" },
                  { name: "Amazon Music", bg: "bg-[#00A8E0]" },
                ].map((p) => (
                  <button key={p.name} className={`${p.bg} text-white px-4 py-2 text-[9px] font-black uppercase tracking-widest hover:opacity-80 transition-opacity cursor-pointer`}>
                    {p.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8 border-l-2 border-red-600 pl-4 w-full">
              <p className="text-xs font-black uppercase tracking-wide text-black">Téléchargement disponible</p>
              <p className="text-[10px] text-gray-500 mt-1 leading-relaxed">
                Achetez et téléchargez chaque titre en MP3 320 kbps via PayPal. Paiement sécurisé, livraison par email.
              </p>
            </div>
          </div>

          {/* ══ DROITE ══ */}
          <div>

            {/* Mini player */}
            <div className={`mb-6 overflow-hidden transition-all duration-500 ${currentTrack ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
              {currentTrack && (
                <div className="bg-black text-white p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-[9px] uppercase tracking-[0.4em] text-red-500 mb-0.5">
                        {isLocked ? "🔒 Aperçu terminé" : isPlaying ? "▶ En lecture" : "⏸ En pause"}
                      </p>
                      <p className="text-sm font-black uppercase tracking-tight">{currentTrack.title}</p>
                      {/* Compteur preview */}
                      {!isLocked && isPlaying && (
                        <p className="text-[9px] text-white/40 mt-0.5 tabular-nums">
                          Aperçu : {Math.ceil(previewSecondsLeft)}s restantes
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setCurrentIndex((i) => i !== null ? (i - 1 + TRACKS.length) % TRACKS.length : 0)}
                        className="hover:text-red-500 transition-colors cursor-pointer"
                      >
                        <SkipBack size={16} />
                      </button>
                      <button
                        onClick={() => {
                          if (isLocked) { setModalTrack(currentTrack as Track); return; }
                          setIsPlaying((p) => !p);
                        }}
                        className="w-9 h-9 bg-red-600 hover:bg-red-700 flex items-center justify-center cursor-pointer transition-colors"
                      >
                        {isLocked
                          ? <Lock size={13} />
                          : isPlaying
                            ? <Pause size={14} />
                            : <Play  size={14} className="ml-0.5" />}
                      </button>
                      <button
                        onClick={() => setCurrentIndex((i) => i !== null ? (i + 1) % TRACKS.length : 0)}
                        className="hover:text-red-500 transition-colors cursor-pointer"
                      >
                        <SkipForward size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Barre de progression avec zone preview */}
                  <div className="flex items-center gap-3">
                    <span className="text-[9px] text-gray-400 w-7 tabular-nums">{currentTime}</span>
                    <div className="flex-1 relative h-0.5 cursor-pointer group" onClick={handleSeek}>
                      {/* Fond gris */}
                      <div className="absolute inset-0 bg-white/20" />
                      {/* Zone preview disponible (1 min) */}
                      {audioRef.current?.duration && (
                        <div
                          className="absolute top-0 left-0 h-full bg-white/10"
                          style={{ width: `${Math.min(100, (PREVIEW_LIMIT / audioRef.current.duration) * 100)}%` }}
                        />
                      )}
                      {/* Progression actuelle */}
                      <div
                        className="absolute top-0 left-0 h-full bg-red-600 group-hover:bg-red-500 transition-colors"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <span className="text-[9px] text-gray-400 tabular-nums">
                      {isLocked ? "🔒" : `/${currentTrack.duration}`}
                    </span>
                  </div>

                  {/* CTA achat si locked */}
                  {isLocked && (
                    <button
                      onClick={() => setModalTrack(currentTrack as Track)}
                      className="mt-3 w-full py-2 bg-red-600 hover:bg-red-700 text-white text-[9px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      <Download size={11} />
                      Acheter le titre complet — {(currentTrack as Track).price?.toFixed(2) ?? "1.99"} €
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Tracklist */}
            <ul className="divide-y divide-black/8">
              {TRACKS.map((track, i) => {
                const isActive      = currentIndex === i;
                const isThisPlaying = isActive && isPlaying;
                const isTrackLocked = lockedTracks.has(i);

                return (
                  <li key={track.id}>
                    <div className={`w-full flex items-center gap-4 px-4 py-4 transition-all group ${isActive ? "bg-red-600 text-white" : "hover:bg-black/4"}`}>

                      {/* Bouton play/état */}
                      <button
                        onClick={() => selectTrack(i)}
                        className={`w-8 h-8 shrink-0 flex items-center justify-center border transition-colors cursor-pointer relative ${
                          isActive ? "border-white/30 bg-black/80 text-white" : "border-black/15 text-gray-400 group-hover:border-black/30"
                        }`}
                      >
                        {isTrackLocked && !isActive ? (
                          <Lock size={11} className="text-gray-400" />
                        ) : isThisPlaying ? (
                          <span className="flex items-end gap-px h-4">
                            {[0, 1, 2].map((b) => (
                              <span key={b} className="w-0.5 bg-white animate-bounce"
                                style={{ height: `${[60, 100, 75][b]}%`, animationDelay: `${b * 0.15}s` }} />
                            ))}
                          </span>
                        ) : isActive && isTrackLocked ? (
                          <Lock size={12} className="text-white" />
                        ) : isActive ? (
                          <Pause size={12} className="text-white" />
                        ) : (
                          <span className="text-xs font-black tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                        )}
                      </button>

                      {/* Titre + artiste */}
                      <button onClick={() => selectTrack(i)} className="flex-1 text-left cursor-pointer">
                        <span className={`block text-sm font-bold uppercase tracking-wide ${isActive ? "text-white" : "text-black"}`}>
                          {track.title}
                        </span>
                        <span className={`block text-[10px] uppercase tracking-widest mt-0.5 ${isActive ? "text-white/60" : "text-gray-400"}`}>
                          {isTrackLocked ? "Aperçu terminé · Achat requis" : track.artist}
                        </span>
                      </button>

                      {/* Durée ou badge preview */}
                      {isTrackLocked ? (
                        <span className={`text-[9px] font-black uppercase tracking-wide ${isActive ? "text-white/70" : "text-red-500"}`}>
                          1:00 / {track.duration}
                        </span>
                      ) : (
                        <span className={`text-xs tabular-nums font-bold ${isActive ? "text-white/70" : "text-gray-400"}`}>
                          {track.duration}
                        </span>
                      )}

                      {/* Bouton download */}
                      <button
                        onClick={() => setModalTrack(track as Track)}
                        title={`Acheter ${track.title} — ${(track as Track).price?.toFixed(2) ?? "1.99"} €`}
                        className={`w-8 h-8 shrink-0 flex items-center justify-center border transition-all duration-200 cursor-pointer hover:scale-110 active:scale-95 ${
                          isActive
                            ? "border-white/30 text-white hover:bg-white/10"
                            : isTrackLocked
                              ? "border-red-400 text-red-500 hover:border-red-600 hover:text-red-600"
                              : "border-black/15 text-gray-400 hover:border-black hover:text-black"
                        }`}
                      >
                        <Download size={13} />
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>

            {/* Pied */}
            <div className="mt-4 px-4 flex items-center justify-between">
              <p className="text-[10px] text-gray-400 uppercase tracking-widest">{TRACKS.length} titres · Les Refugiés</p>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest">MP3 · 1,99 € / titre</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes vinylSpin {
          from { transform: translateY(-0%) translateX(${isPlaying ? "38%" : "0"}) rotate(0deg); }
          to   { transform: translateY(-0%) translateX(${isPlaying ? "38%" : "0"}) rotate(360deg); }
        }
      `}</style>
    </section>
  );
}