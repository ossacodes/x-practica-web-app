import admin from 'firebase-admin';
import 'dotenv/config'

// import serviceAccount from '../../../hugb-db-firebase-adminsdk-qq3o0-59a21e57c6.json';

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
	admin.initializeApp({
        credential: admin.credential.cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        }),
	});
}

export const db = admin.firestore();
