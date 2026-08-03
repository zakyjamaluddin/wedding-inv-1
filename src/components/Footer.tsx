export default function Footer() {
  return (
    <footer className="bg-stone-950 text-stone-400 py-16 text-center">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="font-['Great_Vibes'] text-5xl text-[#d4af37] mb-8">Ayu & Rohadi</h2>
        
        <p className="font-['Montserrat'] text-sm md:text-base text-stone-300 mb-6 max-w-2xl mx-auto leading-relaxed">
          Atas kehadiran dan doa restu Bapak/Ibu/Saudara/i, kami ucapkan terima kasih. <br/>
          Wassalamu'alaikum Warahmatullahi Wabarakatuh.
        </p>
        
        <div className="mb-12 space-y-2">
          <p className="font-['Playfair_Display'] italic text-stone-500">Hormat Kami,</p>
          <p className="font-['Montserrat'] text-sm">Kel. (Alm) Bapak H. Masfuk & Ibu Hj. Siti Insiyah</p>
          <p className="font-['Montserrat'] text-sm">Kel. (Alm) Bapak Gagoek Soegijono & (Alm) Ibu Retno Suryandari</p>
        </div>

        <div className="flex items-center justify-center gap-4 text-xs font-['Montserrat'] text-stone-600">
          <p>&copy; 2026 Elegant Wedding Invitation.</p>
          <span className="w-1 h-1 rounded-full bg-stone-700"></span>
          <p>Created for you.</p>
        </div>
      </div>
    </footer>
  );
}
