'use client'

import React, { useState } from 'react'
import { Play } from 'lucide-react'

interface Video {
    id: string
    title: string
    description: string
    youtubeId: string
    thumbnail: string
    duration: string
    category: string
}

// Videos de nutrición y entrenamiento
const demoVideos: Video[] = [
    {
        id: '1',
        title: 'Guía Completa de Nutrición',
        description: 'Todo lo que necesitas saber sobre nutrición para mejorar tu rendimiento',
        youtubeId: '_kz3SIBqQBg',
        thumbnail: 'https://img.youtube.com/vi/_kz3SIBqQBg/maxresdefault.jpg',
        duration: '15:30',
        category: 'Nutrición'
    },
    {
        id: '2',
        title: 'Alimentación para Deportistas',
        description: 'Estrategias nutricionales para optimizar tu entrenamiento',
        youtubeId: 'SY78E56B7mU',
        thumbnail: 'https://img.youtube.com/vi/SY78E56B7mU/maxresdefault.jpg',
        duration: '12:45',
        category: 'Nutrición'
    },
    {
        id: '3',
        title: 'Macronutrientes y Rendimiento',
        description: 'Aprende a balancear proteínas, carbohidratos y grasas correctamente',
        youtubeId: 'vV56YXrr55I',
        thumbnail: 'https://img.youtube.com/vi/vV56YXrr55I/maxresdefault.jpg',
        duration: '18:20',
        category: 'Nutrición'
    },
    {
        id: '4',
        title: 'Mejora tu dieta',
        description: 'Guía sobre suplementos y cómo utilizarlos de manera efectiva',
        youtubeId: 'wiJzsSP_5Ao',
        thumbnail: 'https://img.youtube.com/vi/wiJzsSP_5Ao/maxresdefault.jpg',
        duration: '20:15',
        category: 'Nutrición'
    },
    {
        id: '7',
        title: 'Cómo Hacer Correctamente un Press de Banca',
        description: 'Técnica correcta y consejos para maximizar tu press de banca',
        youtubeId: 'TAH8RxOS0VI',
        thumbnail: 'https://img.youtube.com/vi/TAH8RxOS0VI/maxresdefault.jpg',
        duration: '10:15',
        category: 'Pecho'
    },
    {
        id: '8',
        title: 'Cómo Hacer Correctamente Press Inclinado con Mancuernas',
        description: 'Aprende la técnica perfecta para el press inclinado con mancuernas',
        youtubeId: '9fy0A5xWsgk',
        thumbnail: 'https://img.youtube.com/vi/9fy0A5xWsgk/maxresdefault.jpg',
        duration: '8:45',
        category: 'Pecho'
    },
    {
        id: '9',
        title: 'Cómo Hacer Cruce de Poleas',
        description: 'Técnica correcta para el cruce de poleas y activación del pecho',
        youtubeId: 'fRIgvZWg2BI',
        thumbnail: 'https://img.youtube.com/vi/fRIgvZWg2BI/maxresdefault.jpg',
        duration: '7:30',
        category: 'Pecho'
    },
    {
        id: '10',
        title: 'Cómo Hacer Press Inclinado en Smith',
        description: 'Guía completa para dominar el press inclinado en máquina Smith',
        youtubeId: 'WpjYDxwoXA0',
        thumbnail: 'https://img.youtube.com/vi/WpjYDxwoXA0/maxresdefault.jpg',
        duration: '9:20',
        category: 'Pecho'
    },
    {
        id: '11',
        title: 'Cómo Hacer Jalón al Pecho',
        description: 'Técnica correcta para el jalón al pecho y activación de dorsales',
        youtubeId: 'x2Y6Mb41zjY',
        thumbnail: 'https://img.youtube.com/vi/x2Y6Mb41zjY/maxresdefault.jpg',
        duration: '8:30',
        category: 'Espalda'
    },
    {
        id: '12',
        title: 'Remo Sentado - Hazlo de Forma Correcta',
        description: 'Aprende la técnica perfecta para el remo sentado en polea',
        youtubeId: 'ue8MXKXdOVw',
        thumbnail: 'https://img.youtube.com/vi/ue8MXKXdOVw/maxresdefault.jpg',
        duration: '10:15',
        category: 'Espalda'
    },
    {
        id: '13',
        title: 'Cómo Hacer Remo con Barra',
        description: 'Guía completa para dominar el remo con barra correctamente',
        youtubeId: 'OXH-ecu-Obw',
        thumbnail: 'https://img.youtube.com/vi/OXH-ecu-Obw/maxresdefault.jpg',
        duration: '9:45',
        category: 'Espalda'
    },
    {
        id: '14',
        title: 'Los 4 MEJORES Ejercicios de ESPALDA',
        description: 'Los ejercicios más efectivos para construir una espalda completa',
        youtubeId: 'CO5qxkz-KkY',
        thumbnail: 'https://img.youtube.com/vi/CO5qxkz-KkY/maxresdefault.jpg',
        duration: '12:20',
        category: 'Espalda'
    },
    {
        id: '15',
        title: 'PRESS MILITAR con Mancuernas',
        description: 'Técnica correcta para el press militar con mancuernas',
        youtubeId: 'o5M9RZ-vWrc',
        thumbnail: 'https://img.youtube.com/vi/o5M9RZ-vWrc/maxresdefault.jpg',
        duration: '9:15',
        category: 'Hombros'
    },
    {
        id: '16',
        title: 'CÓMO HACER ELEVACIONES LATERALES',
        description: 'Aprende la técnica perfecta para las elevaciones laterales',
        youtubeId: 'hgLpdwMtEEs',
        thumbnail: 'https://img.youtube.com/vi/hgLpdwMtEEs/maxresdefault.jpg',
        duration: '8:30',
        category: 'Hombros'
    },
    {
        id: '17',
        title: 'Cómo Hacer Elevaciones Laterales en Polea',
        description: 'Guía completa para elevaciones laterales en polea',
        youtubeId: 'fKxKgslS408',
        thumbnail: 'https://img.youtube.com/vi/fKxKgslS408/maxresdefault.jpg',
        duration: '7:45',
        category: 'Hombros'
    },
    {
        id: '18',
        title: 'Cómo Hacer Face Pull Correctamente',
        description: 'Técnica correcta para el face pull y desarrollo del hombro posterior',
        youtubeId: 'X-xCQ1gh-kA',
        thumbnail: 'https://img.youtube.com/vi/X-xCQ1gh-kA/maxresdefault.jpg',
        duration: '10:00',
        category: 'Hombros'
    },
    {
        id: '19',
        title: 'Tus Hombros Necesitan Estos Ejercicios',
        description: 'Los mejores ejercicios para desarrollar hombros completos y fuertes',
        youtubeId: '4JY1-jVNRqc',
        thumbnail: 'https://img.youtube.com/vi/4JY1-jVNRqc/maxresdefault.jpg',
        duration: '11:30',
        category: 'Hombros'
    },
    {
        id: '20',
        title: 'Extensión de Tríceps en Polea',
        description: 'Técnica correcta para la extensión de tríceps en polea',
        youtubeId: 'dRkTreltpnc',
        thumbnail: 'https://img.youtube.com/vi/dRkTreltpnc/maxresdefault.jpg',
        duration: '8:15',
        category: 'Brazos'
    },
    {
        id: '21',
        title: 'EXTENSIONES de TRÍCEPS en POLEA ALTA TRASNUCA',
        description: 'Aprende la técnica perfecta para extensiones de tríceps trasnuca',
        youtubeId: '8QHpC7aEQAU',
        thumbnail: 'https://img.youtube.com/vi/8QHpC7aEQAU/maxresdefault.jpg',
        duration: '9:30',
        category: 'Brazos'
    },
    {
        id: '22',
        title: 'Haz Crecer tu TRÍCEPS',
        description: 'Los mejores ejercicios y consejos para desarrollar tríceps grandes',
        youtubeId: 'xfS2-dkcC1k',
        thumbnail: 'https://img.youtube.com/vi/xfS2-dkcC1k/maxresdefault.jpg',
        duration: '10:45',
        category: 'Brazos'
    },
    {
        id: '23',
        title: 'Cómo Hacer Curl de Bíceps (Paso a Paso)',
        description: 'Guía completa para dominar el curl de bíceps correctamente',
        youtubeId: 'PY9QylAMtyE',
        thumbnail: 'https://img.youtube.com/vi/PY9QylAMtyE/maxresdefault.jpg',
        duration: '7:50',
        category: 'Brazos'
    },
    {
        id: '24',
        title: 'Los MEJORES Ejercicios de BÍCEPS',
        description: 'Los ejercicios más efectivos para construir bíceps grandes y fuertes',
        youtubeId: '-QnKDiHhSro',
        thumbnail: 'https://img.youtube.com/vi/-QnKDiHhSro/maxresdefault.jpg',
        duration: '11:20',
        category: 'Brazos'
    },
    {
        id: '25',
        title: 'Cómo hacer sentadillas CORRECTAMENTE',
        description: 'Aprende la técnica correcta para realizar sentadillas y evitar lesiones',
        youtubeId: 'qsAkuNORgmk',
        thumbnail: 'https://img.youtube.com/vi/qsAkuNORgmk/maxresdefault.jpg',
        duration: '12:30',
        category: 'Piernas'
    },
    {
        id: '26',
        title: 'Todo sobre la PRENSA de PIERNA',
        description: 'Maximiza tus resultados en la prensa de pierna con estos consejos',
        youtubeId: 'bNsrqXUIJqc',
        thumbnail: 'https://img.youtube.com/vi/bNsrqXUIJqc/maxresdefault.jpg',
        duration: '10:45',
        category: 'Piernas'
    },
    {
        id: '27',
        title: 'Cómo hacer el PESO MUERTO con seguridad',
        description: 'Guía de 5 pasos para realizar peso muerto de forma segura y efectiva',
        youtubeId: '0XL4cZR2Ink',
        thumbnail: 'https://img.youtube.com/vi/0XL4cZR2Ink/maxresdefault.jpg',
        duration: '14:20',
        category: 'Piernas'
    },
    {
        id: '28',
        title: 'Extensiones de piernas en máquina',
        description: 'Técnica correcta para extensiones de cuádriceps en máquina',
        youtubeId: 'DI34ngDC8FU',
        thumbnail: 'https://img.youtube.com/vi/DI34ngDC8FU/maxresdefault.jpg',
        duration: '8:15',
        category: 'Piernas'
    }
]

