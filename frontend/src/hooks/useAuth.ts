'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'

interface User {
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
  gender: 'male' | 'female'
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // Cargar usuario al iniciar
  useEffect(() => {
    const loadUser = async () => {
      try {
        // TODO: Implementar carga real del usuario desde el backend
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser)
          // Validar que el usuario tiene todos los campos requeridos
          if (
            parsedUser &&
            typeof parsedUser.id === 'string' &&
            typeof parsedUser.name === 'string' &&
            typeof parsedUser.email === 'string' &&
            typeof parsedUser.membershipType === 'string' &&
            (parsedUser.membershipStatus === 'active' ||
             parsedUser.membershipStatus === 'expired' ||
             parsedUser.membershipStatus === 'pending') &&
            typeof parsedUser.joinDate === 'string' &&
            (parsedUser.gender === 'male' || parsedUser.gender === 'female')
          ) {
            setUser(parsedUser)
          } else {
            // Si los datos no son válidos, eliminarlos
            localStorage.removeItem('user')
          }
        }
      } catch (error) {
        console.error('Error al cargar el usuario:', error)
      } finally {
        setLoading(false)
      }
    }

    loadUser()
  }, [])

  const login = useCallback(async (credentials: { email: string; password: string }) => {
    try {
      // TODO: Implementar login real con el backend
      const mockUser = {
        id: '123456',
        name: 'Usuario Ejemplo',
        email: credentials.email,
        membershipType: 'Premium',
        membershipStatus: 'active' as const,
        lastCheckIn: new Date('2023-09-21T15:30:00').toISOString(),
        joinDate: new Date('2023-08-01').toISOString(),
        nextPayment: new Date('2023-10-01').toISOString(),
        height: 180,
        weight: 75,
        objective: 'Ganar masa muscular y mejorar resistencia',
        activityLevel: 'Moderada',
        gender: 'male' as const
      }
      
      localStorage.setItem('user', JSON.stringify(mockUser))
      setUser(mockUser)
      router.push('/dashboard')
    } catch (error) {
      console.error('Error al iniciar sesión:', error)
      throw error
    }
  }, [router])

  const logout = useCallback(async () => {
    try {
      // TODO: Implementar logout en el backend
      localStorage.removeItem('user')
      setUser(null)
      router.push('/')
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
      throw error
    }
  }, [router])

  const deleteAccount = useCallback(async () => {
    try {
      // TODO: Implementar eliminación de cuenta en el backend
      await logout()
    } catch (error) {
      console.error('Error al eliminar la cuenta:', error)
      throw error
    }
  }, [logout])

  return {
    user,
    loading,
    login,
    logout,
    deleteAccount,
    isAuthenticated: !!user
  }
}