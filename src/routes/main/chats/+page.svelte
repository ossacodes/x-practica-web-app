<script>
// @ts-nocheck

	import Appbar from '$lib/components/Admin/Appbar.svelte';
	import ChatSection from '$lib/components/Admin/ChatSection.svelte';
	import PromptTextField from '$lib/components/Admin/PromptTextField.svelte';
	import { AppShell } from '@skeletonlabs/skeleton';
	import { getContext } from 'svelte';
    import { FirebaseApp, userStore } from 'sveltefire';
	import { initializeApp } from 'firebase/app';
    import { getAuth } from 'firebase/auth';
	import firebaseConfig from '$lib/firebase/firebase.client';

	// const user = getContext('user');

	// console.log('user id: ' + user.uid);

    // Initialize Firebase
	const app = initializeApp(firebaseConfig);

	const auth = getAuth(app);

	const user = userStore(auth);
    
    // console.log($user?.uid);
</script>

<div>
	<AppShell slotPageContent="">
		<!-- (sidebarLeft) -->
		<!-- (sidebarRight) -->
		<!-- (pageHeader) -->
		<!-- Router Slot -->
		<!-- <slot /> -->
		<div class="flex flex-col h-screen">
			<Appbar />
			<!-- <ChatSection /> -->
			<PromptTextField userId={$user?.uid} />
		</div>

		<!-- ---- / ---- -->
		<!-- (pageFooter) -->
		<!-- (footer) -->
	</AppShell>
</div>
