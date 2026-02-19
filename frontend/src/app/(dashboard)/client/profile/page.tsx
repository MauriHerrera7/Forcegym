'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Pencil, Save, X } from 'lucide-react';
import QRCode from 'qrcode';
import { QRCodeSVG } from 'qrcode.react';
import { useEffect, useRef } from 'react';

export default function ClientProfile() {
  const [formData, setFormData] = useState({
    name: 'Cliente Usuario',
    email: 'cliente@forcegym.com',
    dni: '12345678',
    birthDate: '1990-01-01',
    weight: '75',
    height: '175',
  });
  const [photo, setPhoto] = useState<string | undefined>(undefined);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const modalCanvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Generate QR Code
  useEffect(() => {
    const generateQR = async () => {
      try {
        const userId = 'USER-12345';
        const qrData = `FORCEGYM-${userId}`;
        
        // Small QR for card
        if (canvasRef.current) {
          await QRCode.toCanvas(canvasRef.current, qrData, {
            width: 200,
            margin: 2,
            color: {
              dark: '#ff0400',
              light: '#ffffff',
            },
          });
        }
        
        // Generate data URL for modal
        const url = await QRCode.toDataURL(qrData, {
          width: 400,
          margin: 2,
          color: {
            dark: '#ff0400',
            light: '#ffffff',
          },
        });
        setQrCodeUrl(url);
      } catch (err) {
        console.error('Error generating QR code:', err);
      }
    };

    generateQR();
  }, []);

  // Generate large QR for modal when opened
  useEffect(() => {
    if (isQRModalOpen && modalCanvasRef.current) {
      const generateLargeQR = async () => {
        try {
          const userId = 'USER-12345';
          const qrData = `FORCEGYM-${userId}`;
          
          await QRCode.toCanvas(modalCanvasRef.current!, qrData, {
            width: 600,
            margin: 3,
            color: {
              dark: '#ff0400',
              light: '#ffffff',
            },
          });
        } catch (err) {
          console.error('Error generating large QR code:', err);
        }
      };
      
      generateLargeQR();
    }
  }, [isQRModalOpen]);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Saving profile:', formData);
    alert('Perfil actualizado correctamente!');
  };

  const initials = formData.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Mi Perfil</h1>
        <p className="text-gray-400">Administra tu información personal</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile Form */}
        <div className="lg:col-span-2">
          <Card className="bg-[#191919] border-[#404040]">
            <CardHeader>
              <CardTitle className="text-white">Información Personal</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Photo Upload with Preview */}
                <div className="flex items-center gap-6">
                  <div className="relative group">
                    <Avatar className="h-32 w-32 ring-4 ring-[#404040] transition-all group-hover:ring-[#ff0400]">
                      <AvatarImage src={photo} alt={formData.name} className="object-cover" />
                      <AvatarFallback className="bg-[#ff0400] text-white text-3xl font-bold">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute bottom-0 right-0 rounded-full bg-[#ff0400] p-2.5 text-white shadow-lg transition-transform hover:scale-110 hover:bg-[#ff3936]"
                      title="Editar foto"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{formData.name}</h3>
                    <p className="text-sm text-gray-400">{formData.email}</p>
                    <p className="mt-2 text-xs text-gray-500">
                      Haz clic en el ícono de lápiz para cambiar tu foto
                    </p>
                    <p className="text-xs text-gray-500">
                      JPG, PNG o GIF (MAX. 2MB)
                    </p>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-300">
                      Nombre Completo
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="bg-[#191919] border-[#404040] text-white focus:border-[#ff0400]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-300">
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="bg-[#191919] border-[#404040] text-white focus:border-[#ff0400]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dni" className="text-gray-300">
                      DNI
                    </Label>
                    <Input
                      id="dni"
                      name="dni"
                      value={formData.dni}
                      onChange={handleInputChange}
                      className="bg-[#191919] border-[#404040] text-white focus:border-[#ff0400]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="birthDate" className="text-gray-300">
                      Fecha de Nacimiento
                    </Label>
                    <Input
                      id="birthDate"
                      name="birthDate"
                      type="date"
                      value={formData.birthDate}
                      onChange={handleInputChange}
                      className="bg-[#191919] border-[#404040] text-white focus:border-[#ff0400]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="weight" className="text-gray-300">
                      Peso (kg) - Opcional
                    </Label>
                    <Input
                      id="weight"
                      name="weight"
                      type="number"
                      value={formData.weight}
                      onChange={handleInputChange}
                      className="bg-[#191919] border-[#404040] text-white focus:border-[#ff0400]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="height" className="text-gray-300">
                      Altura (cm) - Opcional
                    </Label>
                    <Input
                      id="height"
                      name="height"
                      type="number"
                      value={formData.height}
                      onChange={handleInputChange}
                      className="bg-[#191919] border-[#404040] text-white focus:border-[#ff0400]"
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full gap-2 bg-[#404040] hover:bg-[#ff0400] text-white transition-all duration-300">
                  <Save className="h-4 w-4" />
                  Guardar Cambios
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* QR Code Card */}
        <div className="lg:col-span-1">
          <Card className="bg-[#191919] border-[#404040]">
            <CardHeader>
              <CardTitle className="text-white">Código QR</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              <button
                onClick={() => setIsQRModalOpen(true)}
                className="rounded-lg bg-white p-4 transition-transform hover:scale-105 cursor-pointer"
                title="Click para ver en grande"
              >
                <canvas ref={canvasRef} />
              </button>
              <p className="text-center text-sm text-gray-400">
                Haz clic en el código QR para verlo en grande
              </p>
              <p className="text-center text-xs text-gray-500">
                Usa este código para acceder al gimnasio
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* QR Modal */}
      <Dialog open={isQRModalOpen} onOpenChange={setIsQRModalOpen}>
        <DialogContent className="bg-[#191919] border-none sm:max-w-md p-0 overflow-hidden shadow-2xl">
          <DialogHeader className="p-6 bg-[#111111] border-b border-[#404040] relative">
            <DialogTitle className="text-white text-center text-xl font-bold uppercase tracking-wider">
              Tu Código QR de Acceso
            </DialogTitle>
            <DialogClose className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-2 text-gray-400 hover:bg-[#404040] hover:text-white transition-all">
              <X className="h-6 w-6" />
            </DialogClose>
          </DialogHeader>
          
          <div className="flex flex-col items-center gap-8 p-10 bg-[#191919]">
            <div className="rounded-2xl bg-white p-6 shadow-[0_0_50px_rgba(255,4,0,0.15)] flex items-center justify-center">
              <QRCodeSVG 
                value={`FORCEGYM-USER-12345`} 
                size={280}
                level="H"
                includeMargin={true}
              />
            </div>
            
            <div className="text-center space-y-3">
              <p className="text-lg text-gray-200 font-medium">
                Escanea este código en la entrada
              </p>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#ff0400]/10 text-[#ff0400] text-sm font-bold border border-[#ff0400]/20">
                ID: USER-12345
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
