export const API_BASE_URL = 'http://localhost:3000/api/v1';

export const LANGUAGES = {
  qu: {
    code: 'qu',
    name: 'Quechua',
    nativeName: 'Runa Simi',
    flag: '🏔️'
  },
  es: {
    code: 'es', 
    name: 'Spanish',
    nativeName: 'Español',
    flag: '🇪🇸'
  }
};

export const TRANSLATION_DIRECTIONS = [
  { from: 'qu', to: 'es', label: 'Quechua → Español' },
  { from: 'es', to: 'qu', label: 'Español → Quechua' }
];

export const MAX_TEXT_LENGTH = 5000;
export const MIN_TEXT_LENGTH = 1;

export const CONFIDENCE_LEVELS = {
  HIGH: 0.8,
  MEDIUM: 0.5,
  LOW: 0.2
};

export const STORAGE_KEYS = {
  TRANSLATION_HISTORY: 'translation_history',
  USER_PREFERENCES: 'user_preferences',
  RECENT_TRANSLATIONS: 'recent_translations'
};

export const UI_MESSAGES = {
  LOADING: 'Traduciendo...',
  ERROR: 'Error en la traducción',
  SUCCESS: 'Traducción completada',
  EMPTY_TEXT: 'Ingresa texto para traducir',
  NETWORK_ERROR: 'Error de conexión',
  SERVER_ERROR: 'Error del servidor'
};

export const EXAMPLE_TEXTS = {
  qu: [
    'Napaykullayki',
    'Imaynalla kashanki',
    'Allinmi kasani',
    'Mama warmi',
    'Inti sumaq',
    'Munakuyki'
  ],
  es: [
    'Hola',
    '¿Cómo estás?',
    'Estoy bien',
    'Mujer madre',
    'Sol hermoso',
    'Te amo'
  ]
};