import { Env } from "./types";

export const env = {
  label: 'local',
  production: false,
  useMocks:   true,    // ← flip to false when backend APIs are running
  apiBase: {
    portfolio:  'http://localhost:5001',
    analytics:  'http://localhost:5002',
    newsletter: 'http://localhost:5003',
    utilities:  'http://localhost:5004',
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