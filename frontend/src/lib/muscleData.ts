export const muscleData = {
  pecho: {
    name: 'Pecho',
    description: 'El pecho es uno de los grupos musculares más importantes del tren superior. Incluye el pectoral mayor y menor.',
    exercises: [
      {
        id: '1',
        name: 'Press de Banca',
        description: 'Ejercicio fundamental para desarrollar el pecho',
        difficulty: 'intermediate' as const,
        videoUrl: 'https://example.com/press-banca.mp4',
        thumbnailUrl: 'https://via.placeholder.com/300x200',
      },
      {
        id: '2',
        name: 'Aperturas con Mancuernas',
        description: 'Excelente para aislar el pecho',
        difficulty: 'beginner' as const,
        videoUrl: 'https://example.com/aperturas.mp4',
        thumbnailUrl: 'https://via.placeholder.com/300x200',
      },
    ],
  },
  espalda: {
    name: 'Espalda',
    description: 'La espalda comprende múltiples grupos musculares incluyendo dorsales, trapecios y romboides.',
    exercises: [
      {
        id: '3',
        name: 'Dominadas',
        description: 'Ejercicio compuesto para toda la espalda',
        difficulty: 'advanced' as const,
        videoUrl: 'https://example.com/dominadas.mp4',
        thumbnailUrl: 'https://via.placeholder.com/300x200',
      },
      {
        id: '4',
        name: 'Remo con Barra',
        description: 'Desarrolla grosor en la espalda',
        difficulty: 'intermediate' as const,
        videoUrl: 'https://example.com/remo.mp4',
        thumbnailUrl: 'https://via.placeholder.com/300x200',
      },
    ],
  },
  hombros: {
    name: 'Hombros',
    description: 'Los deltoides son esenciales para la movilidad y fuerza del hombro.',
    exercises: [
      {
        id: '5',
        name: 'Press Militar',
        description: 'Ejercicio principal para hombros',
        difficulty: 'intermediate' as const,
        videoUrl: 'https://example.com/press-militar.mp4',
        thumbnailUrl: 'https://via.placeholder.com/300x200',
      },
    ],
  },
  biceps: {
    name: 'Bíceps',
    description: 'Músculo frontal del brazo, responsable de la flexión del codo.',
    exercises: [
      {
        id: '6',
        name: 'Curl con Barra',
        description: 'Ejercicio básico para bíceps',
        difficulty: 'beginner' as const,
        videoUrl: 'https://example.com/curl-barra.mp4',
        thumbnailUrl: 'https://via.placeholder.com/300x200',
      },
    ],
  },
  triceps: {
    name: 'Tríceps',
    description: 'Músculo posterior del brazo, responsable de la extensión del codo.',
    exercises: [
      {
        id: '7',
        name: 'Fondos en Paralelas',
        description: 'Excelente para desarrollar tríceps',
        difficulty: 'intermediate' as const,
        videoUrl: 'https://example.com/fondos.mp4',
        thumbnailUrl: 'https://via.placeholder.com/300x200',
      },
    ],
  },
  abdominales: {
    name: 'Abdominales',
    description: 'El core es fundamental para la estabilidad y fuerza funcional.',
    exercises: [
      {
        id: '8',
        name: 'Plancha',
        description: 'Ejercicio isométrico para core',
        difficulty: 'beginner' as const,
        videoUrl: 'https://example.com/plancha.mp4',
        thumbnailUrl: 'https://via.placeholder.com/300x200',
      },
    ],
  },
  cuadriceps: {
    name: 'Cuádriceps',
    description: 'Grupo muscular frontal de las piernas, esencial para la extensión de rodilla.',
    exercises: [
      {
        id: '9',
        name: 'Sentadillas',
        description: 'El rey de los ejercicios de pierna',
        difficulty: 'intermediate' as const,
        videoUrl: 'https://example.com/sentadillas.mp4',
        thumbnailUrl: 'https://via.placeholder.com/300x200',
      },
    ],
  },
  isquiotibiales: {
    name: 'Isquiotibiales',
    description: 'Músculos posteriores del muslo, importantes para la flexión de rodilla.',
    exercises: [
      {
        id: '10',
        name: 'Peso Muerto Rumano',
        description: 'Excelente para isquiotibiales',
        difficulty: 'advanced' as const,
        videoUrl: 'https://example.com/peso-muerto.mp4',
        thumbnailUrl: 'https://via.placeholder.com/300x200',
      },
    ],
  },
  gluteos: {
    name: 'Glúteos',
    description: 'Músculos más grandes del cuerpo, fundamentales para la extensión de cadera.',
    exercises: [
      {
        id: '11',
        name: 'Hip Thrust',
        description: 'Mejor ejercicio para glúteos',
        difficulty: 'intermediate' as const,
        videoUrl: 'https://example.com/hip-thrust.mp4',
        thumbnailUrl: 'https://via.placeholder.com/300x200',
      },
    ],
  },
  pantorrillas: {
    name: 'Pantorrillas',
    description: 'Músculos de la parte inferior de la pierna.',
    exercises: [
      {
        id: '12',
        name: 'Elevación de Talones',
        description: 'Ejercicio básico para pantorrillas',
        difficulty: 'beginner' as const,
        videoUrl: 'https://example.com/elevacion-talones.mp4',
        thumbnailUrl: 'https://via.placeholder.com/300x200',
      },
    ],
  },
};
