
import { members } from '@/data/data';
import Image from 'next/image';
import React from 'react';



const Members: React.FC = () => {
  return (
    <section id="teams" className="scroll-mt-12  md:scroll-mt-16 py-8  md:py-16 px-6 md:px-12 bg-white">
      <div className=" md:px-6 container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:mb-16 reveal">
          <div className="lg:col-span-4">
            <h2 className="text-7xl md:text-8xl mb-8">Team.</h2>
            <p className="text-gray-400 text-lg font-light leading-relaxed">
              Quatre âmes, quatre horizons, une seule vibration. Le collectif est le pilier de notre existence.
            </p>
          </div>
          <div className="lg:col-span-8 flex items-end">
            <div className="h-px w-full bg-black/10"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {members.map((member, idx) => (
            <div 
              key={idx} 
              className="group reveal relative overflow-hidden"
              style={{ animationDelay: `${0.1 * idx}s` }}
            >
              <div className="aspect-4/6 overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-1000">
                <Image  width={400} height={600} src={member.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-2000" alt={member.name} />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-8 bg-linear-to-t from-black to-transparent md:translate-y-8 md:group-hover:translate-y-0 md:opacity-0 group-hover:opacity-100 transition-all duration-500">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-red-500 mb-2 block">{member.tag}</span>
                <h3 className="text-3xl text-white uppercase font-black">{member.name}</h3>
                <p className="text-xs text-gray-300 uppercase tracking-widest">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Members;
