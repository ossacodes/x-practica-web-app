<script lang="ts">
	import {
		AppBar,
		Avatar,
		Drawer,
		getDrawerStore,
		initializeStores,
		LightSwitch,
		popup,
		type PopupSettings
	} from '@skeletonlabs/skeleton';
	import Navigation from '$lib/components/Admin/Navigation.svelte';
	import { SignedIn } from 'sveltefire';
	import { goto } from '$app/navigation';

	export let userId: any;

	initializeStores();

	const drawerStore = getDrawerStore();

	function openDrawer(): void {
		drawerStore.open();
	}

	const popupFeatured: PopupSettings = {
		// Represents the type of event that opens/closed the popup
		event: 'click',
		// Matches the data-popup value on your popup element
		target: 'popupFeatured',
		// Defines which side of your trigger the popup will appear
		placement: 'left'
	};
</script>

<Drawer width="w-52">
	<Navigation userId={userId}/>
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
		<!-- <span class="hidden text-2xl font-bold md:inline-block">App</span> -->
	</svelte:fragment>
	<div class="flex items-center flex-shrink-0 px-20 text-white">
		<h1 class="text-2xl font-semibold tracking-tight">
			X-<span class="text-[#577CFF]">Practica</span>
		</h1>
	</div>
	<svelte:fragment slot="trail">
		<LightSwitch />
		<button class="btn" use:popup={popupFeatured}>
			<Avatar initials="JD" width="w-10" background="bg-primary-500" />
		</button>

		<div class="p-4 shadow-xl card w-52" data-popup="popupFeatured">
			<SignedIn let:signOut>
				<div>
					<button
						on:click={() => {
							signOut();
							goto('/');
						}}
						class="w-full btn variant-filled"
					>
						<span>Sign Out</span>
					</button>
				</div>
				<div class="arrow bg-surface-100-800-token" />
			</SignedIn>
		</div>
	</svelte:fragment>
</AppBar>
