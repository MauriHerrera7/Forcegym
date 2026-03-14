'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { fetchApi } from '@/lib/api';
import { useAuthContext } from '@/providers/AuthProvider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  CheckCircle2, 
  XCircle, 
  User, 
  IdCard, 
  Calendar, 
  Clock, 
  ArrowLeft,
  Loader2,
  AlertTriangle
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface VerificationData {
  id: string;
  full_name: string;
  dni: string;
  is_active: boolean;
  profile_picture_url: string | null;
  membership: {
    plan_name: string;
    status: string;
    end_date: string;
    days_remaining: number;
  } | null;
}

export default function AdminVerifyPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { user, loading: authLoading, isAuthenticated } = useAuthContext();
  
  const [data, setData] = useState<VerificationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Redirigir si no está autenticado o no es admin
    if (!authLoading) {
      if (!isAuthenticated) {
        router.push('/auth/login');
        return;
      }
      if (user?.role?.toUpperCase() !== 'ADMIN') {
        setError('Acceso denegado. Esta página es exclusiva para administradores.');
        setLoading(false);
        return;
      }
    }

    const verifyUser = async () => {
      try {
        setLoading(true);
        const response = await fetchApi(`/users/${id}/verify_access/`);
        setData(response);
      } catch (err: any) {
        console.error('Verification error:', err);
        setError(err.message || 'Error al verificar el usuario.');
      } finally {
        setLoading(false);
      }
    };

    if (id && !authLoading && user?.role?.toUpperCase() === 'ADMIN') {
      verifyUser();
    }
  }, [id, authLoading, user, isAuthenticated, router]);

  if (authLoading || (loading && !error)) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
        <Loader2 className="h-12 w-12 text-[#ff0400] animate-spin mb-4" />
        <p className="text-gray-400 font-bold animate-pulse">VERIFICANDO CREDENCIALES...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 text-center">
        <Alert variant="destructive" className="bg-red-500/10 border-red-500/20 p-8 rounded-3xl max-w-md [&>svg]:text-red-500">
          <AlertTriangle className="h-16 w-16 mx-auto mb-4 relative" />
          <h1 className="text-2xl font-black text-white italic uppercase mb-2">ERROR DE VERIFICACIÓN</h1>
          <AlertDescription className="text-gray-400 mb-6">{error || 'No se pudo obtener la información del usuario.'}</AlertDescription>
          <Button 
            onClick={() => router.back()}
            className="bg-white text-black hover:bg-zinc-200 font-black uppercase tracking-widest px-8"
          >
            Volver
          </Button>
        </Alert>
      </div>
    );
  }

  const isAccessGranted = data.is_active && data.membership?.status === 'ACTIVE' && data.membership?.days_remaining > 0;
  const initials = data.full_name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Header con botón volver */}
        <div className="flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={() => router.back()}
            className="text-gray-400 hover:text-white"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Panel de Control
          </Button>
          <div className="text-right">
            <p className="text-[10px] text-zinc-500 font-black uppercase tracking-[0.2em]">Force Gym Control</p>
            <p className="text-xs text-zinc-400 font-bold">Verificación de Acceso</p>
          </div>
        </div>

        {/* Status Indicator */}
        <div className={cn(
          "relative overflow-hidden rounded-3xl p-8 border-2 transition-all duration-500 shadow-2xl",
          isAccessGranted 
            ? "bg-green-500/5 border-green-500/20 shadow-green-500/10" 
            : "bg-red-500/5 border-red-500/20 shadow-red-500/10"
        )}>
          {/* Background Glow */}
          <div className={cn(
            "absolute -top-24 -right-24 w-64 h-64 rounded-full blur-[100px] opacity-20",
            isAccessGranted ? "bg-green-500" : "bg-red-500"
          )} />

          <div className="relative z-10 flex flex-col items-center text-center gap-6">
            <div className={cn(
              "h-24 w-24 rounded-full flex items-center justify-center",
              isAccessGranted ? "bg-green-500" : "bg-red-500"
            )}>
              {isAccessGranted ? (
                <CheckCircle2 className="h-14 w-14 text-black" />
              ) : (
                <XCircle className="h-14 w-14 text-black" />
              )}
            </div>

            <div className="space-y-2">
              <h1 className={cn(
                "text-4xl md:text-6xl font-black italic uppercase tracking-tighter leading-none",
                isAccessGranted ? "text-green-500" : "text-red-500"
              )}>
                {isAccessGranted ? 'ACCESO PERMITIDO' : 'ACCESO DENEGADO'}
              </h1>
              <p className="text-zinc-400 font-bold uppercase tracking-widest text-sm">
                {isAccessGranted ? 'Socio con membresía activa' : 'Verificar estado de cuenta'}
              </p>
            </div>
          </div>
        </div>

        {/* User Card */}
        <Card className="bg-[#111] border-zinc-800 overflow-hidden">
          <CardContent className="p-0">
            <div className="flex flex-col md:flex-row">
              {/* Photo Section */}
              <div className="w-full md:w-48 h-48 md:h-auto relative bg-zinc-900">
                <Avatar className="h-full w-full rounded-none">
                  <AvatarImage src={data.profile_picture_url || ''} className="object-cover" />
                  <AvatarFallback className="bg-zinc-900 text-6xl font-black italic text-zinc-800">
                    {initials}
                  </AvatarFallback>
                </Avatar>
              </div>

              {/* Info Section */}
              <div className="flex-1 p-6 space-y-6">
                <div>
                  <h2 className="text-2xl font-black italic uppercase tracking-tight text-white leading-none mb-1">
                    {data.full_name}
                  </h2>
                  <div className="flex items-center gap-2 text-zinc-500">
                    <IdCard className="h-4 w-4" />
                    <span className="text-sm font-bold">DNI: {data.dni || 'No registrado'}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-zinc-900/50 rounded-2xl p-4 border border-zinc-800/50">
                    <div className="flex items-center gap-2 text-zinc-500 mb-1">
                      <Calendar className="h-4 w-4" />
                      <span className="text-[10px] font-black uppercase tracking-widest">Plan</span>
                    </div>
                    <p className="text-sm font-bold text-white uppercase italic">
                      {data.membership?.plan_name || 'Sin Plan'}
                    </p>
                  </div>

                  <div className="bg-zinc-900/50 rounded-2xl p-4 border border-zinc-800/50">
                    <div className="flex items-center gap-2 text-zinc-500 mb-1">
                      <Clock className="h-4 w-4" />
                      <span className="text-[10px] font-black uppercase tracking-widest">Vence</span>
                    </div>
                    <p className="text-sm font-bold text-white">
                      {data.membership?.end_date || 'N/A'}
                    </p>
                  </div>
                </div>

                {data.membership && (
                  <div className={cn(
                    "rounded-2xl p-4 flex items-center justify-between",
                    isAccessGranted ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
                  )}>
                    <span className="text-xs font-black uppercase tracking-widest">Días Restantes</span>
                    <span className="text-2xl font-black italic">{data.membership.days_remaining}</span>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button 
            variant="outline"
            onClick={() => router.push(`/admin/users/${data.id}`)}
            className="border-zinc-800 hover:bg-zinc-900 text-white font-black uppercase tracking-widest h-14 rounded-2xl"
          >
            Ver Perfil Completo
          </Button>
          <Button 
            onClick={() => router.back()}
            className="bg-[#ff0400] hover:bg-red-700 text-white font-black uppercase tracking-widest h-14 rounded-2xl shadow-lg shadow-red-500/20"
          >
            Siguiente Escaneo
          </Button>
        </div>
      </div>
    </div>
  );
}
