// // @ts-nocheck

// import firebaseConfig from '$lib/firebase/firebase.client';
// import { initializeApp } from 'firebase/app';
// import { getFirestore, collection, getDocs, query, orderBy } from 'firebase/firestore';

// /** @type {import('./$types').PageLoad} */ export async function load({ params, url  }) {
// 	/**
// 	 * @type {string | any[]}
// 	 */
// 	let data = [];

// 	let userId = url.searchParams.get('userId');

// 	/**
// 	 * @type {{ role: any; content: any; }[]}
// 	 */
// 	let messageHistory = [];

// 	const app = initializeApp(firebaseConfig);
// 	// @ts-ignore
// 	const firestore = getFirestore(app);

// 	console.log('params user id: ', userId, 'params slug: ', params.slug);

// 	// const snapshot = await db.collection('chats').doc(userId).collection('MyAiChats').get();
// 	// const data = snapshot.docs.map((doc) => doc.data());
// 	// @ts-ignore
// 	const collectionRef = collection(firestore, `chats/${userId}/${params.slug}`);
// 	const querySnapshot = await getDocs(query(collectionRef, orderBy('timestamp', 'asc')));
// 	data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
// 	querySnapshot.docs.forEach((doc) => {
// 		messageHistory.push({
// 			role: doc.data().role,
// 			content: doc.data().content
// 		});
// 	});

// 	return {
// 		chatData: {
// 			data: data,
// 			messageHistory: messageHistory,
// 		}
// 	};
// }
