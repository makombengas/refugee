"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import bandImage from "../../../../public/images/members/studio.png";;

const BandBio = () => {
  return (
    <section className="flex flex-col items-center 2xl:items-start gap-4 lg:flex-row  py-16 px-4 md:px-6 container mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="space-y-8 w-auto lg:w-1/1 xl:w-1/2"
      >
        <h2 className="font-display text-4xl xl:text-7xl tracking-wide text-primary">
          Notre Histoire
        </h2>
        <div className="w-16 h-0.5 bg-red-600" />
        <p className="text-secondary-foreground font-body text-lg leading-relaxed">
          Né dans les sous-sols de Lyon en 2018, <strong className="text-foreground">Éclipse</strong> puise
          son énergie dans le rock alternatif, les ambiances cinématiques et les textures sonores
          brutes. Quatre musiciens, une vision commune : créer des paysages sonores qui transcendent
          le quotidien.
        </p>
        <p className="text-muted-foreground font-body leading-relaxed">
          Après deux albums acclamés par la critique — <em>« Nuit Blanche »</em> (2020)
          et <em>« Résonance »</em> (2023) — et plus de 200 concerts à travers l&apos;Europe,
          le groupe continue de repousser les frontières de son art. Chaque scène est une
          conversation, chaque note une invitation au voyage.
        </p>

        <blockquote className="border-l-4 border-red-600 pl-6 py-2 mt-8">
          <p className="text-foreground font-body italic text-xl">
            « La musique n&apos;est pas ce que nous faisons. C&apos;est ce que nous sommes. »
          </p>
          <cite className="text-muted-foreground text-sm mt-2 block not-italic">
            — Éclipse, interview pour Rock Magazine, 2024
          </cite>
        </blockquote>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="mt-12 md:mt-0 space-y-8"
      >

        <Image
        loading="eager"
          src={bandImage}
          style={{width:"auto", height:"auto"}}
          width={800}
          height={600}
          alt="Band"
          className="w-full object-cover"
        />
      </motion.div>
    </section>
  );
};

export default BandBio;
