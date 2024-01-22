<script lang="ts">
	import '../../../app.postcss';
	import Navigation from '$lib/components/Admin/Navigation.svelte';
	import {
		AppShell,
		Toast,
		getDrawerStore,
		initializeStores,
		storePopup
	} from '@skeletonlabs/skeleton';

	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';

	import { FirebaseApp, userStore } from 'sveltefire';
	import { initializeApp } from 'firebase/app';
	import { getFirestore } from 'firebase/firestore';
	import { getAuth } from 'firebase/auth';
	import firebaseConfig from '$lib/firebase/firebase.client';
	import Appbar from '$lib/components/Admin/Appbar.svelte';
	import { goto } from '$app/navigation';
	import 'remixicon/fonts/remixicon.css';
	import PromptTextField from '$lib/components/Admin/PromptTextField.svelte';

	initializeStores();

	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	// Initialize Firebase
	const app = initializeApp(firebaseConfig);
	const firestore = getFirestore(app);
	const auth = getAuth(app);

	const user = userStore(auth);
	// if ($user?.uid == null) {
	// 	goto('/');
	// }
	let currentMessage = '';
</script>

<Toast />

<FirebaseApp {auth} {firestore}>
	{#if $user?.uid != null}
		<AppShell slotSidebarLeft="w-0 md:w-72 bg-surface-500/10">
			<!-- <svelte:fragment slot="header">
				<Appbar />
			</svelte:fragment> -->
			<svelte:fragment slot="sidebarLeft">
				<Navigation />
			</svelte:fragment>
			<!-- Router Slot -->
			<div class="w-full p-0">
				<slot />
			</div>

			<!-- ---- / ---- -->
			<!-- <svelte:fragment slot="pageFooter"> -->

				<!-- <div
					class="input-group input-group-divider grid-cols-[auto_1fr_auto] rounded-container-token"
				>
					<button class="input-group-shim">+</button>
					<textarea
						bind:value={currentMessage}
						class="h-auto bg-transparent border-0 resize-none ring-0"
						name="prompt"
						id="prompt"
						placeholder="Write a message..."
						rows="1"
					/>
					<button class="variant-filled-primary">Send</button>
				</div> -->
			<!-- </svelte:fragment> -->
			<!-- (footer) -->
		</AppShell>
	{:else}
		<AppShell
			slotSidebarLeft="w-0 md:w-52 bg-surface-500/10"
			slotPageFooter="h-20 bg-surface-500/15"
		>
			<slot />
		</AppShell>
	{/if}
</FirebaseApp>
