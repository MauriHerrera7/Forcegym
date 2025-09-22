import Image from 'next/image';
import RegisterForm from '../components/register-form/RegisterForm';

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gray-900 grid grid-cols-1 lg:grid-cols-2 pt-16">
      {/* Panel izquierdo - Imagen (50% exacto) */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/20 to-black/40 z-10" />
        <Image
          src="https://res.cloudinary.com/dry6dvzoj/image/upload/v1758478009/imagen-realista-de-persona-haciendo-ejercicio-en-g_1_yc3fzm.png"
          alt="Gimnasio ForceGym"
          fill
          className="object-cover"
          priority
          sizes="50vw"
        />
        
        {/* Overlay con texto motivacional */}
        <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-white p-12">
          <div className="text-center max-w-md">
            <h1 className="text-4xl font-bold mb-4 text-white drop-shadow-lg">
              Transforma tu vida
            </h1>
            <p className="text-xl text-gray-200 drop-shadow-md leading-relaxed">
              Únete a la comunidad ForceGym y alcanza tus objetivos fitness con el mejor entrenamiento y apoyo profesional.
            </p>
            <div className="mt-8 space-y-2">
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-200">Planes personalizados</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-200">Entrenadores certificados</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-200">Seguimiento de progreso</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Panel derecho - Formulario (50% exacto) */}
      <div className="flex items-center justify-center p-6 lg:p-8 bg-gray-900 min-h-[calc(100vh-4rem)] overflow-y-auto">
        <div className="w-full max-w-md">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
