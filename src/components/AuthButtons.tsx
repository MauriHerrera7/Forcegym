'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function AuthButtons() {
  return (
    <div className="flex items-center gap-4">
      <Link
        href="/auth/login"
        className="text-white hover:text-red-500 transition-colors duration-200"
      >
        Iniciar sesión
      </Link>
      <Link
        href="/auth/register"
        className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300 shadow-lg hover:shadow-xl"
      >
        Únete
      </Link>
    </div>
  )
}