"use client"

import { PageLayoutProps } from "@/interface/interface"
import { FC, useEffect, useState } from "react"
import Header from "../header/Header"
import Footer from "../footer/Footer"

const PageLayout: FC<PageLayoutProps> = ({ children }) => {
  const [scrolled, setScrolled] = useState(false);

  // Écoute le scroll → met à jour l'état uniquement
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY >= 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Appelé uniquement au clic sur le bouton
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className="page-layout">
      <Header />
      <div className="page-layout__content">
        {children}
      </div>
      <Footer />

      {/* Bouton scroll-to-top */}
      <button
        aria-label="Retour en haut"
        onClick={scrollToTop}
        className={`fixed bottom-5 right-4 z-30 w-8 h-8 md:w-10 md:h-10 bg-red-600 hover:bg-red-700 rounded shadow-md shadow-gray-500/50 flex justify-center items-center transition-all duration-300 cursor-pointer ${
          scrolled ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="#ffffff"
          className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
        </svg>
      </button>
    </div>
  )
}

export default PageLayout