// Import the functions you need from the SDKs you need
import { deleteApp, getApp, getApps, initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: import.meta.env.VITE__APIKEY,
	authDomain: import.meta.env.VITE__AUTHDOMAIN,
	projectId: import.meta.env.VITE__PROJECTID,
	storageBucket: import.meta.env.VITE__PROJECTBUCKET,
	messagingSenderId: import.meta.env.VITE__MESSAGINGSENDERID,
	appId: import.meta.env.VITE__APPID
};

// Initialize Firebase
let firebaseApp;
if (!getApps().length) {
	firebaseApp = initializeApp(firebaseConfig);
} else {
	firebaseApp = getApp();
	deleteApp(firebaseApp);
	firebaseApp = initializeApp(firebaseConfig);
}

export default firebaseConfig;

export const db = firebaseApp;

export const auth = getAuth(firebaseApp);
