import React from 'react'
import Container from '@/components/Container'
import Link from 'next/link'

const AppleFooter: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#5c0505] pt-32 pb-16 overflow-hidden relative border-t border-white/5">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-32">
          {/* Iconic Brand Tag */}
          <div className="md:col-span-1 flex flex-col gap-6">
            <Link href="/" className="inline-block group">
              <img 
                src="https://res.cloudinary.com/dry6dvzoj/image/upload/v1757729690/Forcegym_1_nxwdfw.png" 
                alt="Force Gym Logo" 
                className="h-28 w-auto brightness-0 invert transition-transform duration-500 group-hover:scale-105" 
              />
            </Link>
            <p className="text-white/80 text-[10px] font-bold uppercase tracking-[0.4em] leading-relaxed italic">
              Donde la fuerza física se encuentra con el diseño de vanguardia.
            </p>
          </div>

          {/* Minimal Links */}
          <div className="space-y-6">
             <h5 className="text-white font-black text-[10px] uppercase tracking-[0.5em] mb-8">PRODUCTO</h5>
             <ul className="flex flex-col gap-4">
                {[
                  { label: 'Membresías', href: '/#ofertas' },
                  { label: 'Entrenamientos', href: '/client/training' },
                  { label: 'Dashboard', href: '/client' },
                  { label: 'Sedes', href: '/locations' }
                ].map(link => (
                  <li key={link.label}><Link href={link.href} className="text-white/60 hover:text-white transition-colors text-xs font-bold tracking-widest uppercase italic">{link.label}</Link></li>
                ))}
             </ul>
          </div>

          <div className="space-y-6">
             <h5 className="text-white font-black text-[10px] uppercase tracking-[0.5em] mb-8">CLUB</h5>
             <ul className="flex flex-col gap-4">
                {[
                  { label: 'Nosotros', href: '/about' },
                  { label: 'Privacidad', href: '/privacy' },
                  { label: 'Soporte', href: 'mailto:forcegymgym1@gmail.com' }
                ].map(link => (
                  <li key={link.label}><Link href={link.href} className="text-white/60 hover:text-white transition-colors text-xs font-bold tracking-widest uppercase italic">{link.label}</Link></li>
                ))}
             </ul>
          </div>

          <div className="space-y-6">
             <h5 className="text-white font-black text-[10px] uppercase tracking-[0.5em] mb-8">SOCIAL</h5>
             <ul className="flex flex-col gap-4">
                {[
                  { label: 'Linkedin', href: 'https://www.linkedin.com/in/mauricio-herrera-7b744b274' },
                  { label: 'Github', href: 'https://github.com/MauriHerrera7' },
                  { label: 'Correo', href: 'mailto:mauriherrera457@gmail.com' },
                  { label: 'Portafolio', href: 'https://portafolio-web-nu-wheat.vercel.app' }
                ].map(link => (
                  <li key={link.label}><Link href={link.href} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors text-xs font-bold tracking-widest uppercase italic">{link.label}</Link></li>
                ))}
             </ul>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="border-t border-white/10 pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
           <div className="text-[10px] text-white/40 font-bold uppercase tracking-[0.6em]">
              © {currentYear} ForceGym Performance. All rights reserved.
           </div>
           <div className="h-px w-24 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
           <div className="text-[10px] text-white/40 font-bold uppercase tracking-[0.6em]">
              Designed in Puerto Madero
           </div>
        </div>
      </Container>
    </footer>
  )
}

export default AppleFooter
