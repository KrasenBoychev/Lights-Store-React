import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyB-z1X_YmpiOOJhYh_nwbz8rhjsME_r-X4',
  authDomain: 'light-store-b0435.firebaseapp.com',
  projectId: 'light-store-b0435',
  storageBucket: 'light-store-b0435.appspot.com',
  messagingSenderId: '331239445540',
  appId: '1:331239445540:web:3a0cfce3efbec93a0534b1'
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);