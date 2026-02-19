import Image from 'next/image';
import LoginForm from '../components/login-form/LoginForm';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-black flex flex-col lg:flex-row">
      {/* Visual Side (Left) */}
      <div className="relative w-full lg:w-1/2 h-[40vh] lg:h-screen overflow-hidden">
        <Image
          src="https://res.cloudinary.com/dry6dvzoj/image/upload/v1771376937/24_7_FITNESS_CI_YUAN_CC___24_7_Fitness___24_7_Fitness_Gym_in_Singapore_omader.jpg"
          alt="Force Gym Experience"
          fill
          className="object-cover"
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent lg:hidden" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent lg:hidden" />
      </div>

      {/* Form Side (Right) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12 animate-in fade-in slide-in-from-right-8 duration-700">
        <LoginForm />
      </div>
    </div>
  );
}
