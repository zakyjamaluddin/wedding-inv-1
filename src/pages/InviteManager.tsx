import React, { useState, useEffect } from 'react';
import { collection, addDoc, serverTimestamp, query, orderBy, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Link } from 'react-router-dom';
import { Copy, Share2, Trash2, ExternalLink, Plus, Search, Check, Heart, ArrowLeft, User, MapPin, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Invitation {
  id: string;
  name: string;
  address: string;
  slug: string;
  createdAt?: any;
}

export function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

export default function InviteManager() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [customSlug, setCustomSlug] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'invitations'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Invitation[];
      setInvitations(data);
    });

    return () => unsubscribe();
  }, []);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);
    setCustomSlug(slugify(newName));
  };

  const handleAddInvitation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);
    try {
      let finalSlug = customSlug.trim() || slugify(name);
      if (!finalSlug) finalSlug = `guest-${Date.now()}`;

      // Check for duplicate slugs locally if needed, append timestamp suffix if exists
      const isDuplicate = invitations.some(inv => inv.slug === finalSlug);
      if (isDuplicate) {
        finalSlug = `${finalSlug}-${Math.floor(100 + Math.random() * 900)}`;
      }

      await addDoc(collection(db, 'invitations'), {
        name: name.trim(),
        address: address.trim() || 'Tempat',
        slug: finalSlug,
        createdAt: serverTimestamp()
      });

      setName('');
      setAddress('');
      setCustomSlug('');
    } catch (err) {
      console.error('Error adding invitation:', err);
      alert('Gagal menambahkan data undangan.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus data undangan ini?')) {
      try {
        await deleteDoc(doc(db, 'invitations', id));
      } catch (err) {
        console.error('Error deleting:', err);
      }
    }
  };

  const getFullUrl = (slug: string) => {
    return `${window.location.origin}/${slug}`;
  };

  const handleCopyLink = (inv: Invitation) => {
    const url = getFullUrl(inv.slug);
    navigator.clipboard.writeText(url);
    setCopiedId(inv.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleShareWhatsApp = (inv: Invitation) => {
    const url = getFullUrl(inv.slug);
    const text = `*Undangan Pernikahan Ayu & Rohadi*\n\nKepada Yth. Bapak/Ibu/Saudara/i *${inv.name}*\n${inv.address ? `di ${inv.address}` : ''}\n\nTanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara pernikahan kami.\n\nBerikut tautan undangan kami:\n${url}\n\nMerupakan suatu kehormatan & kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.\n\nTerima kasih.`;
    
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank');
  };

  const filteredInvitations = invitations.filter(inv =>
    inv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    inv.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
    inv.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#fdfbf7] text-stone-800 font-['Montserrat'] pb-20">
      {/* Top Bar */}
      <header className="bg-stone-900 text-white py-6 px-6 sticky top-0 z-30 shadow-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-stone-400 hover:text-[#d4af37] transition-colors p-1">
              <ArrowLeft size={22} />
            </Link>
            <div>
              <h1 className="font-['Playfair_Display'] text-xl font-bold text-[#d4af37]">
                Kelola Undangan Tamu
              </h1>
              <p className="text-xs text-stone-400">Pernikahan Ayu Devi Novelasari & Rohadi Suryo Nugroho</p>
            </div>
          </div>
          <Link
            to="/"
            target="_blank"
            className="flex items-center gap-2 text-xs bg-stone-800 text-stone-200 hover:text-white px-3 py-2 rounded-lg border border-stone-700 hover:border-[#d4af37] transition-all"
          >
            <Heart size={14} className="text-[#d4af37]" />
            Lihat Undangan
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 md:px-6 pt-8 space-y-8">
        {/* Form Card */}
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-stone-200">
          <h2 className="font-['Playfair_Display'] text-2xl font-semibold mb-2 text-stone-900 flex items-center gap-2">
            <Plus className="text-[#d4af37]" size={22} />
            Buat Undangan Baru
          </h2>
          <p className="text-sm text-stone-500 mb-6">
            Masukkan nama dan alamat tamu untuk membuat tautan undangan khusus.
          </p>

          <form onSubmit={handleAddInvitation} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
            <div className="md:col-span-4">
              <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wider mb-2">
                Nama Tamu
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={handleNameChange}
                  placeholder="Contoh: Zaky Jamaluddin"
                  className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/20 outline-none text-sm transition-all"
                />
              </div>
            </div>

            <div className="md:col-span-4">
              <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wider mb-2">
                Alamat / Kota / Tempat
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Contoh: Desa Sekaran"
                  className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/20 outline-none text-sm transition-all"
                />
              </div>
            </div>

            <div className="md:col-span-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#d4af37] hover:bg-stone-900 text-stone-950 hover:text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:opacity-50"
              >
                {loading ? 'Menyimpan...' : 'Generate Link Undangan'}
              </button>
            </div>

            {name && (
              <div className="md:col-span-12 text-xs text-stone-500 bg-amber-50/60 p-3 rounded-lg border border-amber-200/50 mt-2 flex items-center gap-2">
                <span className="font-semibold text-stone-700">Preview Link:</span>
                <code className="text-amber-800 font-mono">{getFullUrl(customSlug || slugify(name))}</code>
              </div>
            )}
          </form>
        </div>

        {/* Table & List Card */}
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-stone-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="font-['Playfair_Display'] text-2xl font-semibold text-stone-900">
                Daftar Tamu Undangan ({invitations.length})
              </h2>
              <p className="text-xs text-stone-500 mt-1">
                Kelola dan bagikan link undangan khusus ke calon tamu.
              </p>
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari nama atau alamat..."
                className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:border-[#d4af37] outline-none"
              />
            </div>
          </div>

          {filteredInvitations.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed border-stone-200 rounded-2xl">
              <User className="mx-auto text-stone-300 mb-3" size={48} />
              <p className="text-stone-600 font-medium text-sm">Belum ada data tamu undangan</p>
              <p className="text-stone-400 text-xs mt-1">Gunakan formulir di atas untuk menambahkan tamu pertama.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-stone-200 text-xs uppercase tracking-wider text-stone-500 bg-stone-50/80">
                    <th className="py-3 px-4 font-semibold rounded-tl-lg">Nama Tamu</th>
                    <th className="py-3 px-4 font-semibold">Alamat</th>
                    <th className="py-3 px-4 font-semibold">Slug Link</th>
                    <th className="py-3 px-4 font-semibold text-right rounded-tr-lg">Aksi / Bagikan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-sm">
                  <AnimatePresence>
                    {filteredInvitations.map((inv) => {
                      const fullUrl = getFullUrl(inv.slug);
                      return (
                        <motion.tr
                          key={inv.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="hover:bg-stone-50/60 transition-colors"
                        >
                          <td className="py-4 px-4 font-medium text-stone-900">
                            {inv.name}
                          </td>
                          <td className="py-4 px-4 text-stone-600">
                            {inv.address || '-'}
                          </td>
                          <td className="py-4 px-4">
                            <span className="inline-block bg-stone-100 text-stone-700 text-xs px-2.5 py-1 rounded-md font-mono border border-stone-200">
                              /{inv.slug}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              {/* WhatsApp Share */}
                              <button
                                onClick={() => handleShareWhatsApp(inv)}
                                title="Bagikan via WhatsApp"
                                className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-all shadow-sm"
                              >
                                <Send size={14} />
                                <span className="hidden sm:inline">WhatsApp</span>
                              </button>

                              {/* Copy Link */}
                              <button
                                onClick={() => handleCopyLink(inv)}
                                title="Salin Link"
                                className="flex items-center gap-1 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold px-3 py-2 rounded-lg transition-all border border-stone-200"
                              >
                                {copiedId === inv.id ? (
                                  <>
                                    <Check size={14} className="text-emerald-600" />
                                    <span className="hidden sm:inline text-emerald-600">Tersalin</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy size={14} />
                                    <span className="hidden sm:inline">Salin</span>
                                  </>
                                )}
                              </button>

                              {/* Preview */}
                              <Link
                                to={`/${inv.slug}`}
                                target="_blank"
                                title="Buka Undangan"
                                className="p-2 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-all"
                              >
                                <ExternalLink size={16} />
                              </Link>

                              {/* Delete */}
                              <button
                                onClick={() => handleDelete(inv.id)}
                                title="Hapus Data"
                                className="p-2 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </motion.tr>
                      );
                    })}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
