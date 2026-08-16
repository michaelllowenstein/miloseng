import { Env } from "./types";

export const env = {
  label: 'prod',
  production: true,
  useMocks:   false,   // never mock in production
  apiBase: {
    portfolio:  '/api/portfolio',
    analytics:  '/api/analytics',
    newsletter: '/api/newsletter',
    utilities:  '/api/utilities',
  },
  firebase: {
    apiKey:            'AIzaSyAhaBNAJVSz8DiI1N1ysgxz5b_KQlV6CEg',
    authDomain:        'miloseng.firebaseapp.com',
    databaseURL:       'https://miloseng-default-rtdb.firebaseio.com',
    projectId:         'miloseng',
    storageBucket:     'miloseng.firebasestorage.app',
    messagingSenderId: '477215342319',
    appId:             '1:477215342319:web:ac8ab95d9bfb19c25be51a',
    measurementId:     'G-F5Q6746ZP9',
  },
} satisfies Env;