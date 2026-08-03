import { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, useParams, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Volume2, VolumeX } from 'lucide-react';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { db } from './lib/firebase';
import Hero from './components/Hero';
import Couple from './components/Couple';
import Events from './components/Events';
import RSVP from './components/RSVP';
import Footer from './components/Footer';
import InviteManager from './pages/InviteManager';

function WeddingInvitation() {
  const { guestSlug } = useParams<{ guestSlug?: string }>();
  const [searchParams] = useSearchParams();
  const [opened, setOpened] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [guestName, setGuestName] = useState<string>('Tamu Undangan');
  const [guestAddress, setGuestAddress] = useState<string>('');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function resolveGuest() {
      // 1. Query parameter override (?to=... or ?nama=... & ?di=...)
      const paramName = searchParams.get('to') || searchParams.get('nama') || searchParams.get('name');
      const paramAddress = searchParams.get('di') || searchParams.get('alamat');

      if (paramName) {
        if (isMounted) {
          setGuestName(paramName);
          if (paramAddress) setGuestAddress(paramAddress);
        }
        return;
      }

      // 2. Slug parameter override
      if (guestSlug && guestSlug.toLowerCase() !== 'undang') {
        const cleanSlug = guestSlug.toLowerCase().trim();
        try {
          const q = query(
            collection(db, 'invitations'),
            where('slug', '==', cleanSlug),
            limit(1)
          );
          const snapshot = await getDocs(q);

          if (!snapshot.empty && isMounted) {
            const data = snapshot.docs[0].data();
            setGuestName(data.name || 'Tamu Undangan');
            setGuestAddress(data.address || '');
          } else if (isMounted) {
            // Fallback: convert slug hyphens to Title Case
            const formatted = cleanSlug
              .split('-')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ');
            setGuestName(formatted);
          }
        } catch (err) {
          console.error('Error finding guest invitation by slug:', err);
        }
      }
    }

    resolveGuest();

    return () => {
      isMounted = false;
    };
  }, [guestSlug, searchParams]);

  useEffect(() => {
    audioRef.current = new Audio('/audio.mp3');
    audioRef.current.loop = true;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      if (playing) {
        audioRef.current.play().catch((err) => console.log('Audio playback failed', err));
      } else {
        audioRef.current.pause();
      }
    }
  }, [playing]);

  const handleOpen = () => {
    setOpened(true);
    setPlaying(true);
  };

  return (
    <div className="antialiased selection:bg-[#d4af37] selection:text-white bg-[#fdfbf7]">
      <AnimatePresence>
        {!opened && (
          <motion.div
            exit={{ y: '-100vh', opacity: 0 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
            className="fixed inset-0 z-50 bg-stone-900 flex flex-col items-center justify-center text-white overflow-hidden px-4"
          >
            <div
              className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay"
              style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80")' }}
            />

            <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-lg">
              <p className="font-['Montserrat'] text-xs sm:text-sm tracking-[0.2em] uppercase text-[#d4af37] mb-4">
                Wedding Invitation
              </p>
              <h1 className="font-['Great_Vibes'] text-6xl md:text-8xl mb-8 drop-shadow-lg">
                Ayu & Rohadi
              </h1>
              <p className="font-['Montserrat'] text-stone-200 max-w-md mb-10 leading-relaxed text-center">
                Kepada Yth. Bapak/Ibu/Saudara/i <br/>
                <strong className="text-[#d4af37] text-xl font-semibold mt-2 block tracking-wide">
                  {guestName}
                </strong>
                {guestAddress && (
                  <span className="text-stone-300 text-sm block mt-1 italic font-light">
                    di {guestAddress}
                  </span>
                )}
              </p>
              <button
                onClick={handleOpen}
                className="flex items-center gap-2 bg-[#d4af37] text-stone-950 px-8 py-4 rounded-full font-['Montserrat'] font-semibold hover:bg-white hover:text-stone-900 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                <Heart size={20} className="fill-current" />
                Buka Undangan
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {opened && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={() => setPlaying(!playing)}
            className="fixed bottom-6 right-6 z-40 bg-[#d4af37] text-stone-950 p-4 rounded-full shadow-xl hover:bg-white transition-colors"
          >
            {playing ? <Volume2 size={24} /> : <VolumeX size={24} />}
          </motion.button>
        )}
      </AnimatePresence>

      <main className={`${!opened ? 'h-screen overflow-hidden' : ''}`}>
        <Hero />
        <Couple />
        <Events />
        <RSVP guestName={guestName} />
        <Footer />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/undang" element={<InviteManager />} />
        <Route path="/:guestSlug" element={<WeddingInvitation />} />
        <Route path="/" element={<WeddingInvitation />} />
      </Routes>
    </BrowserRouter>
  );
}
