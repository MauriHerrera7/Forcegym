'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { CheckCircle2, XCircle, User, CreditCard, Calendar, Mail, IdCard } from 'lucide-react';

interface VerificationData {
  full_name: string;
  dni: string;
  email: string;
  profile_picture_url: string;
  plan_name: string;
  status: string;
  status_display: string;
  end_date: string;
}

export default function VerifyMemberPage() {
  const params = useParams();
  const token = params.token as string;
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<VerificationData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await fetch(`${API_URL}/api/memberships/verify/${token}/`);
        if (!response.ok) {
          throw new Error('Membresía no encontrada o token inválido');
        }
        const result = await response.json();
        setData(result);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      verifyToken();
    }
  }, [token, API_URL]);

  const getSafePhoto = (url: string | null) => {
    if (!url) return null;
    if (url.startsWith('http')) return url;
    return `${API_URL}${url}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-zinc-900 border-zinc-800">
          <CardHeader className="text-center">
            <Skeleton className="h-10 w-48 mx-auto bg-zinc-800" />
          </CardHeader>
          <CardContent className="space-y-6">
            <Skeleton className="h-32 w-32 rounded-full mx-auto bg-zinc-800" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-full bg-zinc-800" />
              <Skeleton className="h-4 w-2/3 mx-auto bg-zinc-800" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-zinc-900 border-zinc-800 overflow-hidden">
          <div className="h-2 bg-red-600" />
          <CardContent className="pt-10 pb-10 text-center space-y-4">
            <XCircle className="h-20 w-20 text-red-500 mx-auto" />
            <CardTitle className="text-2xl text-white font-bold">Error de Verificación</CardTitle>
            <p className="text-zinc-400">{error || 'No se pudo validar la información.'}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const isActive = data.status === 'ACTIVE';

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 sm:p-8">
      <Card className="w-full max-w-md bg-[#1c1c1e] border-zinc-800 shadow-2xl relative overflow-hidden group">
        {/* Status Bar Indicator */}
        <div className={`h-3 w-full ${isActive ? 'bg-green-500' : 'bg-red-500'} transition-all duration-500`} />
        
        {/* Glow Effects */}
        <div className={`absolute -top-24 -left-24 w-48 h-48 rounded-full blur-[100px] opacity-20 ${isActive ? 'bg-green-500' : 'bg-red-500'}`} />
        
        <CardHeader className="text-center pt-8 pb-4 relative">
          <div className="flex justify-center mb-6">
            <div className={`relative p-1 rounded-full border-2 ${isActive ? 'border-green-500/50' : 'border-red-500/50'} group-hover:scale-105 transition-transform duration-500`}>
              <div className="relative h-32 w-32 rounded-full overflow-hidden bg-zinc-800 border-4 border-black">
                {data.profile_picture_url ? (
                  <Image
                    src={getSafePhoto(data.profile_picture_url) || ''}
                    alt={data.full_name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center bg-zinc-900">
                    <User className="h-16 w-16 text-zinc-700" />
                  </div>
                )}
              </div>
              {isActive && (
                <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1.5 border-4 border-[#1c1c1e]">
                  <CheckCircle2 className="h-5 w-5 text-white" />
                </div>
              )}
            </div>
          </div>
          
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-white tracking-tight leading-tight">
              {data.full_name}
            </h1>
            <div className="flex items-center justify-center gap-2">
              <Badge 
                variant={isActive ? "default" : "destructive"}
                className={`px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${isActive ? 'bg-green-500/10 text-green-500 border-green-500/20' : ''}`}
              >
                {data.status_display}
              </Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 pt-4 pb-10 px-8 relative">
          <div className="grid grid-cols-1 gap-5">
            {/* Info Items */}
            <div className="flex items-center gap-4 bg-black/40 p-3.5 rounded-2xl border border-zinc-800/50 transition-colors hover:bg-black/60">
              <div className="h-10 w-10 rounded-xl bg-zinc-800 flex items-center justify-center shrink-0">
                <Mail className="h-5 w-5 text-zinc-400" />
              </div>
              <div className="space-y-0.5">
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Correo Electrónico</p>
                <p className="text-zinc-200 text-sm font-medium truncate max-w-[240px]">{data.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-black/40 p-3.5 rounded-2xl border border-zinc-800/50 transition-colors hover:bg-black/60">
              <div className="h-10 w-10 rounded-xl bg-zinc-800 flex items-center justify-center shrink-0">
                <IdCard className="h-5 w-5 text-zinc-400" />
              </div>
              <div className="space-y-0.5">
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">DNI / Identificación</p>
                <p className="text-zinc-200 text-sm font-medium">{data.dni || 'No proporcionado'}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-black/40 p-3.5 rounded-2xl border border-zinc-800/50 transition-colors hover:bg-black/60">
              <div className="h-10 w-10 rounded-xl bg-zinc-800 flex items-center justify-center shrink-0">
                <CreditCard className="h-5 w-5 text-zinc-400" />
              </div>
              <div className="space-y-0.5">
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Tipo de Membresía</p>
                <p className="text-zinc-200 text-sm font-medium">{data.plan_name}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-black/40 p-3.5 rounded-2xl border border-zinc-800/50 transition-colors hover:bg-black/60">
              <div className="h-10 w-10 rounded-xl bg-zinc-800 flex items-center justify-center shrink-0">
                <Calendar className="h-5 w-5 text-zinc-400" />
              </div>
              <div className="space-y-0.5">
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Fecha de Vencimiento</p>
                <p className="text-zinc-200 text-sm font-medium">
                  {new Date(data.end_date).toLocaleDateString('es-AR', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </div>

          <div className="pt-6 relative">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
            <p className="text-center text-[11px] text-zinc-600 font-medium italic">
              Credential validada en tiempo real por Force Gym System
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
