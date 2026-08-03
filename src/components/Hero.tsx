import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center text-white overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80")'
        }}
      />
      <div className="absolute inset-0 bg-stone-900/60" />

      <div className="relative z-10 flex flex-col items-center text-center px-4 w-full max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="font-['Montserrat'] tracking-[0.3em] uppercase text-sm md:text-base mb-6 text-[#d4af37]"
        >
          The Wedding Of
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 1.5 }}
          className="font-['Great_Vibes'] text-7xl md:text-9xl mb-6 drop-shadow-xl"
        >
          Ayu & Rohadi
        </motion.h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="flex items-center gap-4 mb-8"
        >
          <div className="h-px w-12 bg-[#d4af37]" />
          <p className="font-['Playfair_Display'] text-xl md:text-2xl italic">Save the Date</p>
          <div className="h-px w-12 bg-[#d4af37]" />
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1 }}
          className="font-['Montserrat'] text-lg md:text-xl font-medium tracking-[0.2em] uppercase border border-[#d4af37] px-8 py-3 rounded-sm"
        >
          15 . 08 . 2026
        </motion.p>
      </div>

      <motion.a
        href="#couple"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-10 animate-bounce text-[#d4af37] hover:text-white transition-colors"
      >
        <ChevronDown size={36} strokeWidth={1.5} />
      </motion.a>
    </section>
  );
}
