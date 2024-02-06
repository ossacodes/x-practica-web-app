<script>
	// @ts-nocheck

	import { page } from '$app/stores';
	import PromptTextField from '$lib/components/Admin/PromptTextField.svelte';
	import firebaseConfig from '$lib/firebase/firebase.client';
	import { FirebaseApp, userStore } from 'sveltefire';
	import { initializeApp } from 'firebase/app';
	import { getAuth } from 'firebase/auth';
	import Appbar from '$lib/components/Admin/Appbar.svelte';
	import { AppShell } from '@skeletonlabs/skeleton';
	import { sharedVariable } from '../../../stores';
	import Navigation from '$lib/components/Admin/Navigation.svelte';

	// /** @type {import('./$types').PageData} */
	// export let data;

	const app = initializeApp(firebaseConfig);

	const auth = getAuth(app);

	const user = userStore(auth);

	$sharedVariable = $page.params.slug;
</script>

<!-- <h1>
	{$page.params.slug}
</h1> -->

<!-- svelte-ignore missing-declaration -->
<AppShell slotPageContent="">
	<!-- (sidebarLeft) -->
	<!-- (sidebarRight) -->
	<!-- (pageHeader) -->
	<!-- Router Slot -->
	<svelte:fragment slot="sidebarLeft">
		<div class="flex flex-col h-screen">
			<Navigation userId={$user?.uid} />
		</div>
	</svelte:fragment>
	<!-- <slot /> -->
	<div class="flex flex-col h-screen">
		<Appbar />
		<!-- <ChatSection /> -->
		<!-- <PromptTextField userId={$user?.uid} chatId={$page.params.slug} chatData={data.chatData.data} messageHistory={data.chatData.messageHistory}/> -->
		<PromptTextField userId={$user?.uid} chatId={$page.params.slug} />
	</div>

	<!-- ---- / ---- -->
	<!-- (pageFooter) -->
	<!-- (footer) -->
</AppShell>
