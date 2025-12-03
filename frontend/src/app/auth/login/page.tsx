import Image from 'next/image';
import LoginForm from '../components/login-form/LoginForm';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Lado izquierdo - Formulario */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-900 min-h-screen">
        <div className="w-full max-w-md py-8">
          <LoginForm />
        </div>
      </div>

      {/* Lado derecho - Imagen */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-black/20 to-black/40 z-10" />
        <Image
          src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Gimnasio ForceGym"
          fill
          className="object-cover"
          priority
          sizes="(max-width: 1024px) 0vw, 50vw"
        />

        {/* Overlay con texto motivacional */}
        <div className="absolute inset-0 z-20 flex flex-col justify-center items-center p-12">
          <div className="text-center max-w-md bg-black/60 backdrop-blur-md p-8 rounded-2xl border border-white/10">
            <h1 className="text-4xl font-bold mb-4 text-white">
              Bienvenido de vuelta
            </h1>
            <p className="text-xl text-white/90 leading-relaxed">
              Continúa tu viaje fitness y alcanza nuevas metas con ForceGym.
            </p>
            <div className="mt-8 space-y-2">
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-white font-medium">Acceso a tus rutinas</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-white font-medium">Seguimiento de progreso</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-white font-medium">Comunidad fitness</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
