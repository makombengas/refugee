
import Image from 'next/image';


const Documentary= () => {
  return (
    <section id="film" className="scroll-mt-16  md:scroll-mt-16 py-8 md:py-16 px-6 md:px-12 bg-[#fafafa] overflow-hidden">
      <div className="container md:px-8 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Texte et Concept */}
          <div className="lg:col-span-5 reveal">
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-red-600 mb-6 block">Projet en Développement</span>
            <h2 className="flex gap-6 text-6xl md:text-8xl leading-[0.85] mb-10">
              LE <br/> <span className="text-stroke">FILM.</span>
            </h2>
            <div className="space-y-6 text-gray-600 text-lg font-light leading-relaxed">
              <p>
                Plus qu&apos;un simple documentaire, ce long-métrage retrace l&apos;histoire de la rodyssée des <strong>Refugiés</strong>. De la poussière des camps d&apos;Oldenburg aux lumières de la scène internationale.
              </p>
              <p className="border-l-2 border-red-600 pl-6 italic py-2">
                Que sont-ils devenus ? — Une exploration humaine sur la résilience, montrant comment les anciens résidents du camp ont transformé l&apos;incertitude en avenir.
              </p>
              <p>
                Le film met en lumière les trajectoires individuelles des membres et des habitants du camp, prouvant que l&apos;exil n&apos;est pas une fin, mais le début d&apos;une nouvelle histoire.
              </p>
            </div>
            
            <div className="mt-12 flex items-center gap-8">
              <button className="cursor-pointer px-8 py-4 bg-black text-white text-[10px] font-black uppercase tracking-widest hover:bg-red-600 transition-all">
                Soutenir la Production
              </button>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Sortie prévue 2026</span>
            </div>
          </div>

          {/* Visuel Cinématographique */}
          <div className="lg:col-span-7 relative reveal stagger-1">
            <div className="relative aspect-video overflow-hidden shadow-2xl group">
              <Image
                width={800} height={600} 
                src="https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1200&auto=format&fit=crop" 
                alt="Documentary Teaser" 
                className="w-full h-full object-cover grayscale group-hover:scale-105 transition-transform duration-3000ms ease-in-out"
              />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <div className="w-20 h-20 border border-white/30 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform cursor-pointer">
                  <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                </div>
              </div>
              
              {/* Overlay Textures */}
              <div className="absolute bottom-8 left-8 text-white">
                <p className="text-[10px] font-black tracking-[0.3em] uppercase opacity-70 mb-1">Director&apos;s cut</p>
                <p className="text-xl font-bold uppercase tracking-tighter">L&apos;Héritage en Mouvement</p>
              </div>
            </div>
            
            {/* Décoration éditoriale */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-red-600/10 -z-10 hidden lg:block"></div>
            <div className="absolute -top-6 -left-6 text-[12rem] font-black text-black/5 leading-none select-none -z-10">VEO</div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Documentary;
