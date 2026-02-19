import Image from 'next/image';
import RegisterForm from '../components/register-form/RegisterForm';

export default function RegisterPage() {
  return (
    <div className="h-screen bg-black flex flex-col lg:flex-row overflow-hidden">
      {/* Visual Side (Left) */}
      <div className="relative w-full lg:w-1/2 h-1/2 lg:h-full overflow-hidden">
        <Image
          src="https://res.cloudinary.com/dry6dvzoj/image/upload/v1757706700/home6_ja69rw.png"
          alt="Technical Fitness Evolution"
          fill
          className="object-cover"
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        {/* Gradients for mobile/desktop harmony */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent lg:hidden" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent lg:hidden" />
      </div>

      {/* Form Side (Right) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-black p-4 lg:p-12 animate-in fade-in slide-in-from-right-8 duration-700 overflow-y-auto">
        <div className="w-full max-w-md">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
