import React from 'react'
import Container from '@/components/Container'
import Link from 'next/link'

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-zinc-950 border-t-8 border-red-600 pt-24 pb-12 overflow-hidden relative">
      {/* Background Graphic */}
      <div className="absolute top-0 right-0 opacity-[0.02] pointer-events-none select-none">
         <div className="text-[20rem] font-black italic text-white tracking-tighter uppercase leading-none translate-x-1/2">FORCE</div>
      </div>

      <Container className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          {/* Brand Info */}
          <div className="flex flex-col gap-8">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-red-600 rounded-sm group-hover:rotate-45 transition-transform" />
              <span className="text-white font-black text-3xl italic tracking-tighter uppercase">FORCE<span className="text-red-600">GYM</span></span>
            </Link>
            <p className="text-zinc-500 text-sm font-medium leading-relaxed italic border-l-2 border-zinc-800 pl-4">
              Llevando el entrenamiento al siguiente nivel mediante la fusión de fuerza bruta y tecnología de élite. Únete a la revolución del rendimiento.
            </p>
            <div className="flex gap-4">
               {['FB', 'IG', 'TW', 'YT'].map((social) => (
                 <div key={social} className="w-10 h-10 bg-zinc-900 border border-white/5 flex items-center justify-center text-[10px] font-black hover:bg-red-600 hover:text-white transition-all cursor-pointer">
                    {social}
                 </div>
               ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-8">
            <h4 className="text-white font-black uppercase italic tracking-widest text-sm border-b-2 border-red-600 pb-2 w-max">Empresa</h4>
            <ul className="flex flex-col gap-4">
              {['Sobre Nosotros', 'Nuestras Sedes', 'Staff Elite', 'Blog Force'].map((link) => (
                <li key={link}>
                  <Link href="#" className="text-zinc-500 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest italic">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Training */}
          <div className="flex flex-col gap-8">
            <h4 className="text-white font-black uppercase italic tracking-widest text-sm border-b-2 border-red-600 pb-2 w-max">Entrenamiento</h4>
            <ul className="flex flex-col gap-4">
              {['Programas Pro', 'Clases Grupales', 'Nutrición Digital', 'Recuperación'].map((link) => (
                <li key={link}>
                  <Link href="#" className="text-zinc-500 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest italic">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-8">
            <h4 className="text-white font-black uppercase italic tracking-widest text-sm border-b-2 border-red-600 pb-2 w-max">Contacto</h4>
            <ul className="flex flex-col gap-4">
               <li className="flex flex-col gap-1">
                  <span className="text-zinc-600 font-bold text-[10px] uppercase tracking-widest">Email</span>
                  <span className="text-white font-bold italic tracking-wide">info@forcegym.pro</span>
               </li>
               <li className="flex flex-col gap-1">
                  <span className="text-zinc-600 font-bold text-[10px] uppercase tracking-widest">Teléfono</span>
                  <span className="text-white font-bold italic tracking-wide">+54 011 4567-8900</span>
               </li>
               <li className="flex flex-col gap-1">
                  <span className="text-zinc-600 font-bold text-[10px] uppercase tracking-widest">Ubicación</span>
                  <span className="text-white font-bold italic tracking-wide">Puerto Madero, Buenos Aires</span>
               </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-zinc-600 text-[10px] font-bold uppercase tracking-[0.4em]">
            © {currentYear} ForceGym Performance Club. Todos los derechos reservados.
          </p>
          <div className="flex gap-8">
             <Link href="#" className="text-zinc-600 hover:text-white transition-colors text-[10px] font-bold uppercase tracking-[0.4em]">Privacidad</Link>
             <Link href="#" className="text-zinc-600 hover:text-white transition-colors text-[10px] font-bold uppercase tracking-[0.4em]">Términos</Link>
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
