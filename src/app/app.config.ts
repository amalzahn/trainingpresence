import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';

import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';

import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { LOCALE_ID, importProvidersFrom } from '@angular/core';

import { SharedService } from './shared.service';

const firebaseConfig = {
  apiKey: "AIzaSyD1wLQ0bnyX3Es6k6bcFWA1z49gaL8GKXY",
  authDomain: "volleyfb-3d62e.firebaseapp.com",
  projectId: "volleyfb-3d62e",
  storageBucket: "volleyfb-3d62e.appspot.com",
  messagingSenderId: "319193271898",
  appId: "1:319193271898:web:fca52e0af91f17096fd263"
};

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(BrowserModule, provideFirebaseApp(() => initializeApp(firebaseConfig)), provideFirestore(() => getFirestore())),
    SharedService,
    { provide: LOCALE_ID, useValue: 'de-DE' },
    provideRouter(routes),
    provideAnimations()
  ]
};
