'use client'

import React, { useState, useEffect } from 'react'
import { useAuthContext } from '@/providers/AuthProvider'
import { User, TrendingUp, Calendar, Plus, Edit2, Trash2 } from 'lucide-react'

interface WorkoutEntry {
    id: string
    date: string
    exercise: string
    sets: number
    reps: number
    weight: number
}

const EXERCISES = [
    'Press Banca',
    'Sentadillas',
    'Peso Muerto',
    'Dominadas',
    'Remo con Barra'
]

const StatsPage: React.FC = () => {
    const { user } = useAuthContext()
    const [workoutEntries, setWorkoutEntries] = useState<WorkoutEntry[]>([])
    const [showAddForm, setShowAddForm] = useState(false)
    const [selectedExercise, setSelectedExercise] = useState<string>('Todos')
    const [editingEntry, setEditingEntry] = useState<WorkoutEntry | null>(null)

    // Form state
    const [formData, setFormData] = useState({
        date: new Date().toISOString().split('T')[0],
        exercise: EXERCISES[0],
        sets: 3,
        reps: 10,
        weight: 0
    })

    // Load workout entries from localStorage on mount
    useEffect(() => {
        const savedEntries = localStorage.getItem('workoutEntries')
        if (savedEntries) {
            setWorkoutEntries(JSON.parse(savedEntries))
        }
    }, [])

    // Save to localStorage whenever entries change
    useEffect(() => {
        if (workoutEntries.length > 0) {
            localStorage.setItem('workoutEntries', JSON.stringify(workoutEntries))
        }
    }, [workoutEntries])

    const handleAddEntry = () => {
        if (editingEntry) {
            // Update existing entry
            setWorkoutEntries(prev => prev.map(entry =>
                entry.id === editingEntry.id
                    ? { ...formData, id: entry.id }
                    : entry
            ))
            setEditingEntry(null)
        } else {
            // Add new entry
            const newEntry: WorkoutEntry = {
                id: Date.now().toString(),
                ...formData
            }
            setWorkoutEntries(prev => [newEntry, ...prev])
        }

        // Reset form
        setFormData({
            date: new Date().toISOString().split('T')[0],
            exercise: EXERCISES[0],
            sets: 3,
            reps: 10,
            weight: 0
        })
        setShowAddForm(false)
    }

    const handleEditEntry = (entry: WorkoutEntry) => {
        setEditingEntry(entry)
        setFormData({
            date: entry.date,
            exercise: entry.exercise,
            sets: entry.sets,
            reps: entry.reps,
            weight: entry.weight
        })
        setShowAddForm(true)
    }

    const handleDeleteEntry = (id: string) => {
        setWorkoutEntries(prev => prev.filter(entry => entry.id !== id))
    }

    const filteredEntries = selectedExercise === 'Todos'
        ? workoutEntries
        : workoutEntries.filter(entry => entry.exercise === selectedExercise)

    return (
        <div className="min-h-screen pt-24 pb-16" style={{ background: '#000000' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1
                        className="text-5xl font-bold mb-4"
                        style={{
                            background: 'linear-gradient(to right, #ef4444, #dc2626)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            textShadow: '0 0 30px rgba(239, 68, 68, 0.3)'
                        }}
                    >
                        Mis Estadísticas
                    </h1>
                </div>

                {/* User Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    <div
                        className="p-6 rounded-xl backdrop-blur-xl transition-all duration-300 hover:scale-105"
                        style={{
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
                        }}
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <User className="w-6 h-6 text-red-500" />
                            <h3 className="text-gray-400 text-sm font-medium">Peso</h3>
                        </div>
                        <p className="text-3xl font-bold text-white">{user?.weight || '--'} kg</p>
                    </div>

                    <div
                        className="p-6 rounded-xl backdrop-blur-xl transition-all duration-300 hover:scale-105"
                        style={{
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
                        }}
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <TrendingUp className="w-6 h-6 text-red-500" />
                            <h3 className="text-gray-400 text-sm font-medium">Altura</h3>
                        </div>
                        <p className="text-3xl font-bold text-white">{user?.height || '--'} cm</p>
                    </div>

                    <div
                        className="p-6 rounded-xl backdrop-blur-xl transition-all duration-300 hover:scale-105"
                        style={{
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
                        }}
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <Calendar className="w-6 h-6 text-red-500" />
                            <h3 className="text-gray-400 text-sm font-medium">Edad</h3>
                        </div>
                        <p className="text-3xl font-bold text-white">{user?.age || '--'} años</p>
                    </div>

                    <div
                        className="p-6 rounded-xl backdrop-blur-xl transition-all duration-300 hover:scale-105"
                        style={{
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
                        }}
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <TrendingUp className="w-6 h-6 text-red-500" />
                            <h3 className="text-gray-400 text-sm font-medium">Entrenamientos</h3>
                        </div>
                        <p className="text-3xl font-bold text-white">{workoutEntries.length}</p>
                    </div>
                </div>

                {/* Workout Tracking Section */}
                <div
                    className="rounded-2xl p-8 backdrop-blur-xl mb-8"
                    style={{
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                    }}
                >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                        <h2 className="text-2xl font-bold text-white mb-4 md:mb-0">Registro de Entrenamientos</h2>
                        <button
                            onClick={() => {
                                setShowAddForm(!showAddForm)
                                setEditingEntry(null)
                                setFormData({
                                    date: new Date().toISOString().split('T')[0],
                                    exercise: EXERCISES[0],
                                    sets: 3,
                                    reps: 10,
                                    weight: 0
                                })
                            }}
                            className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105"
                            style={{
                                background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                                color: '#ffffff',
                                boxShadow: '0 4px 15px rgba(239, 68, 68, 0.4)'
                            }}
                        >
                            <Plus className="w-5 h-5" />
                            {showAddForm ? 'Cancelar' : 'Agregar Registro'}
                        </button>
                    </div>

                    {/* Add/Edit Form */}
                    {showAddForm && (
                        <div
                            className="mb-8 p-6 rounded-xl"
                            style={{
                                background: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.1)'
                            }}
                        >
                            <h3 className="text-xl font-bold text-white mb-4">
                                {editingEntry ? 'Editar Registro' : 'Nuevo Registro'}
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Fecha</label>
                                    <input
                                        type="date"
                                        value={formData.date}
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                        className="w-full bg-gray-900/50 border border-gray-700 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Ejercicio</label>
                                    <select
                                        value={formData.exercise}
                                        onChange={(e) => setFormData({ ...formData, exercise: e.target.value })}
                                        className="w-full bg-gray-900/50 border border-gray-700 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                                    >
                                        {EXERCISES.map(ex => (
                                            <option key={ex} value={ex}>{ex}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Series</label>
                                    <input
                                        type="number"
                                        min="1"
                                        value={formData.sets}
                                        onChange={(e) => setFormData({ ...formData, sets: parseInt(e.target.value) })}
                                        className="w-full bg-gray-900/50 border border-gray-700 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Reps</label>
                                    <input
                                        type="number"
                                        min="1"
                                        value={formData.reps}
                                        onChange={(e) => setFormData({ ...formData, reps: parseInt(e.target.value) })}
                                        className="w-full bg-gray-900/50 border border-gray-700 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Peso (kg)</label>
                                    <input
                                        type="number"
                                        min="0"
                                        step="0.5"
                                        value={formData.weight}
                                        onChange={(e) => setFormData({ ...formData, weight: parseFloat(e.target.value) })}
                                        className="w-full bg-gray-900/50 border border-gray-700 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                                    />
                                </div>
                            </div>
                            <button
                                onClick={handleAddEntry}
                                className="mt-4 px-6 py-2 rounded-lg font-medium transition-all duration-300"
                                style={{
                                    background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                                    color: '#ffffff'
                                }}
                            >
                                {editingEntry ? 'Actualizar' : 'Guardar'}
                            </button>
                        </div>
                    )}

                    {/* Filter */}
                    <div className="flex flex-wrap gap-3 mb-6">
                        {['Todos', ...EXERCISES].map((exercise) => (
                            <button
                                key={exercise}
                                onClick={() => setSelectedExercise(exercise)}
                                className="px-4 py-2 rounded-full font-medium transition-all duration-300"
                                style={{
                                    background: selectedExercise === exercise
                                        ? 'linear-gradient(135deg, #ef4444, #dc2626)'
                                        : 'rgba(255, 255, 255, 0.1)',
                                    color: '#ffffff',
                                    border: selectedExercise === exercise
                                        ? '2px solid #ef4444'
                                        : '2px solid rgba(255, 255, 255, 0.2)',
                                    transform: selectedExercise === exercise ? 'scale(1.05)' : 'scale(1)'
                                }}
                            >
                                {exercise}
                            </button>
                        ))}
                    </div>

                    {/* Workout History Table */}
                    {filteredEntries.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-700">
                                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Fecha</th>
                                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Ejercicio</th>
                                        <th className="text-center py-3 px-4 text-gray-400 font-medium">Series</th>
                                        <th className="text-center py-3 px-4 text-gray-400 font-medium">Reps</th>
                                        <th className="text-center py-3 px-4 text-gray-400 font-medium">Peso (kg)</th>
                                        <th className="text-center py-3 px-4 text-gray-400 font-medium">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredEntries.map((entry) => (
                                        <tr
                                            key={entry.id}
                                            className="border-b border-gray-800 hover:bg-white/5 transition-colors"
                                        >
                                            <td className="py-3 px-4 text-white">{new Date(entry.date).toLocaleDateString('es-ES')}</td>
                                            <td className="py-3 px-4 text-white font-medium">{entry.exercise}</td>
                                            <td className="py-3 px-4 text-white text-center">{entry.sets}</td>
                                            <td className="py-3 px-4 text-white text-center">{entry.reps}</td>
                                            <td className="py-3 px-4 text-white text-center font-bold text-red-500">{entry.weight}</td>
                                            <td className="py-3 px-4">
                                                <div className="flex items-center justify-center gap-2">
                                                    <button
                                                        onClick={() => handleEditEntry(entry)}
                                                        className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                                                    >
                                                        <Edit2 className="w-4 h-4 text-blue-400" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteEntry(entry.id)}
                                                        className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                                                    >
                                                        <Trash2 className="w-4 h-4 text-red-400" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-gray-400 text-lg">
                                {selectedExercise === 'Todos'
                                    ? 'No hay registros de entrenamientos aún. ¡Comienza a registrar tu progreso!'
                                    : `No hay registros de ${selectedExercise}`}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default StatsPage
