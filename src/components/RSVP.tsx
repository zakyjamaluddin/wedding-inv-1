import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, Loader2, MessageSquareHeart } from 'lucide-react';
import { collection, addDoc, serverTimestamp, query, orderBy, onSnapshot, DocumentData } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface RSVPProps {
  guestName?: string;
}

export default function RSVP({ guestName }: RSVPProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: guestName && guestName !== 'Tamu Undangan' ? guestName : '',
    attendance: '',
    guests: '1',
    message: ''
  });

  useEffect(() => {
    if (guestName && guestName !== 'Tamu Undangan') {
      setFormData(prev => ({
        ...prev,
        name: prev.name || guestName
      }));
    }
  }, [guestName]);
  const [rsvpsList, setRsvpsList] = useState<DocumentData[]>([]);

  useEffect(() => {
    const q = query(collection(db, 'rsvps'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setRsvpsList(data);
    });
    
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await addDoc(collection(db, 'rsvps'), {
        ...formData,
        guests: parseInt(formData.guests),
        createdAt: serverTimestamp()
      });
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting RSVP:', error);
      alert('Gagal mengirim RSVP. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="rsvp" className="py-24 bg-[#fdfbf7] text-stone-800">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-stone-200 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-50" />
          
          <h2 className="font-['Great_Vibes'] text-5xl text-[#d4af37] mb-4">RSVP & Wishes</h2>
          <p className="font-['Montserrat'] text-sm text-stone-500 mb-10">
            Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir.
          </p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-stone-50 text-stone-800 p-8 rounded-2xl flex flex-col items-center border border-stone-200"
            >
              <CheckCircle className="text-[#d4af37] mb-4" size={48} />
              <h3 className="font-['Playfair_Display'] text-2xl mb-2">Terima Kasih!</h3>
              <p className="font-['Montserrat'] text-sm text-stone-500">
                Pesan dan konfirmasi kehadiran Anda telah kami terima.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 text-left font-['Montserrat']">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Nama Lengkap</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-stone-50 border border-stone-200 focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/20 outline-none transition-all"
                  placeholder="Masukkan nama Anda"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Konfirmasi Kehadiran</label>
                <select
                  name="attendance"
                  value={formData.attendance}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-stone-50 border border-stone-200 focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/20 outline-none transition-all text-stone-800"
                >
                  <option value="">Pilih kehadiran...</option>
                  <option value="yes">Ya, saya akan hadir</option>
                  <option value="no">Maaf, saya tidak bisa hadir</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Jumlah Kehadiran</label>
                <input
                  type="number"
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  min="1"
                  max="5"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-stone-50 border border-stone-200 focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/20 outline-none transition-all"
                  placeholder="1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Pesan & Doa</label>
                <textarea
                  rows={4}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-stone-50 border border-stone-200 focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/20 outline-none transition-all resize-none"
                  placeholder="Tuliskan ucapan dan doa untuk kedua mempelai"
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center gap-2 bg-[#d4af37] text-white font-semibold py-4 rounded-lg hover:bg-stone-900 transition-colors shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Mengirim...
                  </>
                ) : (
                  'Kirim Konfirmasi'
                )}
              </button>
            </form>
          )}

          {/* Messages Section */}
          <div className="mt-16 pt-12 border-t border-stone-200">
             <div className="flex items-center justify-center gap-2 mb-8 text-[#d4af37]">
                <MessageSquareHeart size={24} />
                <h3 className="font-['Playfair_Display'] text-2xl">Ucapan & Doa</h3>
             </div>
             
             {rsvpsList.length === 0 ? (
               <p className="font-['Montserrat'] text-sm text-stone-500 italic">Belum ada ucapan. Jadilah yang pertama memberikan doa untuk kedua mempelai.</p>
             ) : (
               <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-stone-200 scrollbar-track-transparent custom-scrollbar text-left">
                 <AnimatePresence>
                   {rsvpsList.map((rsvp) => (
                     <motion.div
                       key={rsvp.id}
                       initial={{ opacity: 0, y: 10 }}
                       animate={{ opacity: 1, y: 0 }}
                       className="bg-stone-50 p-5 rounded-xl border border-stone-100"
                     >
                       <div className="flex items-center justify-between mb-2">
                         <p className="font-['Playfair_Display'] font-semibold text-lg text-stone-800">{rsvp.name}</p>
                         <span className={`text-xs px-2 py-1 rounded-full font-['Montserrat'] ${rsvp.attendance === 'yes' ? 'bg-[#d4af37]/10 text-[#d4af37]' : 'bg-stone-200 text-stone-600'}`}>
                            {rsvp.attendance === 'yes' ? 'Hadir' : 'Tidak Hadir'}
                         </span>
                       </div>
                       <p className="font-['Montserrat'] text-sm text-stone-600 leading-relaxed whitespace-pre-line">
                         "{rsvp.message}"
                       </p>
                       {rsvp.createdAt && rsvp.createdAt.toDate && (
                         <p className="font-['Montserrat'] text-xs text-stone-400 mt-3 text-right">
                           {rsvp.createdAt.toDate().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                         </p>
                       )}
                     </motion.div>
                   ))}
                 </AnimatePresence>
               </div>
             )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
