"use client";

import { MemberCardProps } from "@/interface/interface";
import { motion } from "framer-motion";
import Image from "next/image";



const MemberCard = ({ name, role, image, delay = 0 }: MemberCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="group relative overflow-hidden"
    >
      <div className="aspect-square overflow-hidden bg-card rounded-sm">
        <Image
        width={800}
        height={800}
          src={image}
          alt={name}
          className="   w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent " />
      </div>
      <div className="flex flex-col gap-0 transition-all duration-300 group-hover:gap-1 absolute bottom-0 left-0 right-0 p-5">
        <h3 className="font-display text-2xl tracking-wide text-white group-hover:font-extrabold ">
          {name}
        </h3>
        <div className="w-0 group-hover:w-18 h-0.5 bg-red-600/80 transition-all duration-300" />
        <p className="text-white/70 group-hover:text-white text-sm font-body tracking-widest uppercase">
          {role}
        </p>
      </div>
    </motion.div>
  );
};

export default MemberCard;
