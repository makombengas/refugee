'use client';

import { headerLinks } from '@/data/data';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState, useEffect, useRef } from 'react';

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const pathname = usePathname();
  const prevPathname = useRef(pathname);

  const isHome = pathname === '/';
  const isSolid = scrolled || !isHome;

  // Ferme le menu au changement de route
  useEffect(() => {
    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname;
      const t = setTimeout(() => setMenuOpen(false), 0);
      return () => clearTimeout(t);
    }
  }, [pathname]);

  // Scroll listener + détection section active via IntersectionObserver
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);

    // Observe chaque section correspondant aux ancres
    const sectionIds = headerLinks
      .filter((l) => l.href.startsWith('#'))
      .map((l) => l.href.replace('#', ''));

    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.4 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  // Bloque le scroll du body quand le menu est ouvert
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  // Lien actif :
  // - ancre (#home, #events…) → actif si la section est visible ET on est sur "/"
  // - page (/about…) → actif si pathname correspond
  const isActive = (href: string) => {
    if (href.startsWith('#')) {
      return isHome && activeSection === href.replace('#', '');
    }
    return pathname === href || pathname.startsWith(href + '/');
  };

  const handleLinkClick = (href: string) => {
    if (href.startsWith('#')) {
      if (isHome) {
        scrollToSection(href.replace('#', ''));
      } else {
        // Sur une autre page, on navigue vers / puis l'ancre
        setMenuOpen(false);
      }
    } else {
      setMenuOpen(false);
    }
  };

  // Pour les ancres depuis une autre page, construire le href complet
  const resolveHref = (href: string) => {
    if (href.startsWith('#')) return isHome ? href : `/${href}`;
    return href;
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
        isSolid
          ? 'py-4 bg-white/95 backdrop-blur-md shadow-md shadow-black/10'
          : 'py-4 md:py-8 bg-transparent'
      }`}>
      <div className='w-full lg:container mx-auto px-4 xl:px-6 flex justify-between items-center'>

        {/* Logo */}
        <Link href='/'  onClick={() => handleLinkClick("/")} className='z-50 flex items-center gap-2'>
          <span
            className={`shadow-md bg-red-600 flex items-center justify-center text-white font-black transition-all duration-500 ${
              isSolid ? 'w-8 h-8 text-xs' : 'w-8 h-8 xl:w-20 xl:h-20 xl:text-4xl text-xs'
            }`}>
            LR
          </span>
          <span
            className={`text-xs lg:text-sm xl:text-2xl tracking-tighter uppercase transition-colors ${
              menuOpen ? 'text-black' : isSolid ? 'text-black' : 'text-white'
            }`}>
            Les Refugiés
          </span>
        </Link>

        {/* Nav */}
        <div
          className={`z-30 flex items-center gap-6 ${
            menuOpen
              ? 'flex-col fixed top-0 left-0 w-full h-screen bg-white pt-28 text-black md:static md:flex-row md:h-auto md:w-auto md:bg-transparent md:pt-0 overflow-hidden'
              : `hidden md:flex ${isSolid ? 'text-black' : 'text-white'}`
          }`}>

          {headerLinks.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.id}
                href={resolveHref(item.href)}
                onClick={() => handleLinkClick(item.href)}
                className={`relative text-lg md:text-[10px] lg:text-[12px] xl:text-sm font-bold uppercase tracking-[0.3em] transition-colors group ${
                  active ? 'text-red-600' : 'hover:text-red-600'
                }`}>
                {item.name}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-red-600 transition-all duration-300 ${
                    active ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            );
          })}

          {/* Bouton Réserver */}
          <Link
            href={isHome ? '#contact' : '/#contact'}
            onClick={() => isHome ? scrollToSection('contact') : setMenuOpen(false)}
            className={`cursor-pointer px-6 py-2 border-2 text-lg md:text-[10px] lg:text-[12px] xl:text-sm font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all ${
              menuOpen || isSolid ? 'border-black text-black' : 'border-white text-white'
            }`}>
            Réserver
          </Link>
        </div>

        {/* Burger */}
        <div
          className='z-50 block relative space-y-1 md:hidden cursor-pointer'
          onClick={() => setMenuOpen((prev) => !prev)}>
          <hr className={`w-6 h-0.5 transition-all duration-300 ${menuOpen ? 'rotate-45 origin-center bg-black' : isSolid ? 'bg-black' : 'bg-white'}`} />
          <hr className={`w-6 h-0.5 transition-all duration-300 ${menuOpen ? 'opacity-0 bg-black' : isSolid ? 'bg-black opacity-100' : 'bg-white opacity-100'}`} />
          <hr className={`w-6 h-0.5 transition-all duration-300 ${menuOpen ? 'absolute top-0 -rotate-45 origin-center bg-black' : isSolid ? 'bg-black' : 'bg-white'}`} />
        </div>
      </div>
      
    </nav>
  );
};

export default Header;