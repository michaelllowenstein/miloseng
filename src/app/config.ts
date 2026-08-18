import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding,
         withInMemoryScrolling, withViewTransitions } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp }   from '@angular/fire/app';
import { getAuth, provideAuth }                from '@angular/fire/auth';
import { getStorage, provideStorage }          from '@angular/fire/storage';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { analyticsInterceptor } from '@interceptors/analytics';
import { routes } from '@routes';
import { env } from '@env/env';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),

    provideRouter(
      routes,
      withComponentInputBinding(),
      withViewTransitions(),
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
      }),
    ),

    provideHttpClient(
      withFetch(),
      withInterceptors([analyticsInterceptor]),
    ),

    provideAnimationsAsync(),

    provideFirebaseApp(() => initializeApp(env.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideStorage(() => getStorage()),
  ]
};
