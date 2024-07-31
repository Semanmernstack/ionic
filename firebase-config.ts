import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';


import { provideFirebaseApp, initializeApp, FirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore, Firestore } from '@angular/fire/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyBMJ7FNY4nwhSf9Y3a6EK0tFsvaGetvHDo",
    authDomain: "new-ionic-4817e.firebaseapp.com",
    projectId: "new-ionic-4817e",
    storageBucket: "new-ionic-4817e.appspot.com",
     messagingSenderId: "771791190868",
    appId: "1:771791190868:web:62d3d7a838331858f3a6c1" 
}



export const firebaseProviders = [
    provideFirebaseApp(() => initializeApp(firebaseConfig) as FirebaseApp),
    provideFirestore(() => getFirestore() as Firestore),
  ];


  export const appConfig= {
    
  };