// client/src/envs/types.ts
export interface ApiBase {
  portfolio:  string;
  analytics:  string;
  newsletter: string;
  utilities:  string;
}

export interface FirebaseConfig {
  databaseURL:       string;
  apiKey:            string;
  authDomain:        string;
  projectId:         string;
  storageBucket:     string;
  messagingSenderId: string;
  appId:             string;
  measurementId?:    string;
}

export interface Env {
  label: string;
  production: boolean;
  useMocks:   boolean;    // When true, mock interceptor serves all API responses
  apiBase:    ApiBase;
  firebase:   FirebaseConfig;
}
