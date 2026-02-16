import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ClientMembershipsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Mis Membresías</h1>
        <p className="text-gray-400">Gestiona tu membresía activa</p>
      </div>

      {/* Active Membership */}
      <Card className="bg-[#191919] border-[#404040]">
        <CardHeader>
          <CardTitle className="text-white">Membresía Activa</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-primary">Plan Premium</h3>
              <p className="text-gray-400">Acceso 24/7 + Clases Grupales</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400">Vence el</p>
              <p className="text-lg font-semibold text-white">15 Mar 2026</p>
            </div>
          </div>

          <div className="rounded-lg bg-dark p-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <p className="text-sm text-gray-400">Precio Mensual</p>
                <p className="text-xl font-bold text-white">$49.99</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Días Restantes</p>
                <p className="text-xl font-bold text-green-500">28</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Estado</p>
                <p className="text-xl font-bold text-green-500">Activa</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Membership History */}
      <Card className="bg-[#191919] border-[#404040]">
        <CardHeader>
          <CardTitle className="text-white">Historial de Membresías</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-gray-700 pb-3">
              <div>
                <p className="font-medium text-white">Plan Premium</p>
                <p className="text-sm text-gray-400">15 Feb 2026 - 15 Mar 2026</p>
              </div>
              <span className="text-green-500">Activa</span>
            </div>
            <div className="flex items-center justify-between border-b border-gray-700 pb-3">
              <div>
                <p className="font-medium text-white">Plan Básico</p>
                <p className="text-sm text-gray-400">15 Ene 2026 - 15 Feb 2026</p>
              </div>
              <span className="text-gray-500">Expirada</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
