<script lang="ts">
	import { goto } from '$app/navigation';
	import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton';
	import SearchTextField from './SearchTextField.svelte';
	import { initializeApp } from 'firebase/app';
	import {
		getFirestore,
		collection,
		setDoc,
		doc,
		getDocs,
		query,
		orderBy,
		where
	} from 'firebase/firestore';
	import firebaseConfig from '$lib/firebase/firebase.client';
	import { Collection } from 'sveltefire';
	import { getContext, onMount } from 'svelte';
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import { sharedVariable } from '../../../routes/stores';

	let valueSingle: string = 'dashboard';

	export let userId: any;

	// const chatsDocRef = db.collection('chats').doc(userId).collection('MyAiChats');
	const app = initializeApp(firebaseConfig);
	const firestore = getFirestore(app);
	let searchValue = '';
	let chats: any = [];

	async function getNavData() {
		const collectionRef = collection(firestore, `MyChats/${userId}/RoleChats/`);
		const querySnapshot = await getDocs(query(collectionRef, orderBy('timestamp', 'asc')));
		querySnapshot.docs.forEach((doc) => {
			chats.push({
				id: doc.id,
				title: doc.data().title,
				subTitle: doc.data().subTitle,
				timestamp: doc.data().timestamp,
				time: doc.data().time
			});
			// console.log(doc.data());
		});
	}

	onMount(() => {
		getNavData();
	});

	function find(items: any, searchText: any) {
		searchText = searchText.toLowerCase().split(' ');
		return items.filter((item: any) => {
			return searchText.every((el: any) => {
				return item.title.toLowerCase().includes(el) || item.subTitle.toLowerCase().includes(el);
			});
		});
	}

	async function addChat() {
		await setDoc(doc(firestore, `MyChats/${userId}/RoleChats/${Date.now()}`), {
			title: 'New Chat',
			subTitle: 'Use any prompts to get started',
			timestamp: Date.now(),
			time: new Date()
		});
		console.log('Added Chat');
	}

	function onChatClicked(itemId: any) {
		goto(`/main/chats/${itemId}?userId=${userId}`);
		$sharedVariable = itemId;
		// Create a store and update it when necessary...
	}
</script>

<nav class="p-2">
	<ListBox rounded="rounded" class="space-y-1 list-nav">
		<div class="flex items-center justify-between mx-2 mt-5 text-2xl rounded-none">
			Chats(4)
			<button
				style="border-radius: 5px; background-color: white;"
				on:click={addChat}
				class="flex items-center justify-center bg-white hover:bg-white h-7 w-7"
				aria-label="Add Chat"
			>
				<center>
					<svg
						width="12"
						height="12"
						viewBox="0 0 12 12"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<g id="24 / basic / plus">
							<path
								id="icon"
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M6.5 5.5H11V6.5H6.5V11H5.5V6.5H1V5.5H5.5V1H6.5V5.5Z"
								fill="black"
								stroke="black"
							/>
						</g>
					</svg>
				</center>
			</button>
		</div>
		<div class="h-3"></div>
		<!-- Search Bar -->
		<div class="flex justify-center p-2">
			<div
				class="flex items-center justify-center w-full pl-3 bg-white border border-slate-700 rounded-xl bg-opacity-5"
			>
				<svg
					width="20"
					height="20"
					viewBox="0 0 14 15"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M1.1665 6.72414C1.1665 3.93099 3.4067 1.66669 6.17013 1.66669C7.49717 1.66669 8.76986 2.19952 9.70822 3.14798C10.6466 4.09644 11.1737 5.38282 11.1737 6.72414C11.1737 9.5173 8.93355 11.7816 6.17013 11.7816C3.4067 11.7816 1.1665 9.5173 1.1665 6.72414ZM11.091 10.7984L12.5812 12.0013H12.6071C12.9085 12.306 12.9085 12.8001 12.6071 13.1048C12.3056 13.4095 11.8167 13.4095 11.5153 13.1048L10.2786 11.6875C10.1617 11.5697 10.096 11.4097 10.096 11.2429C10.096 11.0761 10.1617 10.9161 10.2786 10.7984C10.5041 10.5744 10.8655 10.5744 11.091 10.7984Z"
						fill="#E7E7E7"
						fill-opacity="0.5"
					/>
				</svg>

				<input
					class="w-full bg-transparent border-0 border-none placeholder:text-sm focus:ring-0"
					title="Input (text)"
					type="text"
					placeholder="Search..."
					bind:value={searchValue}
				/>
			</div>
		</div>
		<div class="h-3"></div>
		{#if searchValue === ''}
			<Collection ref={query(collection(firestore, `MyChats/${userId}/RoleChats/`))} let:data>
				{#each data as item (item.id)}
					<a
						class="bg-white bg-opacity-5"
						style="padding: 0; border-radius: 0px;"
						href={`/main/chats/${item.id}?userId=${userId}`}
						on:click={() => onChatClicked(item.id)}
					>
						<div
							class={`flex   items-center  w-full p-4 ${$sharedVariable === item.id ? `bg-white bg-opacity-10` : ``} rounded-lg shadow `}
						>
							<!-- Lead: Avatar -->
							<div class="flex-shrink-0">
								<!-- <img class="w-12 h-12 rounded-full" src="{chat.avatar}" alt="avatar" /> -->
								<!-- {@html item.icon} -->
								<i class="ri-code-s-slash-line"></i>
							</div>

							<!-- Title and Subtitle -->
							<div class="flex flex-col justify-start w-32 ml-4">
								<div class="text-sm font-semibold truncate">{item.title}</div>
								<div class="overflow-hidden text-sm text-gray-500 truncate">
									{item.subTitle}
								</div>
							</div>

							<!-- Trailing: Time -->
							<div class="ml-auto text-sm text-gray-500">3 min ago</div>
						</div>
					</a>
				{/each}
			</Collection>
		{:else}
			{#each find(chats, searchValue) as item (item.id)}
				<a
					class="bg-white bg-opacity-5"
					style="padding: 0; border-radius: 0px;"
					href={`/main/chats/${item.id}?userId=${userId}`}
					on:click={() => onChatClicked(item.id)}
				>
					<div
						class={`flex items-center  w-full p-4 ${$sharedVariable === item.id ? `bg-white bg-opacity-10` : ``} rounded-lg shadow `}
					>
						<!-- Lead: Avatar -->
						<div class="flex-shrink-0">
							<!-- <img class="w-12 h-12 rounded-full" src="{chat.avatar}" alt="avatar" /> -->
							<!-- {@html item.icon} -->
							<i class="ri-code-s-slash-line"></i>
						</div>

						<!-- Title and Subtitle -->
						<div class="w-32 ml-4">
							<div class="text-sm font-semibold truncate">{item.title}</div>
							<div class="overflow-hidden text-sm text-gray-500 truncate">
								{item.subTitle}
							</div>
						</div>

						<!-- Trailing: Time -->
						<div class="ml-auto text-sm text-gray-500">3 min ago</div>
					</div>
				</a>
			{/each}
		{/if}
	</ListBox>
</nav>
