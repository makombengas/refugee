"use client";

import React, { useState, useRef, useEffect } from 'react';
import { MicVocal, Balloon, CalendarPlus2, Music2, Mic, Mail, ChevronDown, ArrowUpRight } from 'lucide-react';

const BOOKING_TYPES = [
  { id: 'concert',   label: 'Concert / Live',   icon: <MicVocal     size={16} /> },
  { id: 'festival',  label: 'Festival',          icon: <Balloon      size={16} /> },
  { id: 'prive',     label: 'Événement Privé',   icon: <CalendarPlus2 size={16} /> },
  { id: 'collab',    label: 'Collaboration',     icon: <Music2       size={16} /> },
  { id: 'interview', label: 'Interview / Média', icon: <Mic          size={16} /> },
  { id: 'autre',     label: 'Autre',             icon: <Mail         size={16} /> },
];

const WHATSAPP_NUMBER = '4917621847169';

const CONTACT_INFO = [
  { label: 'Booking général',  value: 'booking@lesrefugies.com' },
  { label: 'Presse & Médias',  value: 'presse@lesrefugies.com'  },
 
];

export default function Contact() {
  const [status,      setStatus]      = useState<'idle' | 'sending' | 'success'>('idle');
  const [bookingType, setBookingType] = useState('');
  const [open,        setOpen]        = useState(false);
  const [name,        setName]        = useState('');
  const [email,       setEmail]       = useState('');
  const [message,     setMessage]     = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const selected    = BOOKING_TYPES.find((b) => b.id === bookingType);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingType) { setOpen(true); return; }
    setStatus('sending');
    setTimeout(() => setStatus('success'), 1200);
  };

  const handleWhatsApp = () => {
    const typeLabel = selected?.label || 'Non précisé';
    const text = encodeURIComponent(
      `Bonjour Les Refugiés,\n\nType de demande : ${typeLabel}\nNom : ${name || '—'}\nEmail : ${email || '—'}\n\n${message || ''}`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
  };

  return (
    <section
      id="contact"
      className=" scroll-mt-8  md:scroll-mt-16 relative overflow-hidden bg-[#0e0e0d] text-white">

      {/* Texture noise overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px',
        }}
      />

      {/* Accent rouge en arrière-plan */}
      <div className="pointer-events-none absolute -top-40 -left-40 w-600 h-600 rounded-full bg-[#2E2E2D] blur-[120px]" />

      <div className="relative container mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] min-h-[80vh]">

        {/* ── COLONNE GAUCHE : infos ─────────────────────────────────────── */}
        <div className="flex flex-col justify-between px-8 md:px-8 py-20 border-b lg:border-b-0 lg:border-r border-white/8">

          <div>
            {/* Tag */}
            <div className="flex items-center gap-2 mb-10">
              <span className="w-6 h-px bg-red-600" />
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-red-600">
                Contact & Booking
              </span>
            </div>

            {/* Titre */}
            <h2 className=" text-4xl lg:text-5xl xl:text-6xl 2xl:text-[clamp(3.5rem,8vw,6rem)] font-black uppercase leading-[0.9] tracking-tighter mb-8">
              Travaillons<br />
              <span className="text-red-600">ensemble.</span>
            </h2>

            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Pour toute demande de booking, collaboration ou interview —
              notre équipe vous répond sous <strong className="text-white">48h</strong>.
            </p>
          </div>

          {/* Contacts directs */}
          <div className="mt-16 space-y-6">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-300 mb-6">
              Contacts directs
            </p>
            {CONTACT_INFO.map((c) => (
              <div key={c.label} className="group flex items-start justify-between border-b border-white/6 pb-4">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-gray-300 mb-1">{c.label}</p>
                  <p className="text-sm font-bold text-gray-200 group-hover:text-white transition-colors">
                    {c.value}
                  </p>
                </div>
                <ArrowUpRight size={14} className="text-gray-600 group-hover:text-red-300 transition-colors mt-1 shrink-0" />
              </div>
            ))}

            {/* WhatsApp rapide */}
            {/* <button
              type="button"
              onClick={handleWhatsApp}
              className="cursor-pointer mt-4 w-full flex items-center justify-between px-5 py-4 border border-[#25D366]/30 bg-[#25D366]/5 hover:bg-[#25D366]/15 hover:border-[#25D366] transition-all group">
              <div className="flex items-center gap-3">
                <Phone size={15} className="text-[#25D366]" />
                <span className="text-xs font-black uppercase tracking-widest text-gray-200">
                  WhatsApp direct
                </span>
              </div>
              <ArrowUpRight size={14} className="text-gray-600 group-hover:text-[#25D366] transition-colors" />
            </button> */}
          </div>
        </div>

        {/* ── COLONNE DROITE : formulaire ───────────────────────────────── */}
        <div className="px-8 lg:px-8 xl:px-14 py-20 flex flex-col justify-center">

          {status === 'success' ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-6 py-20">
              <div className="w-16 h-16 border-2 border-red-600 flex items-center justify-center">
                <span className="text-red-600 text-2xl font-black">✓</span>
              </div>
              <h3 className="text-3xl font-black uppercase tracking-tight">Message envoyé.</h3>
              <p className="text-gray-400 text-sm max-w-xs">
                Notre équipe vous répondra dans les 48 heures. Merci de votre intérêt.
              </p>
              <button
                onClick={() => { setStatus('idle'); setName(''); setEmail(''); setMessage(''); setBookingType(''); }}
                className="mt-4 text-[10px] font-black uppercase tracking-widest text-gray-300 hover:text-white transition-colors underline underline-offset-4">
                Envoyer un autre message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">

              <div className="mb-10">
                <h3 className="text-2xl font-black uppercase tracking-tight mb-1">Votre demande</h3>
                <p className="text-xs text-gray-300 uppercase tracking-widest">Tous les champs sont requis</p>
              </div>

              {/* Nom + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Nom */}
                <div className="group relative">
                  <label className="block text-[10px] font-black uppercase tracking-[0.4em] text-gray-300 mb-3">
                    Nom complet
                  </label>
                  <div className="relative">
                    <input
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-white/4 border border-white/10 focus:border-red-600 px-4 py-3.5 text-sm text-white placeholder:text-gray-400 outline-none transition-all"
                      placeholder="Jean Dupont"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="group relative">
                  <label className="block text-[10px] font-black uppercase tracking-[0.4em] text-gray-300 mb-3">
                    Adresse email
                  </label>
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/4 border border-white/10 focus:border-red-600 px-4 py-3.5 text-sm text-white placeholder:text-gray-400 outline-none transition-all"
                    placeholder="jean@exemple.com"
                  />
                </div>
              </div>

              {/* Type de demande */}
              <div ref={dropdownRef} className="relative z-0 ">
                <label className="block text-[10px] font-black uppercase tracking-[0.4em] text-gray-300 mb-3">
                  Type de demande
                </label>
                <button
                  type="button"
                  onClick={() => setOpen(!open)}
                  className={` w-full bg-white/4 border px-4 py-3.5 flex items-center justify-between gap-3 transition-all cursor-pointer text-sm ${
                    open ? 'border-red-600' : 'border-white/10 hover:border-white/25'
                  }`}>
                  <span className={`flex items-center gap-3 ${selected ? 'text-white' : 'text-gray-400'}`}>
                    {selected ? (
                      <>
                        <span className="text-red-300">{selected.icon}</span>
                        {selected.label}
                      </>
                    ) : (
                      'Sélectionner un type…'
                    )}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`text-gray-300 shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
                  />
                </button>

                {open && (
                  <ul className="absolute z-50 top-full left-0 w-full bg-[#161615] border border-white/10 shadow-2xl overflow-hidden mt-1">
                    {BOOKING_TYPES.map((type) => (
                      <li
                        key={type.id}
                        onClick={() => { setBookingType(type.id); setOpen(false); }}
                        className={`flex items-center gap-3 px-5 py-3.5 cursor-pointer transition-colors text-xs font-bold uppercase tracking-widest ${
                          bookingType === type.id
                            ? 'bg-red-600 text-white'
                            : 'text-gray-400 hover:bg-white/5 hover:text-white'
                        }`}>
                        <span className={bookingType === type.id ? 'text-white' : 'text-red-300'}>
                          {type.icon}
                        </span>
                        {type.label}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Message */}
              <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.4em] text-gray-300 mb-3">
                  Message
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-white/4 border border-white/10 focus:border-red-600 px-4 py-3.5 text-sm text-white placeholder:text-gray-400 outline-none resize-none transition-all"
                  placeholder="Décrivez votre demande en quelques lignes…"
                />
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="cursor-pointer flex-1 sm:flex-none flex items-center justify-center gap-3 px-8 py-4 bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white font-black uppercase tracking-[0.3em] text-xs transition-all">
                  {status === 'sending' ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Envoi…
                    </>
                  ) : (
                    <>
                      Envoyer la demande
                      <ArrowUpRight size={14} />
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleWhatsApp}
                  className="cursor-pointer flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-4 border border-[#25D366]/40 bg-[#25D366]/8 hover:bg-[#25D366] hover:border-[#25D366] text-white font-black uppercase tracking-[0.3em] text-xs transition-all">
                  <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                  </svg>
                  WhatsApp
                </button>
              </div>

              <p className="text-[10px] text-gray-400/50 uppercase tracking-widest pt-2">
                Réponse garantie sous 48h · Données confidentielles
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}