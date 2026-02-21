import { headerLinks } from "@/data/data";
import Link from "next/link";



const Footer = () => {
  return (
    <footer className="py-24 px-6 md:px-12 bg-white border-t border-black/5">
      <div className="container md:px-8 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-3 mb-8">
              <span className="w-10 h-10 bg-red-600 flex items-center justify-center text-white font-black text-sm">LR</span>
              <h2 className="text-3xl  tracking-tighter uppercase">Les Refugiés</h2>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Une identité sonore forgée dans l&apos;exil, une voix portée par l&apos;unité. Oldenburg est notre ancrage, le monde est notre scène.
            </p>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] mb-8 text-red-600">Navigation</h3>
            <ul className="space-y-4">
              {headerLinks.map(link => (
                <li key={link.id}>
                  <Link href={`${link.href}`} className="text-sm font-bold uppercase tracking-widest hover:text-red-600 transition-colors">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] mb-8 text-red-600">Suivre</h3>
            <ul className="space-y-4">
              {['Instagram', 'Spotify', 'YouTube', 'Facebook'].map(link => (
                <li key={link}>
                  <a href="#" className="text-sm font-bold uppercase tracking-widest hover:text-green-600 transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4 lg:text-right">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] mb-8 text-red-600">Soutenir le Projet</h3>
            <p className="text-gray-500 text-xs mb-8 uppercase tracking-widest leading-loose">
              Aidez-nous à rester indépendants et à porter nos voix plus loin. Chaque don soutient la création studio et nos actions sociales.
            </p>
            <div className="flex flex-col lg:items-end gap-4">
              <form action="https://www.paypal.com/donate" method="post" target="_top">
                <input type="hidden" name="hosted_button_id" value="YOUR_PAYPAL_ID" />
                <button type="submit" className="cursor-pointer group flex items-center gap-4 px-8 py-4 bg-[#0070ba] text-white font-black uppercase tracking-[0.2em] text-[10px] hover:bg-black transition-all">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.067 8.478c.492.292.732.846.602 1.442l-1.353 6.132c-.105.474-.471.841-.95 1l-1.632.484c-.477.141-.986-.101-1.157-.56l-1.64-4.414c-.134-.359-.44-.617-.824-.685l-1.85-.327c-.41-.073-.758.204-.848.608l-1.216 5.514c-.105.474-.471.841-.95 1l-1.632.484c-.477.141-.986-.101-1.157-.56L4.364 8.618c-.144-.388-.046-.826.248-1.112l3.472-3.376C8.38 3.844 8.784 3.702 9.2 3.738l8.916.786c.866.076 1.543.766 1.631 1.63l.32 3.324z" />
                  </svg>
                  <span>Faire un don PayPal</span>
                </button>
              </form>
              <span className="text-[8px] font-bold text-gray-300 uppercase tracking-widest">Transaction sécurisée via PayPal</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-black/15 gap-6">
          <p className="text-[10px] text-center font-bold uppercase tracking-widest text-gray-400">
            &copy; {new Date().getFullYear()} Les Refugiés. Tous droits réservés.
          </p>
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
            Conçu à Oldenburg, DE
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
