
"use client";

import { newsItems } from '@/data/data';
import Image from 'next/image';
import React from 'react';



const News: React.FC = () => {
  return (
    <section id="nouvelles" className=" py-16 md:py-32 px-0 md:px-12 bg-white">
      <div className="container mx-auto px-4 md:px-7">
        <div className="flex flex-col md:flex-row justify-between md:items-end mb-20 reveal">
          <div>
            <span className="text-xs font-bold tracking-[0.5em] uppercase text-red-600 mb-4 block">Journal de Bord</span>
            <h2 className="text-6xl md:text-8xl leading-none">News.</h2>
          </div>
          <a href="#" className="text-xs font-black uppercase tracking-widest border-b-2 border-black pb-2 hover:border-red-600 transition-all mb-4">
            Tout lire
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {newsItems.map((item, idx) => (
            <div 
              key={idx} 
              className="border-t border rounded border-gray-400  group cursor-pointer reveal"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="relative aspect-16/10 mb-8 overflow-hidden bg-gray-100">
                <Image width={400} height={300} src={item.img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" alt={item.title} />
                <div className="absolute top-0 left-0 bg-black text-white px-4 py-2 text-[10px] font-black uppercase tracking-widest">
                  {item.category}
                </div>
              </div>
              <div className="flex gap-6 p-3 items-start">
                <span className="text-red-600  md:text-4xl font-black text-stroke opacity-50 group-hover:text-gray-600 transition-opacity whitespace-nowrap leading-none">{item.date}</span>
                <h3 className="text-lg md:text-2xl font-bold leading-tight group-hover:text-red-600 transition-colors">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default News;