const VideosPage: React.FC = () => {
    const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)
    const [selectedCategory, setSelectedCategory] = useState<string>('Todos')

    const categories = ['Todos', 'Nutrición', 'Pecho', 'Espalda', 'Hombros', 'Brazos', 'Piernas']

    const filteredVideos = selectedCategory === 'Todos'
        ? demoVideos
        : demoVideos.filter(video => video.category === selectedCategory)

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
                        Biblioteca de Videos
                    </h1>
                    <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                        Accede a nuestra colección exclusiva de videos de entrenamiento, nutrición y consejos fitness
                    </p>
                </div>

                {/* Category Filter */}
                <div className="flex flex-wrap justify-center gap-3 mb-10">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className="px-6 py-2.5 rounded-full font-medium transition-all duration-300"
                            style={{
                                background: selectedCategory === category
                                    ? 'linear-gradient(135deg, #ef4444, #dc2626)'
                                    : 'rgba(255, 255, 255, 0.1)',
                                color: '#ffffff',
                                border: selectedCategory === category
                                    ? '2px solid #ef4444'
                                    : '2px solid rgba(255, 255, 255, 0.2)',
                                transform: selectedCategory === category ? 'scale(1.05)' : 'scale(1)',
                                boxShadow: selectedCategory === category
                                    ? '0 4px 15px rgba(239, 68, 68, 0.4)'
                                    : 'none'
                            }}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Video Player Modal */}
                {selectedVideo && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                        style={{ background: 'rgba(0, 0, 0, 0.9)' }}
                        onClick={() => setSelectedVideo(null)}
                    >
                        <div
                            className="relative w-full max-w-5xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelectedVideo(null)}
                                className="absolute -top-12 right-0 text-white hover:text-red-500 transition-colors duration-300"
                            >
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                            <div className="relative" style={{ paddingBottom: '56.25%' }}>
                                <iframe
                                    className="absolute top-0 left-0 w-full h-full rounded-lg"
                                    src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1`}
                                    title={selectedVideo.title}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>
                            <div className="mt-4 text-white">
                                <h3 className="text-2xl font-bold mb-2">{selectedVideo.title}</h3>
                                <p className="text-gray-300">{selectedVideo.description}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Video Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredVideos.map((video) => (
                        <div
                            key={video.id}
                            className="group cursor-pointer rounded-xl overflow-hidden transition-all duration-300"
                            style={{
                                background: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                backdropFilter: 'blur(10px)'
                            }}
                            onClick={() => setSelectedVideo(video)}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-8px)'
                                e.currentTarget.style.boxShadow = '0 20px 40px rgba(239, 68, 68, 0.3)'
                                e.currentTarget.style.borderColor = '#ef4444'
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)'
                                e.currentTarget.style.boxShadow = 'none'
                                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'
                            }}
                        >
                            {/* Thumbnail */}
                            <div className="relative overflow-hidden" style={{ paddingBottom: '56.25%' }}>
                                <img
                                    src={video.thumbnail}
                                    alt={video.title}
                                    className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                                <div
                                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    style={{ background: 'rgba(0, 0, 0, 0.6)' }}
                                >
                                    <div
                                        className="w-16 h-16 rounded-full flex items-center justify-center"
                                        style={{ background: '#ef4444' }}
                                    >
                                        <Play className="w-8 h-8 text-white ml-1" />
                                    </div>
                                </div>
                                <div
                                    className="absolute bottom-2 right-2 px-2 py-1 rounded text-xs font-semibold"
                                    style={{ background: 'rgba(0, 0, 0, 0.8)', color: '#ffffff' }}
                                >
                                    {video.duration}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-4">
                                <div
                                    className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-2"
                                    style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444' }}
                                >
                                    {video.category}
                                </div>
                                <h3 className="text-white font-bold text-lg mb-2 line-clamp-2">
                                    {video.title}
                                </h3>
                                <p className="text-gray-400 text-sm line-clamp-2">
                                    {video.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {filteredVideos.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-gray-400 text-lg">
                            No hay videos disponibles en esta categoría
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default VideosPage
