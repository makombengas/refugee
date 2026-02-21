"use client"
import { motion } from "framer-motion";
import heroImage from "../../../../public/images/slider/Les réfugiés_grille.png";
import Image from "next/image";

export const HeroSection = () => {
  return (
    <section className="relative h-[80vh] w-full overflow-hidden">
      <Image
        priority
        fill
        src={heroImage}
        alt="Le groupe en concert"
        className="absolute inset-0 w-full h-full object-center object-cover"
      />
      <div
        className="absolute inset-0"
        style={{ background: "var(--hero-gradient)" }}
      />
      <div className="absolute inset-0 bg-linear-to-t from-white to-transparent" />

      <div className="relative z-10 md:-mt-26 flex flex-col items-center justify-end h-full md:z-40text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-display font-extrabold text-4xl md:text-8xl tracking-wider text-red-600/80 uppercase"
        >
          Les Refugiés
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-4 text-sm md:text-xl text-black/90 font-body tracking-[0.3em] uppercase"
        >
           Le rythme de l&apos;isolement Depuis 2010
        </motion.p>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-6 w-24 h-0.5 bg-primary"
        />
      </div>
    </section>
  );
};


