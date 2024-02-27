<script>
	// @ts-nocheck

	import { onMount, getContext } from 'svelte';
	import { writable } from 'svelte/store';
	import { currentUserId } from '$lib/userState';
	import firebaseConfig, { db } from '$lib/firebase/firebase.client';
	import { initializeApp } from 'firebase/app';
	import { getFirestore, collection, getDocs, query, orderBy } from 'firebase/firestore';
	import CompCard from './CompCard.svelte';
	import { Paperclip, StopCircle } from 'lucide-svelte';
	import Dropdown from './Dropdown.svelte';
	import { navigating } from '$app/stores';
	import Loader from './Loader.svelte';
	import { useChat } from 'ai/svelte';
	import ChatLoader from './ChatLoader.svelte';
	import LoadInput from './LoadInput.svelte';

	export let userId;
	export let chatId;

	let showDropdown = false;
	let position = { x: 0, y: 0 };
	let items = ['Copy', 'Reply', 'Text to Speech', 'Delete'];
	let isPageLoading = false;
	let data = [];
	let messageHistory = [];
	let aiChatId;
	let isGenerating = true;

	const handleRightClick = (event) => {
		event.preventDefault();
		position = { x: event.clientX, y: event.clientY };
		showDropdown = true;
	};

	const handleClickOutside = () => {
		showDropdown = false;
	};
	const app = initializeApp(firebaseConfig);
	const firestore = getFirestore(app);

	let hasData = false;

	async function fetchData() {
		isPageLoading = true;
		try {
			const collectionRef = collection(firestore, `chats/${userId}/${chatId}`);
			const querySnapshot = await getDocs(query(collectionRef, orderBy('timestamp', 'asc')));
			data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
			messageHistory = querySnapshot.docs.map((doc) => ({
				role: doc.data().role,
				content: doc.data().content
			}));
			hasData = querySnapshot.docs.length > 0;

			// Add delay
			await new Promise((resolve) => setTimeout(resolve, 600));
		} catch (error) {
			console.error('Error fetching data: ', error);
		} finally {
			isPageLoading = false;
		}
	}

	let messages, handleSubmit, input, isLoading, stop, setMessages;

	onMount(async () => {
		fetchData();
	});

	let isDataFetched = false;

	$: chatId, (isDataFetched = false);

	$: if (chatId && !isDataFetched) {
		isPageLoading = true;
		({ messages, handleSubmit, input, isLoading, stop, setMessages } = useChat({
			api: 'http://localhost:5173/main/chats',
			body: {
				userId: userId,
				chatId: chatId,
				messageHistory: messageHistory
			},
			initialMessages: data
		}));
		console.log('chatId', chatId);
		data = [];
		messageHistory = [];
		setMessages([]);
		(async () => {
			await fetchData();
			isDataFetched = true;
			isPageLoading = false;
		})();
	}

	let isDragging = false;

	function onDragOver(event) {
		event.preventDefault();
		isDragging = true;
	}

	function onDragLeave(event) {
		isDragging = false;
	}

	function onDrop(event) {
		event.preventDefault();
		isDragging = false;
		const files = event.dataTransfer.files;
		if (files.length > 0) {
			console.log('Dropped files:', files);
		}
	}
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->

