import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAMAKWqacslQrsaZTSsQPgCbFrZ8qZ8BY4',
  authDomain: 'eventplanner-36888.firebaseapp.com',
  projectId: 'eventplanner-36888',
  storageBucket: 'eventplanner-36888.firebasestorage.app',
  messagingSenderId: '896129133200',
  appId: '1:896129133200:web:2cd7c905ea623742498615',
  measurementId: 'G-RRHD8TSXWL',
};

export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
