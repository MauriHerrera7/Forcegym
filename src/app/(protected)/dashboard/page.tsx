'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { QRCodeSVG } from 'qrcode.react'
import DeleteAccountModal from '@/components/DeleteAccountModal'
import QRModal from '@/components/QRModal'
import { useAuth } from '@/hooks/useAuth'

interface UserData {
  id: string
  name: string
  email: string
  image?: string
  membershipType: string
  membershipStatus: 'active' | 'expired' | 'pending'
  lastCheckIn?: string
  joinDate: string
  nextPayment?: string
  height: number
  weight: number
  objective: string
  activityLevel: string
}

interface EditableData {
  name: string
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
  const { user, deleteAccount, loading, updateProfile } = useAuth()
  const [editedData, setEditedData] = useState<EditableData>({
    name: '',
    email: '',
    height: '',
    weight: '',
    objective: '',
    activityLevel: ''
  })

  useEffect(() => {
    if (user) {
      setEditedData({
        name: user.name || '',
        email: user.email || '',
        height: user.height?.toString() || '',
        weight: user.weight?.toString() || '',
        objective: user.objective || '',
        activityLevel: user.activityLevel || ''
      })
    }
  }, [user])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setEditedData(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = async () => {
    try {
      setIsSaving(true)
      await updateProfile({
        name: editedData.name,
        email: editedData.email,
        height: Number(editedData.height),
        weight: Number(editedData.weight),
        objective: editedData.objective,
        activityLevel: editedData.activityLevel
      })
      setIsEditing(false)
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

  const userData: UserData | null = user
    ? {
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
        membershipType: user.membershipType || 'Premium',
        membershipStatus: user.membershipStatus || 'active',
        lastCheckIn: user.lastCheckIn,
        joinDate: user.joinDate || new Date().toISOString(),
        nextPayment: user.nextPayment,
        height: user.height || 180,
        weight: user.weight || 75,
        objective: user.objective || 'Ganar masa muscular y mejorar resistencia',
        activityLevel: user.activityLevel || 'Moderada'
      }
    : null

  if (loading) {
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
              <div className="group">
                {userData.image ? (
                  <div className="relative">
                    <Image
                      src={userData.image}
                      alt={userData.name}
                      width={100}
                      height={100}
                      className="rounded-full ring-2 ring-gray-700 transition-all duration-300 group-hover:ring-red-500"
                    />
                  </div>
                ) : (
                  <div className="relative">
                    <div className="w-[100px] h-[100px] rounded-full bg-red-600 flex items-center justify-center text-3xl font-bold text-white ring-2 ring-gray-700 transition-all duration-300">
                      {userData.name.charAt(0)}
                    </div>
                  </div>
                )}
              </div>

              <div className="text-center md:text-left">
                {isEditing ? (
                  <input
                    type="text"
                    value={editedData.name}
                    onChange={handleInputChange}
                    name="name"
                    className="text-3xl font-bold text-white bg-gray-700/50 rounded px-2 py-1 w-full mb-2"
                  />
                ) : (
                  <h1 className="text-3xl font-bold text-white">{userData.name}</h1>
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
            <div className="flex justify-center bg-white p-6 rounded-xl shadow-inner">
              <QRCodeSVG value={userData.id} size={180} level="H" />
            </div>
            <p className="text-center text-gray-400 text-sm mt-6">
              Toca para ver en pantalla completa
            </p>
          </div>

          {/* Información física */}
          <div className="bg-gray-800/50 rounded-2xl p-8 backdrop-blur-sm border border-gray-700 shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-white">Información física</h3>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
              >
                {isEditing ? 'Cancelar' : 'Editar'}
              </button>
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
                    if (user) {
                      setEditedData({
                        name: user.name || '',
                        email: user.email || '',
                        height: user.height?.toString() || '',
                        weight: user.weight?.toString() || '',
                        objective: user.objective || '',
                        activityLevel: user.activityLevel || ''
                      })
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
                  className="w-full bg-gray-600 text-white rounded px-3 py-2 min-h-[100px]"
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
          <Link
            href="/profile"
            className="inline-flex items-center justify-center px-6 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white hover:bg-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Editar perfil
          </Link>
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
          userId={userData.id}
        />
      </div>
    </div>
  )
}