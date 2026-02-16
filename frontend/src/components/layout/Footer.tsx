import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-dark border-t border-dark-soft">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Logo & Description */}
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-3xl font-black text-primary">FORCEGYM</h2>
            <p className="mt-4 text-gray-400">
              Tu gimnasio de élite. Transforma tu cuerpo y mente con nuestras
              instalaciones de primera clase y entrenadores profesionales.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white">Enlaces Rápidos</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-gray-400 transition-colors hover:text-primary"
                >
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link
                  href="/memberships"
                  className="text-gray-400 transition-colors hover:text-primary"
                >
                  Membresías
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 transition-colors hover:text-primary"
                >
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white">Contacto</h3>
            <ul className="mt-4 space-y-2 text-gray-400">
              <li>📍 Dirección del Gimnasio</li>
              <li>📞 +54 123 456 7890</li>
              <li>✉️ info@forcegym.com</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-dark-soft pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} ForceGym. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
