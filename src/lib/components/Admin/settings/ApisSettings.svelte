<script>
	import { Collection, Doc } from 'sveltefire';
	import {
		getFirestore,
		collection,
		setDoc,
		deleteDoc,
		doc,
		getDoc,
		getDocs,
		query,
		orderBy,
		updateDoc,
		where
	} from 'firebase/firestore';

	/**
	 * @type {any}
	 */
	export let userId;
	import { initializeApp } from 'firebase/app';
	import firebaseConfig from '$lib/firebase/firebase.client';
	import { onMount } from 'svelte';

	const app = initializeApp(firebaseConfig);
	const firestore = getFirestore(app);
	let openAIKey = '';
	let fireWorksAIKey = '';
	let isLoading = false;

	async function getUserData() {
		const docRef = doc(firestore, `users/${userId}`);
		const docSnap = await getDoc(docRef);
		openAIKey = docSnap.data().openAIKey;
		fireWorksAIKey = docSnap.data().fireWorksAIKey;
	}

	onMount(() => {
		getUserData();
	});

	async function handleAddAPIs() {
		// Handle login logic here
		isLoading = true;

		await updateDoc(doc(firestore, 'users', userId), {
			openAIKey: openAIKey,
			fireWorksAIKey: fireWorksAIKey
		});

		isLoading = false;
	}
</script>

<Doc ref={`users/${userId}`} let:data>
	<form class="mt-8 space-y-6" on:submit|preventDefault={handleAddAPIs}>
		<div class="p-6 mt-3 bg-gray-900 rounded-lg">
			<h2 class="mb-6 text-xl font-semibold">APIs Settings</h2>
			<p class="mb-6 text-gray-400">
				Manage your X-Practica APIs. All changes in your account will be applied to all of your
				workspace.
			</p>
			<div class="grid grid-cols-2 gap-6 mb-6">
				<div>
					<label class="block mb-1 text-gray-400"> OPEN-AI Api Key </label>
					<input
						class="w-full p-2 mb-4 text-white bg-white rounded focus:border-slate-600 focus:ring-0 border-slate-700 bg-opacity-5"
						type="text"
						name="openAIKey"
						bind:value={openAIKey}
						placeholder="Open-AI Api Key"
					/>
					<label class="block mb-1 text-gray-400"> FireWorks AI Api Key </label>
					<input
						class="w-full p-2 mb-4 text-white bg-white rounded focus:border-slate-600 focus:ring-0 border-slate-700 bg-opacity-5"
						type="text"
						name="fireWorksAIKey"
						bind:value={fireWorksAIKey}
						placeholder="FireWorks AI Api Key"
					/>
					<button
						type="submit"
						class="w-full px-4 py-2 mt-4 font-bold text-white bg-red-500 rounded hover:bg-red-600"
					>
						{#if isLoading}
							Loading...
						{:else}
							UPDATE
						{/if}
					</button>
				</div>
			</div>
		</div>
	</form>
</Doc>
