<script lang="ts">
	import {
		AppBar,
		Avatar,
		Drawer,
		getDrawerStore,
		initializeStores,
		LightSwitch,
		ListBox,
		ListBoxItem,
		popup,
		type PopupSettings
	} from '@skeletonlabs/skeleton';
	import Navigation from '$lib/components/Admin/Navigation.svelte';
	import { Doc, SignedIn } from 'sveltefire';
	import { goto } from '$app/navigation';
	import { CreditCard, Settings, LogOut } from 'lucide-svelte';
	import { FirebaseApp, userStore } from 'sveltefire';
	import { initializeApp } from 'firebase/app';
	import { getAuth } from 'firebase/auth';
	import firebaseConfig from '$lib/firebase/firebase.client';
	import Modal from './Modal.svelte';

	export let userId: any;

	initializeStores();

	const app = initializeApp(firebaseConfig);

	const auth = getAuth(app);

	const user = userStore(auth);

	const drawerStore = getDrawerStore();

	function openDrawer(): void {
		drawerStore.open();
	}

	let showModal = false;

	const popupProfile: PopupSettings = {
		// Represents the type of event that opens/closed the popup
		event: 'click',
		// Matches the data-popup value on your popup element
		target: 'popupProfile',
		// Defines which side of your trigger the popup will appear
		placement: 'left'
	};

	let comboboxValue: string;
	const popupCombobox: PopupSettings = {
		event: 'click',
		target: 'popupCombobox',
		placement: 'bottom',
		closeQuery: '.listbox-item'
	};
</script>

<Drawer width="w-52">
	<Navigation {userId} />
</Drawer>

<AppBar
	background="bg-transparent"
	gridColumns="grid-cols-3"
	padding="p-0"
	slotDefault="place-self-center"
	slotTrail="place-content-end"
>
	<svelte:fragment slot="lead">
		<button class="mr-4 md:hidden btm btn-sm" on:click={openDrawer}>
			<span>
				<!--?xml version="1.0" ?--><svg
					style="color: white"
					height="32px"
					id="Layer_1"
					version="1.1"
					viewBox="0 0 32 32"
					width="32px"
					xml:space="preserve"
					xmlns="http://www.w3.org/2000/svg"
					xmlns:xlink="http://www.w3.org/1999/xlink"
					><path
						d="M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2 s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2 S29.104,22,28,22z"
						fill="white"
					></path></svg
				>
			</span>
		</button>

		<div class="pl-3">
			<button class="justify-between w-48" use:popup={popupCombobox}>
				<span class="pr-3 capitalize">{comboboxValue ?? 'GPT-3.5-Turbo'}</span>
				<span>↓</span>
			</button>
		</div>

		<!-- Drop down data -->
		<div class="w-48 py-2 shadow-xl card" data-popup="popupCombobox">
			<ListBox rounded="rounded-none">
				<ListBoxItem bind:group={comboboxValue} name="medium" value="GPT-4">GPT-4</ListBoxItem>
				<ListBoxItem bind:group={comboboxValue} name="medium" value="GPT-3.5-Turbo"
					>GPT-3.5-Turbo</ListBoxItem
				>
				<ListBoxItem bind:group={comboboxValue} name="medium" value="Mixtral MoE 8x7B"
					>Mixtral MoE 8x7B</ListBoxItem
				>
				<ListBoxItem bind:group={comboboxValue} name="medium" value="Llama 2 70B Chat"
					>Llama 2 70B Chat</ListBoxItem
				>
			</ListBox>
			<div class="arrow bg-surface-100-800-token" />
		</div>

		<!-- <span class="hidden text-2xl font-bold md:inline-block">App</span> -->
	</svelte:fragment>
	<div class="flex items-center flex-shrink-0 px-20 text-white">
		<h1 class="text-2xl font-semibold tracking-tight">
			X-<span class="text-[#577CFF]">Practica</span>
		</h1>
	</div>
	<svelte:fragment slot="trail">
		<LightSwitch />
		<button class="btn" use:popup={popupProfile}>
			<Avatar initials="JD" width="w-10" background="bg-primary-500" />
		</button>

		<div class="p-4 shadow-xl card w-52" data-popup="popupProfile">
			<SignedIn let:signOut>
				<div class="space-y-2">
					<Doc ref={`users/${$user?.uid}`} let:data>
						<div class="flex min-w-0 gap-x-4">
							<div class="flex-auto min-w-0">
								<p class="text-lg font-semibold leading-6 text-white">{data.username}</p>
								<p class="mt-1 text-xs leading-5 text-gray-500 truncate">
									{$user?.email}
								</p>
							</div>
						</div>
					</Doc>

					<div class="h-[1px] bg-gray-600"></div>

					<div class="flex items-center px-3 cursor-pointer hover:bg-opacity-5 hover:bg-gray-200">
						<CreditCard />
						<a href="/main/billing" class="flex items-center p-2 rounded-lg">
							<!-- Add your icon here -->
							<span class="ml-2">Billing</span>
						</a>
					</div>
					<div class="flex items-center px-3 cursor-pointer hover:bg-opacity-5 hover:bg-gray-200">
						<Settings />
						<a href="/main/chats/Settings" class="flex items-center p-2 rounded-lg">
							<!-- Add your icon here -->
							<span class="ml-2">Settings</span>
						</a>
					</div>

					<div class="flex items-center px-3 cursor-pointer hover:bg-opacity-5 hover:bg-gray-200">
						<LogOut />
						<button
							on:click={() => {
								signOut();
								goto('/');
							}}
							class="flex items-center p-2 rounded-lg"
						>
							<!-- Add your icon here -->
							<span class="ml-2">Logout</span>
						</button>
					</div>
				</div>
			</SignedIn>
		</div>
	</svelte:fragment>
</AppBar>
