import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding,
         withInMemoryScrolling, withViewTransitions } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp }   from '@angular/fire/app';
import { getAuth, provideAuth }                from '@angular/fire/auth';
import { getFirestore, provideFirestore }      from '@angular/fire/firestore';
import { getStorage, provideStorage }          from '@angular/fire/storage';
import { analyticsInterceptor } from '@interceptors/analytics';
import { routes } from '@routes';
import { env } from '@env/env';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(
      routes,
      withComponentInputBinding(),
      withViewTransitions(),
      withInMemoryScrolling({ scrollPositionRestoration: 'top' }),
    ),
    provideHttpClient(
      withFetch(),
      withInterceptors([analyticsInterceptor]),
    ),
    provideAnimationsAsync(),
    provideFirebaseApp(() => initializeApp(env.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
  ]
};
