import React from 'react'
import Container from '@/components/Container'
import Link from 'next/link'

const AppleFooter: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-apple-black pt-32 pb-16 overflow-hidden relative border-t border-white/5">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-32">
          {/* Iconic Brand Tag */}
          <div className="md:col-span-1 flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-apple-red rounded-sm group-hover:rotate-90 transition-transform duration-700" />
              <span className="text-white font-black text-2xl italic tracking-tighter uppercase transition-colors group-hover:text-apple-red">FORCE<span className="text-white group-hover:text-apple-red transition-all">GYM</span></span>
            </Link>
            <p className="text-zinc-600 text-[10px] font-bold uppercase tracking-[0.4em] leading-relaxed italic">
              Donde la fuerza física se encuentra con el diseño de vanguardia.
            </p>
          </div>

          {/* Minimal Links */}
          <div className="space-y-6">
             <h5 className="text-white font-black text-[10px] uppercase tracking-[0.5em] mb-8">PRODUCTO</h5>
             <ul className="flex flex-col gap-4">
                {['Membresías', 'Sedes', 'Ecosistema', 'Dashboard'].map(link => (
                  <li key={link}><Link href="#" className="text-zinc-500 hover:text-white transition-colors text-xs font-bold tracking-widest uppercase italic">{link}</Link></li>
                ))}
             </ul>
          </div>

          <div className="space-y-6">
             <h5 className="text-white font-black text-[10px] uppercase tracking-[0.5em] mb-8">CLUB</h5>
             <ul className="flex flex-col gap-4">
                {['Manifiesto', 'Staff Elite', 'Privacidad', 'Legal'].map(link => (
                  <li key={link}><Link href="#" className="text-zinc-500 hover:text-white transition-colors text-xs font-bold tracking-widest uppercase italic">{link}</Link></li>
                ))}
             </ul>
          </div>

          <div className="space-y-6">
             <h5 className="text-white font-black text-[10px] uppercase tracking-[0.5em] mb-8">SOCIAL</h5>
             <ul className="flex flex-col gap-4">
                {['Instagram', 'Twitter', 'Youtube', 'Linkedin'].map(link => (
                  <li key={link}><Link href="#" className="text-zinc-500 hover:text-white transition-colors text-xs font-bold tracking-widest uppercase italic">{link}</Link></li>
                ))}
             </ul>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
           <div className="text-[10px] text-zinc-700 font-bold uppercase tracking-[0.6em]">
              © {currentYear} ForceGym Performance. All rights reserved.
           </div>
           <div className="h-px w-24 bg-gradient-to-r from-transparent via-apple-red to-transparent" />
           <div className="text-[10px] text-zinc-700 font-bold uppercase tracking-[0.6em]">
              Designed in Puerto Madero
           </div>
        </div>
      </Container>
    </footer>
  )
}

export default AppleFooter
