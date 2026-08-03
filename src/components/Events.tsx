import { motion } from 'motion/react';
import { MapPin, Calendar, Clock } from 'lucide-react';

export default function Events() {
  return (
    <section id="events" className="py-24 bg-white text-stone-950 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-stone-50 rounded-bl-[100px] -z-10" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-stone-50 rounded-tr-[100px] -z-10" />

      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <h2 className="font-['Great_Vibes'] text-5xl md:text-6xl text-stone-800 mb-4">Event Details</h2>
          <p className="font-['Montserrat'] text-sm max-w-xl mx-auto text-stone-600">
            Dengan memohon rahmat dan ridho Allah SWT, kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara pernikahan kami.
          </p>
        </motion.div>

        <div className="flex justify-center">
          {/* Event Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="w-full max-w-md bg-stone-900 text-white p-10 rounded-tl-[60px] rounded-br-[60px] shadow-2xl relative border border-stone-700"
          >
            <div className="absolute top-4 right-4 text-[#d4af37] opacity-20">
              <Calendar size={64} />
            </div>
            <h3 className="font-['Playfair_Display'] text-3xl font-semibold mb-6 text-[#d4af37]">Temu Manten</h3>
            <div className="space-y-4 font-['Montserrat'] text-sm">
              <div className="flex items-start gap-4">
                <Calendar className="text-[#d4af37] mt-1 shrink-0" size={20} />
                <div>
                  <p className="font-semibold text-lg">Sabtu, 15 Agustus 2026</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Clock className="text-[#d4af37] mt-1 shrink-0" size={20} />
                <div>
                  <p>10.00 WIB - Selesai</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="text-[#d4af37] mt-1 shrink-0" size={20} />
                <div>
                  <p className="font-semibold">Kediaman Mempelai Wanita</p>
                  <p className="text-stone-300">Jl. Raya Gang Pasar No.7 Cepu RT.01 RW.04 Kec. Cepu Kab. Blora 58312</p>
                </div>
              </div>
            </div>
            <a
              href="https://maps.app.goo.gl/HKHDPMEiz1z6ALJPA?g_st=ic"
              target="_blank"
              rel="noreferrer"
              className="mt-8 block bg-[#d4af37] text-stone-950 px-6 py-3 rounded-full font-['Montserrat'] text-sm font-semibold hover:bg-white transition-colors text-center w-full shadow-lg"
            >
              View on Map
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
