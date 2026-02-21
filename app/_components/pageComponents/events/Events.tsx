"use client";

import React, { useState } from 'react';
import { MapPin, Clock, Ticket, ChevronRight, CalendarDays } from 'lucide-react';
import { events } from '@/data/data';






const TYPE_LABELS: Record<Event['type'], string> = {
  concert: 'Concert',
  festival: 'Festival',
  prive: 'Privé',
};

const FILTERS = ['Tous', 'Concert', 'Festival', 'Privé'] as const;
type Filter = typeof FILTERS[number];

const Events: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<Filter>('Tous');
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const filtered = events.filter((e) => {
    if (activeFilter === 'Tous') return true;
    return TYPE_LABELS[e.type] === activeFilter;
  });

  return (
    <section id='events' className="scroll-mt-16  md:scroll-mt-16 py-8  md:py-16 bg-white text-black px-4 md:px-12 overflow-hidden">
      {/* Header */}
      <div className="container md:px-8 mx-auto mb-16">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b-4 border-black pb-8">
          <div className="">
            <div className="flex items-center gap-3 mb-3">
              <CalendarDays size={14} className="text-red-600" />
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-red-600">
                Agenda 2025
              </span>
            </div>
            <h2 className="text-4xl md:text-8xl font-black uppercase tracking-tighter leading-none">
              Dates &<br />Concerts
            </h2>
          </div>

          {/* Filtres */}
          <div className="flex items-center gap-1 flex-wrap">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-4 py-2 text-[10px] font-black uppercase tracking-[0.3em] transition-all cursor-pointer border ${
                  activeFilter === f
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-black border-black/20 hover:border-black'
                }`}>
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Liste événements */}
      <div className=" md:px-8 container mx-auto">
        {filtered.length === 0 && (
          <p className="text-center text-gray-400 uppercase tracking-widest text-sm py-20">
            Aucun événement dans cette catégorie.
          </p>
        )}

        <ul className="divide-y divide-black/10">
          {filtered.map((event) => {
            const isHovered = hoveredId === event.id;

            return (
              <li
                key={event.id}
                onMouseEnter={() => setHoveredId(event.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`relative group transition-all duration-300 ${
                  event.featured ? 'bg-black/2' : ''
                } ${isHovered ? 'bg-red-600' : ''}`}>

                {/* Ligne featured */}
                {event.featured && !isHovered && (
                  <div className="absolute left-0 top-0 h-full w-1 bg-red-600" />
                )}

                <a
                  href={event.soldOut ? undefined : event.ticketUrl}
                  className={`flex flex-col md:flex-row md:items-center gap-4 md:gap-0 px-6 py-6 md:py-5 ${
                    event.soldOut ? 'cursor-not-allowed' : 'cursor-pointer'
                  }`}>

                  {/* DATE */}
                  <div className="md:w-32 shrink-0 flex md:flex-col items-center md:items-start gap-3 md:gap-0">
                    <span
                      className={`text-5xl md:text-6xl font-black leading-none tabular-nums transition-colors ${
                        isHovered ? 'text-white' : 'text-black'
                      }`}>
                      {event.day}
                    </span>
                    <div className="flex md:flex-col gap-1 md:gap-0">
                      <span
                        className={`text-xs font-black uppercase tracking-widest transition-colors ${
                          isHovered ? 'text-white/80' : 'text-red-600'
                        }`}>
                        {event.month}
                      </span>
                      <span
                        className={`text-xs font-bold transition-colors ${
                          isHovered ? 'text-white/60' : 'text-gray-400'
                        }`}>
                        {event.year}
                      </span>
                    </div>
                  </div>

                  {/* INFOS PRINCIPALES */}
                  <div className="grow md:px-8">
                    <div className="flex items-center gap-3 mb-1">
                      <span
                        className={`text-[9px] font-black uppercase tracking-[0.4em] px-2 py-0.5 border transition-colors ${
                          isHovered
                            ? 'border-white/20 bg-black text-white/80'
                            : event.type === 'festival'
                            ? 'border-orange-400 text-orange-500'
                            : event.type === 'prive'
                            ? 'border-gray-400 text-gray-500'
                            : 'border-black/20 text-black/50'
                        }`}>
                        {TYPE_LABELS[event.type]}
                      </span>
                      {event.featured && (
                        <span
                          className={`text-[9px] font-black uppercase tracking-[0.3em] transition-colors ${
                            isHovered ? 'text-white/70' : 'text-red-600'
                          }`}>
                          ★ À ne pas manquer
                        </span>
                      )}
                    </div>
                    <h3
                      className={`text-xl md:text-2xl font-black uppercase tracking-tight leading-tight transition-colors ${
                        isHovered ? 'text-white' : 'text-black'
                      }`}>
                      {event.title}
                    </h3>
                    <div
                      className={`flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-xs font-bold transition-colors ${
                        isHovered ? 'text-white/70' : 'text-gray-500'
                      }`}>
                      <span className="flex items-center gap-1.5">
                        <MapPin size={11} />
                        {event.venue} — {event.city}, {event.country}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock size={11} />
                        {event.time}
                      </span>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="md:w-44 shrink-0 flex md:justify-end items-center">
                    {event.soldOut ? (
                      <span
                        className={`text-[10px] font-black uppercase tracking-widest px-5 py-3 border transition-colors ${
                          isHovered
                            ? 'border-white/30 text-white/50'
                            : 'border-black/20 text-black/30'
                        }`}>
                        Complet
                      </span>
                    ) : (
                      <span
                        className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest px-5 py-3 border transition-all ${
                          isHovered
                            ? 'border-white text-white bg-white/10 hover:bg-white hover:text-red-600'
                            : 'border-black text-black hover:bg-black hover:text-white'
                        }`}>
                        <Ticket size={13} />
                        Billets
                        <ChevronRight size={11} />
                      </span>
                    )}
                  </div>
                </a>
              </li>
            );
          })}
        </ul>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-black/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400 uppercase tracking-widest">
            {filtered.length} date{filtered.length > 1 ? 's' : ''} · Mis à jour le {new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
          <a
            href="#contact"
            className="text-[10px] font-black uppercase tracking-[0.4em] text-red-600 hover:underline underline-offset-4 transition-all">
            Demande de booking →
          </a>
        </div>
      </div>
    </section>
  );
};

export default Events;