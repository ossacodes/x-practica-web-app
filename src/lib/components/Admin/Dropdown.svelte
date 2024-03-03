<!-- src/lib/Dropdown.svelte -->
<script lang="ts">
	import { fly } from 'svelte/transition';
	import { Copy, Reply, Mic, Trash } from 'lucide-svelte';
	import { clipboard } from '@skeletonlabs/skeleton';
	import {
		getFirestore,
		collection,
		setDoc,
		deleteDoc,
		doc,
		getDocs,
		query,
		orderBy,
		where
	} from 'firebase/firestore';
	import { initializeApp } from 'firebase/app';
	import firebaseConfig from '$lib/firebase/firebase.client';
	import { Toast, getToastStore, initializeStores } from '@skeletonlabs/skeleton';
	import type { ToastSettings } from '@skeletonlabs/skeleton';

	export let messageId: any;

	export let items: any = [];
	export let position = { x: 0, y: 0 };

	export let closeDropdown: any;

	export let messageContent: any;


	export let chatId: any;

	export let userId: any;

	export let fetchData: any;

	const toastStore = getToastStore();

	// $: if (messageId) {
	// 	console.log(`Message ID: ${messageId}`);
	// }
	const app = initializeApp(firebaseConfig);
	const firestore = getFirestore(app);

	/**
	 * @param {any} messageId
	 */
	async function deleteMessage(messageId: any) {
		// const collectionRef = collection(firestore, `chats/${userId}/${chatId}/${messageId}`);
		// const querySnapshot = await getDocs(query(collectionRef, orderBy('timestamp', 'asc')));
		// querySnapshot.docs.forEach(async (doc) => {
		// 	const docRef = doc.ref;
		// 	await deleteDoc(docRef);
		// });
		await deleteDoc(doc(firestore, `chats/${userId}/${chatId}/${messageId}`));
		fetchData();
		const t: ToastSettings = {
			message: 'Successfully deleted!',
			// Provide any utility or variant background style:
			background: 'variant-filled-success',
			timeout: 2000
		};

		toastStore.trigger(t);
		console.log('Deleted Chat Message');
	}

	const handleClick = (item: any) => {
		// Handle click event on dropdown items
		console.log(`Clicked on ${item} ${messageId}`);
		switch (item) {
			case 'Copy':
				return Copy;
			case 'Reply':
				return Reply;
			case 'Text to Speech':
				return Mic;
			case 'Delete':
				deleteMessage(messageId);
				closeDropdown();
				return Trash;
			default:
				return null;
		}
		// closeDropdown();
	};

	const getIcon = (item: any) => {
		switch (item) {
			case 'Copy':
				return Copy;
			case 'Reply':
				return Reply;
			case 'Text to Speech':
				return Mic;
			case 'Delete':
				return Trash;
			default:
				return null;
		}
	};
</script>

<div
	class="absolute z-10 flex flex-col justify-center p-1 overflow-hidden bg-black rounded-md shadow-sm"
	style={`top: ${position.y}px; left: ${position.x}px;`}
	in:fly={{ y: 10, duration: 200 }}
>
	{#each items as item}
		{#if item === 'Copy'}
			<button
				class="flex flex-row px-4 py-2 text-gray-200 cursor-pointer hover:text-gray-700 hover:bg-gray-100"
				on:click={() => handleClick(item)}
				use:clipboard={messageContent}
				on:copyComplete={() => closeDropdown()}
			>
				<svelte:component this={getIcon(item)} class="mr-3" size={25} />
				{item}
			</button>
		{:else}
			<button
				class="flex flex-row px-4 py-2 text-gray-200 cursor-pointer hover:text-gray-700 hover:bg-gray-100"
				on:click={() => handleClick(item)}
			>
				<svelte:component this={getIcon(item)} class="mr-3" size={25} />
				{item}
			</button>
		{/if}
	{/each}
</div>

<style>
	/* Additional custom styles if needed */
</style>
