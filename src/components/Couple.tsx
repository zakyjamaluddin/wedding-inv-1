import { motion } from 'motion/react';
import { BookOpen } from 'lucide-react';

export default function Couple() {
  return (
    <section id="couple" className="py-24 bg-[#fdfbf7] text-stone-800 relative">
      <div className="max-w-4xl mx-auto px-6 text-center">
        {/* Islamic Opening & Quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-20"
        >
          <p className="font-['Montserrat'] text-xl mb-4 text-[#d4af37]">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم</p>
          <p className="font-['Montserrat'] text-sm md:text-base mb-12">
            Assalamu'alaikum Warahmatullahi Wabarakatuh
          </p>
          
          <div className="max-w-3xl mx-auto space-y-6 bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-stone-100 relative">
             <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#fdfbf7] px-4 text-[#d4af37]">
                <BookOpen size={40} strokeWidth={1} />
             </div>
            <p className="text-2xl md:text-3xl leading-relaxed text-stone-700 font-serif" dir="rtl">
              وَمِنْ اٰيٰتِهٖٓ اَنْ خَلَقَ لَكُمْ مِّنْ اَنْفُسِكُمْ اَزْوَاجًا لِّتَسْكُنُوْٓا اِلَيْهَا وَجَعَلَ بَيْنَكُمْ مَّوَدَّةً وَّرَحْمَةً ۗ اِنَّ فِيْ ذٰلِكَ لاٰيٰتٍ لِّقَوْمٍ يَّتَفَكَّرُوْنَ
            </p>
            <p className="font-['Montserrat'] text-sm italic text-stone-500 leading-relaxed">
              "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir."
            </p>
            <p className="font-['Montserrat'] text-xs font-bold text-[#d4af37]">(QS. Ar-Rum: 21)</p>
          </div>
        </motion.div>

        {/* The Couple */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-8"
        >
          <p className="font-['Montserrat'] text-sm md:text-base text-stone-600 mb-12">
            Maha Suci Allah yang telah menciptakan makhluk-Nya berpasang-pasangan.
            Ya Allah, perkenankanlah kami merangkaikan kasih sayang yang Kau ciptakan di antara putra-putri kami:
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24">
          {/* Bride */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center"
          >
            <h3 className="font-['Great_Vibes'] text-5xl md:text-6xl text-[#d4af37] mb-6">Ayu Devi Novelasari</h3>
            <p className="font-['Montserrat'] text-sm text-stone-600 leading-relaxed">
              Putri dari<br/>
              (Alm) Bapak H. Masfuk<br/>&<br/>Ibu Hj. Siti Insiyah
            </p>
          </motion.div>

          {/* Divider */}
          <motion.div
             initial={{ opacity: 0, scale: 0 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 1 }}
             className="font-['Great_Vibes'] text-6xl text-[#d4af37]"
          >
            &
          </motion.div>

          {/* Groom */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center"
          >
            <h3 className="font-['Great_Vibes'] text-5xl md:text-6xl text-[#d4af37] mb-6">Rohadi Suryo Nugroho</h3>
            <p className="font-['Montserrat'] text-sm text-stone-600 leading-relaxed">
              Putra dari<br/>
              (Alm) Bapak Gagoek Soegijono<br/>&<br/>(Alm) Ibu Retno Suryandari
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
