import Image from "next/image";


const History = () => {
  return (
    <section id="history" className="scroll-mt-16  md:scroll-mt-16  py-8 md:py-16  px-6 md:px-12 bg-white border-y border-gray-100">
      <div className="container md:px-6 mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        <div className="lg:col-span-5 reveal">
          <span className="text-xs font-bold tracking-[0.5em] uppercase text-red-600 mb-8 block">Notre Parcours</span>
          <h2 className="text-4xl md:text-5xl mb-12 leading-none">
            L&apos;âme d&apos;Oldenburg <br/>
            <span className="text-stroke">Le souffle de l&apos;ailleurs</span>
          </h2>
          <div className="space-y-8 text-gray-600 text-lg leading-relaxed">
            <p>
              C&apos;est dans l&apos;épure et le silence des camps d&apos;Oldenburg que l&apos;idée a germé. Pas de bruit superflu, juste l&apos;essentiel : la voix, le rythme, la survie.
            </p>
            <blockquote className="border-l-2 border-red-600 pl-8 my-12 text-2xl font-light italic text-black">
              Nous avons transformé l&apos;isolement en une symphonie urbaine.
            </blockquote>
            <p>
              Les Refugiés, c&apos;est l&apos;histoire d&apos;une rencontre improbable entre quatre identités qui refusent d&apos;être définies par leur passé, mais choisissent de l&apos;utiliser comme une force créatrice brute.
            </p>
          </div>
        </div>
        
        <div className="lg:col-span-7 grid grid-cols-2 gap-4 reveal stagger-2">
          <div className="space-y-4 h-400p">
            <Image  loading="lazy" width={800} height={600} src="/images/members/studio.png"  className="w-full  object-cover grayscale" alt="History 1" />
            <div className="bg-[#242727] h-32 flex items-center justify-center text-white text-4xl md:text-5xl font-black">2008</div>
          </div>
          <div className="pt-20 space-y-4">
            <div className="bg-[#e63946]  h-32 flex items-center justify-center text-white text-4xl md:text-5xl font-black">2012</div>
            <Image width={800} height={600} src="/images/members/live.png" className="w-full h-400px object-cover" alt="History 2" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default History;
