'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { QRCodeSVG } from 'qrcode.react'
import DeleteAccountModal from '@/components/DeleteAccountModal'
import QRModal from '@/components/QRModal'
import { useAuthContext } from '@/providers/AuthProvider'
import { useMembership } from '@/hooks/useMembership'
import { useProgress } from '@/hooks/useProgress'

interface UserData {
  id: string
  first_name: string
  last_name: string
  email: string
  image?: string
  membershipType: string
  membershipStatus: 'active' | 'expired' | 'pending' | 'cancelled' | 'suspended'
  lastCheckIn?: string
  joinDate: string
  nextPayment?: string
  height: number
  weight: number
  objective: string
  activityLevel: string
  stats?: {
    weightChange: string | null
    totalWorkouts: number
    completedWorkouts: number
    totalTime: number
  }
}

interface EditableData {
  first_name: string
  last_name: string
  email: string
  height: string
  weight: string
  objective: string
  activityLevel: string
}

export default function DashboardPage() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isQRModalOpen, setIsQRModalOpen] = useState(false)
  const [isDeletingAccount, setIsDeletingAccount] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { user, deleteAccount, loading: authLoading, updateProfile } = useAuthContext()
  const { activeMembership, checkIns, loading: membershipLoading } = useMembership()
  const { summary, loading: progressLoading } = useProgress()
  
  const [editedData, setEditedData] = useState<EditableData>({
    first_name: '',
    last_name: '',
    email: '',
    height: '',
    weight: '',
    objective: '',
    activityLevel: ''
  })

  useEffect(() => {
    if (user) {
      setEditedData({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        email: user.email || '',
        height: user.height?.toString() || '',
        weight: user.weight?.toString() || '',
        objective: user.profile?.fitness_goal || '',
        activityLevel: (Array.isArray(user.profile?.preferred_training_days) ? user.profile?.preferred_training_days[0] : user.profile?.preferred_training_days) || 'Moderada'
      })
      setImagePreview(user.profile_picture_url || user.profile_picture || null)
    }
  }, [user])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setEditedData(prev => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Por favor selecciona un archivo de imagen válido')
        return
      }
      
      if (file.size > 5 * 1024 * 1024) {
        alert('La imagen no debe superar los 5MB')
        return
      }

      setImageFile(file)
      
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleImageClick = () => {
    if (isEditing) {
      fileInputRef.current?.click()
    }
  }

  const handleSave = async () => {
    try {
      setIsSaving(true)
      
      // Note: Image upload logic should be handled here if needed.
      // For now, we'll just update the other fields.
      
      await updateProfile({
        first_name: editedData.first_name,
        last_name: editedData.last_name,
        height: editedData.height,
        weight: editedData.weight,
        profile: {
          fitness_goal: editedData.objective,
          preferred_training_days: editedData.activityLevel ? [editedData.activityLevel] : []
        }
      })
      
      setIsEditing(false)
      setImageFile(null)
    } catch (error) {
      console.error('Error al actualizar el perfil:', error)
      alert('Error al actualizar el perfil. Por favor, inténtalo de nuevo.')
    } finally {
      setIsSaving(false)
    }
  }

  const handleDeleteAccount = async () => {
    setIsDeletingAccount(true)
    try {
      await deleteAccount()
    } catch (error) {
      console.error('Error al eliminar la cuenta:', error)
      alert('Hubo un error al eliminar la cuenta. Por favor, inténtalo de nuevo.')
    } finally {
      setIsDeletingAccount(false)
      setIsDeleteModalOpen(false)
    }
  }

  const lastCheckIn = checkIns.length > 0 ? checkIns[0].checked_in_at : null;

  const userData: UserData | null = user
    ? {
        id: user.id,
        first_name: user.first_name || 'Usuario',
        last_name: user.last_name || '',
        email: user.email,
        image: user.profile_picture_url || user.profile_picture,
        membershipType: activeMembership?.plan?.name || 'Sin membresía',
        membershipStatus: (activeMembership?.status.toLowerCase() as any) || 'pending',
        lastCheckIn: lastCheckIn || undefined,
        joinDate: user.created_at || new Date().toISOString(),
        nextPayment: activeMembership?.end_date,
        height: Number(user.height) || 0,
        weight: Number(user.weight) || 0,
        objective: user.profile?.fitness_goal || 'No definido',
        activityLevel: (Array.isArray(user.profile?.preferred_training_days) ? user.profile?.preferred_training_days[0] : user.profile?.preferred_training_days) || 'Moderada',
        stats: summary ? {
          weightChange: summary.weight_change,
          totalWorkouts: summary.total_workouts,
          completedWorkouts: summary.completed_workouts,
          totalTime: summary.total_workout_time
        } : undefined
      }
    : null

  const getInitials = () => {
    if (!userData) return '';
    return `${userData.first_name?.charAt(0) || ''}${userData.last_name?.charAt(0) || ''}`.toUpperCase() || 'U';
  }

  if (authLoading || membershipLoading || progressLoading) {
    return (
      <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center items-center h-[60vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white">Error al cargar los datos</h2>
          <p className="mt-2 text-gray-400">Por favor, intenta recargar la página</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-gray-800/50 rounded-2xl p-8 backdrop-blur-sm border border-gray-700 shadow-lg">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="group relative">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              
              <div 
                onClick={handleImageClick}
                className={`relative ${isEditing ? 'cursor-pointer' : ''}`}
              >
                {imagePreview ? (
                  <div className="relative w-[100px] h-[100px] rounded-full ring-2 ring-gray-700 transition-all duration-300 group-hover:ring-red-500 overflow-hidden">
                    <Image
                      src={imagePreview}
                      alt={`${userData.first_name} ${userData.last_name}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-[100px] h-[100px] rounded-full bg-red-600 flex items-center justify-center text-3xl font-bold text-white ring-2 ring-gray-700 transition-all duration-300 group-hover:ring-red-500">
                    {getInitials()}
                  </div>
                )}
                
                {isEditing && (
                  <div className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg 
                      className="w-8 h-8 text-white" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" 
                      />
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" 
                      />
                    </svg>
                  </div>
                )}
              </div>
              
              {isEditing && (
                <p className="text-xs text-gray-400 text-center mt-2">
                  Click para cambiar
                </p>
              )}
            </div>

              <div className="text-center md:text-left">
                {isEditing ? (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={editedData.first_name}
                      onChange={handleInputChange}
                      name="first_name"
                      placeholder="Nombre"
                      className="text-2xl font-bold text-white bg-gray-700/50 rounded px-2 py-1 w-full max-w-[150px] mb-2"
                    />
                    <input
                      type="text"
                      value={editedData.last_name}
                      onChange={handleInputChange}
                      name="last_name"
                      placeholder="Apellido"
                      className="text-2xl font-bold text-white bg-gray-700/50 rounded px-2 py-1 w-full max-w-[150px] mb-2"
                    />
                  </div>
                ) : (
                  <h1 className="text-3xl font-bold text-white">{`${userData.first_name} ${userData.last_name}`}</h1>
                )}

                {isEditing ? (
                  <input
                    type="email"
                    value={editedData.email}
                    onChange={handleInputChange}
                    name="email"
                    className="text-gray-400 bg-gray-700/50 rounded px-2 py-1 w-full mb-2"
                  />
                ) : (
                  <p className="text-gray-400 mt-1">{userData.email}</p>
                )}

                <div
                  className={`inline-flex px-4 py-2 mt-3 rounded-full font-medium text-sm ${
                    userData.membershipStatus === 'active'
                      ? 'bg-green-500/20 text-green-400'
                      : userData.membershipStatus === 'expired'
                      ? 'bg-red-500/20 text-red-400'
                      : 'bg-yellow-500/20 text-yellow-400'
                  }`}
                >
                  Membresía {userData.membershipType} -{' '}
                  {userData.membershipStatus === 'active'
                    ? 'Activa'
                    : userData.membershipStatus === 'expired'
                    ? 'Expirada'
                    : 'Pendiente'}
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center md:items-end gap-2">
              <div className="text-gray-400 text-sm px-4 py-2 bg-gray-700/30 rounded-lg">
                Próximo pago:{' '}
                {userData.nextPayment
                  ? new Date(userData.nextPayment).toLocaleDateString()
                  : 'No disponible'}
              </div>
              {userData.lastCheckIn && (
                <div className="text-gray-400 text-sm px-4 py-2 bg-gray-700/30 rounded-lg">
                  Último ingreso: {new Date(userData.lastCheckIn).toLocaleDateString()}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Grid de información */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Tarjeta QR */}
          <div
            className="bg-gray-800/50 rounded-2xl p-8 backdrop-blur-sm border border-gray-700 shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer"
            onClick={() => setIsQRModalOpen(true)}
          >
            <h3 className="text-xl font-semibold text-white mb-6">Mi código QR</h3>
            <div className="flex justify-center bg-white rounded-xl overflow-hidden">
              <QRCodeSVG 
                value={activeMembership?.qr_code_payload || userData.id.toString()} 
                size={300} 
                level="H"
                includeMargin={false}
                marginSize={1}
              />
            </div>
            <p className="text-center text-gray-400 text-sm mt-6">
              Toca para ver en pantalla completa
            </p>
          </div>

          {/* Información física */}
          <div className="bg-gray-800/50 rounded-2xl p-8 backdrop-blur-sm border border-gray-700 shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-white">Información física</h3>
            </div>

            <div className="space-y-6">
              {/* Altura */}
              <div className="p-4 bg-gray-700/30 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Altura</span>
                  {isEditing ? (
                    <input
                      type="number"
                      name="height"
                      value={editedData.height}
                      onChange={handleInputChange}
                      className="w-24 bg-gray-600 text-white rounded px-2 py-1 text-right"
                      placeholder="Altura"
                      min="100"
                      max="250"
                    />
                  ) : (
                    <span className="text-white font-medium">{userData.height} cm</span>
                  )}
                </div>
              </div>

              {/* Peso */}
              <div className="p-4 bg-gray-700/30 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Peso</span>
                  {isEditing ? (
                    <input
                      type="number"
                      name="weight"
                      value={editedData.weight}
                      onChange={handleInputChange}
                      className="w-24 bg-gray-600 text-white rounded px-2 py-1 text-right"
                      placeholder="Peso"
                      min="30"
                      max="300"
                    />
                  ) : (
                    <span className="text-white font-medium">{userData.weight} kg</span>
                  )}
                </div>
              </div>

              {/* Nivel de actividad */}
              <div className="p-4 bg-gray-700/30 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Nivel de actividad</span>
                  {isEditing ? (
                    <select
                      name="activityLevel"
                      value={editedData.activityLevel}
                      onChange={handleInputChange}
                      className="w-32 bg-gray-600 text-white rounded px-2 py-1"
                    >
                      <option value="Principiante">Principiante</option>
                      <option value="Intermedio">Intermedio</option>
                      <option value="Avanzado">Avanzado</option>
                    </select>
                  ) : (
                    <span className="text-white font-medium">{userData.activityLevel}</span>
                  )}
                </div>
              </div>
            </div>

            {isEditing && (
              <div className="mt-6 flex justify-end space-x-4">
                <button
                  onClick={() => {
                    setIsEditing(false)
                    setImageFile(null)
                    if (user) {
                      setEditedData({
                        first_name: user.first_name || '',
                        last_name: user.last_name || '',
                        email: user.email || '',
                        height: user.height?.toString() || '',
                        weight: user.weight?.toString() || '',
                        objective: user.profile?.fitness_goal || '',
                        activityLevel: (Array.isArray(user.profile?.preferred_training_days) ? user.profile?.preferred_training_days[0] : user.profile?.preferred_training_days) || ''
                      })
                      setImagePreview(user.profile_picture_url || user.profile_picture || null)
                    }
                  }}
                  className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className={`px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 ${
                    isSaving ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isSaving ? 'Guardando...' : 'Guardar cambios'}
                </button>
              </div>
            )}
          </div>
          
          {/* Estadísticas de progreso */}
          <div className="bg-gray-800/50 rounded-2xl p-8 backdrop-blur-sm border border-gray-700 shadow-lg">
            <h3 className="text-xl font-semibold text-white mb-6">Estadísticas de progreso</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-700/30 rounded-lg">
                <span className="text-gray-400 text-xs block mb-1">Entrenamientos</span>
                <span className="text-2xl font-bold text-white">
                  {userData.stats?.completedWorkouts || 0}
                </span>
                <span className="text-gray-500 text-[10px] block mt-1">
                  de {userData.stats?.totalWorkouts || 0} iniciados
                </span>
              </div>
              
              <div className="p-4 bg-gray-700/30 rounded-lg">
                <span className="text-gray-400 text-xs block mb-1">Cambio de Peso</span>
                <div className="flex items-center gap-2">
                  <span className={`text-2xl font-bold ${
                    Number(userData.stats?.weightChange) < 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {userData.stats?.weightChange ? (Number(userData.stats.weightChange) > 0 ? '+' : '') : ''}
                    {userData.stats?.weightChange || '0.00'}
                  </span>
                  <span className="text-gray-400 text-xs">kg</span>
                </div>
              </div>
              
              <div className="p-4 bg-gray-700/30 rounded-lg col-span-2">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-gray-400 text-xs block mb-1">Tiempo total</span>
                    <span className="text-2xl font-bold text-white">
                      {userData.stats?.totalTime || 0}
                    </span>
                    <span className="text-gray-400 text-xs ml-1">min</span>
                  </div>
                  <div className="text-right">
                    <span className="text-gray-400 text-xs block mb-1">Promedio</span>
                    <span className="text-white font-medium">
                      {summary?.avg_workout_duration ? Math.round(Number(summary.avg_workout_duration)) : 0}
                    </span>
                    <span className="text-gray-400 text-xs ml-1">min</span>
                  </div>
                </div>
              </div>
            </div>
            
            <p className="text-gray-500 text-xs mt-6 italic">
              * Datos calculados desde el inicio de tu entrenamiento.
            </p>
          </div>

          {/* Objetivo */}
          <div className="bg-gray-800/50 rounded-2xl p-8 backdrop-blur-sm border border-gray-700 shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-white">Mi objetivo</h3>
            </div>
            <div className="p-4 bg-gray-700/30 rounded-lg">
              {isEditing ? (
                <textarea
                  name="objective"
                  value={editedData.objective}
                  onChange={handleInputChange}
                  className="w-full bg-gray-600 text-white rounded px-3 py-2 min-h-[100px] resize-none"
                  placeholder="Describe tu objetivo..."
                />
              ) : (
                <p className="text-gray-300">{userData.objective}</p>
              )}
            </div>
          </div>
        </div>

        {/* Acciones */}
        <div className="mt-8 flex flex-col md:flex-row gap-4 justify-end">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="inline-flex items-center justify-center px-6 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white hover:bg-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            {isEditing ? 'Cancelar' : 'Editar'}
          </button>
          <button
            onClick={() => setIsDeleteModalOpen(true)}
            className="inline-flex items-center justify-center px-6 py-3 bg-red-500/10 border border-red-500 rounded-lg text-red-500 hover:bg-red-500/20 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Eliminar cuenta
          </button>
        </div>

        {/* Modal de eliminación de cuenta */}
        <DeleteAccountModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDeleteAccount}
          isLoading={isDeletingAccount}
        />

        {/* Modal del código QR */}
        <QRModal
          isOpen={isQRModalOpen}
          onClose={() => setIsQRModalOpen(false)}
          qrCodeValue={activeMembership?.qr_code_payload || userData.id.toString()}
        />
      </div>
    </div>
  )
}
