'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Hero from "./home/Hero";
import Container from "@/components/Container";
import Link from 'next/link';
import { Footer } from '@/components/layout/Footer';

export default function Home() {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-up');
    fadeElements.forEach((el) => observer.observe(el));

    return () => {
      fadeElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <main className="min-h-screen overflow-x-hidden bg-black">
      <Hero />

      {/* Services Section */}
      <section className="section-padding bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <Container>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20 fade-up">
              <h2 className="text-5xl md:text-7xl lg:text-8xl text-white mb-6 text-gradient">
                NUESTROS SERVICIOS
              </h2>
              <div className="accent-line"></div>
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                <strong>Transforma tu cuerpo</strong> con nuestros servicios de élite diseñados para llevarte al siguiente nivel
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Musculación */}
              <div className="fade-up bg-gray-900/50 border border-gray-700 rounded-2xl p-8 scale-hover hover:border-red-500 transition-all duration-300 backdrop-blur-sm">
                <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29l-1.43-1.43z" />
                  </svg>
                </div>
                <h3 className="text-2xl md:text-3xl text-white mb-4 text-motivational">MUSCULACIÓN</h3>
                <p className="text-gray-300 leading-relaxed mb-6">
                  Equipos de última generación para <strong>desarrollar masa muscular</strong> y fuerza funcional con la guía de expertos.
                </p>
                <ul className="text-gray-400 space-y-2">
                  <li>• Pesas libres y máquinas Technogym</li>
                  <li>• Programas personalizados</li>
                  <li>• Seguimiento de progreso</li>
                </ul>
              </div>

              {/* Cardio */}
              <div className="fade-up bg-gray-900/50 border border-gray-700 rounded-2xl p-8 scale-hover hover:border-red-500 transition-all duration-300 backdrop-blur-sm">
                <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl md:text-3xl text-white mb-4 text-motivational">CARDIO EXTREMO</h3>
                <p className="text-gray-300 leading-relaxed mb-6">
                  <strong>Quema grasa</strong> y mejora tu resistencia cardiovascular con nuestras estaciones de cardio premium.
                </p>
                <ul className="text-gray-400 space-y-2">
                  <li>• Cintas con pantalla táctil</li>
                  <li>• Bicicletas spinning profesionales</li>
                  <li>• Clases grupales HIIT</li>
                </ul>
              </div>

              {/* Crossfit */}
              <div className="fade-up bg-gray-900/50 border border-gray-700 rounded-2xl p-8 scale-hover hover:border-red-500 transition-all duration-300 backdrop-blur-sm">
                <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z" />
                  </svg>
                </div>
                <h3 className="text-2xl md:text-3xl text-white mb-4 text-motivational">CROSSFIT</h3>
                <p className="text-gray-300 leading-relaxed mb-6">
                  <strong>Entrena como un atleta</strong> con workouts funcionales que desafían todos tus límites físicos.
                </p>
                <ul className="text-gray-400 space-y-2">
                  <li>• Box dedicado con kettlebells</li>
                  <li>• Barras olímpicas y bumper plates</li>
                  <li>• Coaching certificado Level 1</li>
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Stats/Progress Tracking Section */}
      <section className="section-padding bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <Container>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20 fade-up">
              <h2 className="text-5xl md:text-7xl lg:text-8xl text-white mb-6">
                LLEVA TU <span className="text-gradient">PROGRESO</span>
              </h2>
              <div className="accent-line"></div>
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                <strong>Monitorea tu evolución</strong> con nuestro sistema de seguimiento de progreso. Registra tus entrenamientos, mide tus logros y alcanza tus metas.
              </p>
            </div>

            {/* Visual Charts Grid */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {/* Chart 1: Weight Progress */}
              <div className="fade-up bg-gray-900/50 border border-gray-700 rounded-2xl p-8 scale-hover hover:border-red-500 transition-all duration-300 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl text-white font-bold">📈 Progreso de Peso</h3>
                  <span className="text-green-400 font-semibold">-8kg</span>
                </div>
                <div className="relative h-48 flex items-end justify-between gap-2">
                  {[85, 83, 82, 80, 79, 78, 77].map((value, index) => {
                    const maxValue = 85;
                    const minValue = 77;
                    const range = maxValue - minValue;
                    const heightPercentage = ((maxValue - value) / range) * 80 + 20;

                    return (
                      <div key={index} className="flex-1 flex flex-col items-center">
                        <div
                          className="w-full bg-gradient-to-t from-red-600 to-orange-500 rounded-t-lg transition-all duration-500 hover:from-red-500 hover:to-orange-400"
                          style={{ height: `${heightPercentage}%` }}
                        ></div>
                        <span className="text-xs text-gray-400 mt-2">S{index + 1}</span>
                      </div>
                    );
                  })}
                </div>
                <p className="text-gray-400 text-sm mt-4 text-center">Últimas 7 semanas</p>
              </div>

              {/* Chart 2: Workout Frequency */}
              <div className="fade-up bg-gray-900/50 border border-gray-700 rounded-2xl p-8 scale-hover hover:border-red-500 transition-all duration-300 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl text-white font-bold">🔥 Entrenamientos</h3>
                  <span className="text-blue-400 font-semibold">24/mes</span>
                </div>
                <div className="relative h-48">
                  <svg className="w-full h-full" viewBox="0 0 200 100">
                    <defs>
                      <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#06b6d4" />
                      </linearGradient>
                    </defs>
                    <polyline
                      fill="none"
                      stroke="url(#lineGradient)"
                      strokeWidth="3"
                      points="0,80 30,70 60,65 90,50 120,45 150,35 180,30 200,25"
                    />
                    {[0, 30, 60, 90, 120, 150, 180, 200].map((x, i) => (
                      <circle
                        key={i}
                        cx={x}
                        cy={[80, 70, 65, 50, 45, 35, 30, 25][i]}
                        r="4"
                        fill="#3b82f6"
                        className="hover:r-6 transition-all"
                      />
                    ))}
                  </svg>
                </div>
                <p className="text-gray-400 text-sm mt-4 text-center">Tendencia creciente</p>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {[
                {
                  icon: "📊",
                  title: "ESTADÍSTICAS",
                  description: "Visualiza tu progreso con gráficos detallados",
                  color: "from-blue-500 to-cyan-500"
                },
                {
                  icon: "🎯",
                  title: "METAS",
                  description: "Establece objetivos personalizados",
                  color: "from-purple-500 to-pink-500"
                },
                {
                  icon: "💪",
                  title: "ANÁLISIS",
                  description: "Insights sobre tu rendimiento",
                  color: "from-orange-500 to-red-500"
                },
                {
                  icon: "🏆",
                  title: "LOGROS",
                  description: "Celebra cada hito alcanzado",
                  color: "from-green-500 to-emerald-500"
                }
              ].map((stat, index) => (
                <div key={index} className="fade-up bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl p-6 text-center scale-hover hover:border-red-500 transition-all duration-300">
                  <div className="text-5xl mb-4">{stat.icon}</div>
                  <h3 className="text-xl md:text-2xl text-white mb-3 text-motivational">{stat.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{stat.description}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Schedule Section */}
      <section className="section-padding bg-black">
        <Container>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20 fade-up">
              <h2 className="text-5xl md:text-7xl lg:text-8xl text-white mb-6">
                HORARIOS <span className="text-gradient">24/7</span>
              </h2>
              <div className="accent-line"></div>
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
                <strong>Entrena cuando quieras.</strong> Nuestras instalaciones están disponibles las 24 horas para miembros premium.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { day: "LUNES - VIERNES", hours: "05:00 - 24:00", type: "Horario Extendido" },
                { day: "SÁBADOS", hours: "06:00 - 22:00", type: "Fin de Semana" },
                { day: "DOMINGOS", hours: "08:00 - 20:00", type: "Relajado" },
                { day: "24/7 PREMIUM", hours: "Siempre Abierto", type: "Acceso Total" }
              ].map((schedule, index) => (
                <div key={index} className="fade-up bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl p-6 text-center scale-hover hover:border-red-500 transition-all duration-300">
                  <h3 className="text-xl md:text-2xl text-white mb-3 text-motivational">{schedule.day}</h3>
                  <div className="text-3xl md:text-4xl font-black text-gradient mb-2">{schedule.hours}</div>
                  <p className="text-gray-400 text-sm uppercase tracking-wide">{schedule.type}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <Container>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20 fade-up">
              <h2 className="text-5xl md:text-7xl lg:text-8xl text-white mb-6">
                TESTIMONIOS <span className="text-gradient">REALES</span>
              </h2>
              <div className="accent-line"></div>
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
                <strong>Resultados que hablan por sí solos.</strong> Conoce las historias de transformación de nuestros miembros.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "María González",
                  result: "Perdió 15kg en 4 meses",
                  quote: "ForceGym cambió mi vida completamente. Los entrenadores son increíbles y las instalaciones son de primera clase.",
                  image: "https://res.cloudinary.com/dry6dvzoj/image/upload/v1757739343/mariagonzales_bdbtj2.png"
                },
                {
                  name: "Carlos Ramírez",
                  result: "Ganó 8kg de masa muscular",
                  quote: "Nunca pensé que podría ver estos resultados. El plan personalizado fue clave para mi transformación.",
                  image: "https://res.cloudinary.com/dry6dvzoj/image/upload/v1757739337/carlosramirez_nchcbg.png"
                },
                {
                  name: "Ana Martín",
                  result: "Completó su primer CrossFit Open",
                  quote: "Llegué sin saber nada de CrossFit y ahora compito a nivel regional. El apoyo del equipo es incomparable.",
                  image: "https://res.cloudinary.com/dry6dvzoj/image/upload/v1757739333/anamartin_s2u72f.png"
                }
              ].map((testimonial, index) => (
                <div key={index} className="fade-up bg-gray-900/50 border border-gray-700 rounded-2xl p-8 scale-hover hover:border-red-500 transition-all duration-300 backdrop-blur-sm">
                  <div className="flex justify-center mb-6">
                    <Image
                      src={testimonial.image}
                      alt={`Foto de perfil de ${testimonial.name}`}
                      width={80}
                      height={80}
                      className="rounded-full object-cover border-2 border-red-500"
                    />
                  </div>
                  <h4 className="text-xl text-white mb-2 text-motivational text-center">{testimonial.name}</h4>
                  <p className="text-red-400 font-semibold mb-4 uppercase text-sm tracking-wide text-center">{testimonial.result}</p>
                  <p className="text-gray-300 italic leading-relaxed text-center">&ldquo;{testimonial.quote}&rdquo;</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-black">
        <Container>
          <div className="max-w-4xl mx-auto text-center fade-up">
            <h2 className="text-impact text-5xl md:text-7xl lg:text-8xl text-white mb-8">
              ¿LISTO PARA EL CAMBIO?
            </h2>
            <p className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed">
              No esperes más. <strong>Tu transformación comienza HOY.</strong> Únete a la familia ForceGym y descubre de qué estás hecho.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/auth/register"
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl text-lg font-bold uppercase tracking-wide transition-all duration-300 scale-hover text-center"
              >
                COMENZAR AHORA
              </Link>
              <Link
                href="/auth/login"
                className="border-2 border-white hover:bg-white hover:text-black text-white px-8 py-4 rounded-xl text-lg font-bold uppercase tracking-wide transition-all duration-300 scale-hover text-center"
              >
                INICIAR SESIÓN
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