<!-- svelte-ignore a11y-no-static-element-interactions -->
{#if isPageLoading}
	<div class="flex items-center justify-center flex-1 overflow-y-auto">
		<Loader />
	</div>
{:else}
	<div
		class:highlight={isDragging}
		on:dragover={onDragOver}
		on:dragleave={onDragLeave}
		on:drop={onDrop}
		class="flex flex-col-reverse items-center justify-start flex-1 overflow-y-auto"
	>
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		{#if isDragging}
			<div class="border-2 border-gray-400 border-dashed rounded-lg sm:w-full lg:w-1/2 h-52">
				Drop files here
			</div>
		{/if}
		<div
			class={`${isDragging === true ? 'pointer-events-none' : ''} flex flex-col justify-center space-y-4  sm:w-full lg:w-1/2`}
		>
			{#if data.length > 0}
				<ul>
					{#each data as message (message.id)}
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<div
							on:click={handleClickOutside}
							class={`flex mt-5 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
						>
							<div
								on:contextmenu={handleRightClick}
								on:click={handleClickOutside}
								class={`p-2 max-w-lg rounded-lg ${message.role === 'user' ? 'bg-blue-800 bg-opacity-30 text-white' : 'bg-gray-200 bg-opacity-5 text-gray'}`}
							>
								<CompCard {message} />
							</div>
							{#if showDropdown}
								<Dropdown {items} {position} messageId={message.id} />
							{/if}
						</div>
					{/each}
				</ul>
			{:else}
				<div></div>
			{/if}

			{#if $messages.length > 0}
				{#each $messages as message}
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<div
						on:click={handleClickOutside}
						class={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
					>
						<div
							on:contextmenu={handleRightClick}
							on:click={handleClickOutside}
							class={`p-2 max-w-lg rounded-lg ${message.role === 'user' ? 'bg-blue-800 bg-opacity-30 text-white' : 'bg-gray-200 bg-opacity-5 text-gray'}`}
						>
							<CompCard {message} />
						</div>
						{#if showDropdown}
							<Dropdown {items} {position} />
						{/if}
					</div>
				{/each}
			{/if}

			{#if $isLoading}
				<div class="flex items-center justify-start flex-1 overflow-y-auto">
					<ChatLoader />
				</div>
			{:else}
				<div></div>
			{/if}
		</div>
	</div>
{/if}

{#if isPageLoading}
	<LoadInput />
{:else}
	{#if data.length === 0 && $messages.length === 0 && !$isLoading}
		<center>
			<div class="grid items-end justify-center w-1/2 grid-flow-col grid-rows-2 gap-3 px-2 ">
				<div class="flex items-center justify-start h-20 min-w-full px-5 border rounded-lg hover:bg-slate-400 hover:bg-opacity-10 bg-slate-500 bg-opacity-5 border-opacity-10 border-slate-100">
					<div class="flex min-w-0 gap-x-4">
						<div class="flex flex-col items-start min-w-0">
							<p class="text-sm font-semibold leading-6 text-white">Give me a workout plan</p>
							<p class="w-full mt-1 text-xs leading-5 text-gray-500 truncate">
								Create a workout plan for resistance training
							</p>
						</div>
					</div>
				</div>
				
				<div class="flex items-center justify-start h-20 min-w-full px-5 border rounded-lg hover:bg-slate-400 hover:bg-opacity-10 bg-slate-500 bg-opacity-5 border-opacity-10 border-slate-100">
					<div class="flex min-w-0 gap-x-4">
						<div class="flex flex-col items-start min-w-0">
							<p class="text-sm font-semibold leading-6 text-white">Fun Facts</p>
							<p class="w-full mt-1 text-xs leading-5 text-gray-500 truncate">
								Tell me a fun fact about the Golden State Warriors
							</p>
						</div>
					</div>
				</div>
		

				<div class="flex items-center justify-start h-20 min-w-full px-5 border rounded-lg hover:bg-slate-400 hover:bg-opacity-10 bg-slate-500 bg-opacity-5 border-opacity-10 border-slate-100">
					<div class="flex min-w-0 gap-x-4">
						<div class="flex flex-col items-start min-w-0">
							<p class="text-sm font-semibold leading-6 text-white">Creativity Ideas</p>
							<p class="w-full mt-1 text-xs leading-5 text-gray-500 truncate">
								Brainstorm incentives for a customer loyalty program in a small bookstore
							</p>
						</div>
					</div>
				</div>

				<div class="flex items-center justify-start h-20 min-w-full px-5 border rounded-lg hover:bg-slate-400 hover:bg-opacity-10 bg-slate-500 bg-opacity-5 border-opacity-10 border-slate-100">
					<div class="flex min-w-0 gap-x-4">
						<div class="flex flex-col items-start min-w-0">
							<p class="text-sm font-semibold leading-6 text-white">Coding Flow</p>
							<p class="w-full mt-1 text-xs leading-5 text-gray-500 truncate">
								Show me a code snippet of a website's sticky header
							</p>
						</div>
					</div>
				</div>

			</div>
		</center>
	{/if}
	<form on:submit={handleSubmit}>
		<div class="flex justify-center pt-2 pb-6">
			<div
				class="flex items-center justify-center px-2 bg-white border sm:w-full lg:w-1/2 border-slate-700 rounded-xl bg-opacity-5"
			>
				<button>
					<Paperclip class="m-3" size={26} />
				</button>

				<input
					class="w-full h-12 bg-transparent border-0 border-none placeholder:text-lg focus:ring-0"
					title="Input (text)"
					type="text"
					placeholder="Send a message..."
					bind:value={$input}
				/>
				{#if $isLoading}
					<button on:click={stop}>
						<StopCircle class="m-3" size={32} />
					</button>
				{:else}
					<button type="submit">
						<svg
							class="m-4"
							width="26"
							height="26"
							viewBox="0 0 31 30"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M29.2482 1.75998C28.519 1.01477 27.4398 0.739145 26.4336 1.03081L2.96899 7.8106C1.90733 8.10519 1.15482 8.94664 0.952117 10.0141C0.745033 11.1021 1.46837 12.4846 2.41337 13.0621L9.75024 17.5421C10.5027 18.0029 11.474 17.8877 12.0967 17.2635L20.4982 8.86206C20.9211 8.4231 21.6211 8.4231 22.044 8.86206C22.4669 9.28352 22.4669 9.97039 22.044 10.4079L13.628 18.8094C13.0038 19.4335 12.8871 20.4019 13.3465 21.1558L17.8294 28.5204C18.3544 29.3939 19.2586 29.8912 20.2502 29.8912C20.3669 29.8912 20.4982 29.8912 20.6148 29.8752C21.7523 29.7308 22.6565 28.9564 22.9919 27.8627L29.9482 4.57456C30.2544 3.58289 29.9773 2.50373 29.2482 1.75998"
								fill="white"
							/>
							<path
								opacity="0.4"
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M2.39026 22.5114C2.11026 22.5114 1.83026 22.4049 1.61734 22.1905C1.19005 21.7633 1.19005 21.072 1.61734 20.6447L3.60797 18.6526C4.03526 18.2268 4.72797 18.2268 5.15526 18.6526C5.58109 19.0799 5.58109 19.7726 5.15526 20.1999L3.16318 22.1905C2.95026 22.4049 2.67026 22.5114 2.39026 22.5114ZM7.87534 24.2503C7.59534 24.2503 7.31534 24.1438 7.10243 23.9295C6.67514 23.5022 6.67514 22.8109 7.10243 22.3836L9.09305 20.3915C9.52034 19.9657 10.2131 19.9657 10.6403 20.3915C11.0662 20.8188 11.0662 21.5115 10.6403 21.9388L8.64826 23.9295C8.43534 24.1438 8.15534 24.2503 7.87534 24.2503ZM8.24532 29.4536C8.45824 29.668 8.73824 29.7745 9.01824 29.7745C9.29824 29.7745 9.57824 29.668 9.79116 29.4536L11.7832 27.463C12.2091 27.0357 12.2091 26.343 11.7832 25.9157C11.3559 25.4899 10.6632 25.4899 10.2359 25.9157L8.24532 27.9078C7.81803 28.3351 7.81803 29.0263 8.24532 29.4536Z"
								fill="white"
							/>
						</svg>
					</button>
				{/if}
			</div>
		</div>
	</form>
{/if}

<style>
	.highlight {
		background-color: #f0f0f0; /* Highlight color when dragging files over */
		opacity: 0.1;
	}
</style>
