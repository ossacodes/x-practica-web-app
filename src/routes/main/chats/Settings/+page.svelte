<script>
	import Account from '$lib/components/Admin/settings/Account.svelte';
	import ApisSettings from '$lib/components/Admin/settings/ApisSettings.svelte';
	import Billing from '$lib/components/Admin/settings/Billing.svelte';
	import ChangePassword from '$lib/components/Admin/settings/ChangePassword.svelte';
	import { Tab, TabGroup } from '@skeletonlabs/skeleton';
	let tabSet = 0;
	import { Collection, userStore } from 'sveltefire';
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
	import { getAuth } from 'firebase/auth';

	const app = initializeApp(firebaseConfig);
	const firestore = getFirestore(app);

	const auth = getAuth(app);

	const user = userStore(auth);
</script>

<div class="flex flex-col h-screen">
	<!-- <span class="text-3xl"> Settings </span> -->
	<div class="flex-1 p-10">
		<div class="flex items-center justify-between mb-5">
			<h1 class="text-2xl font-semibold">Settings</h1>
			<div class="flex items-center">
				<i class="mr-4 text-gray-400 fas fa-bell"> </i>
				<img
					alt="User profile image"
					class="w-10 h-10 mb-4 rounded-full"
					src="https://images.unsplash.com/photo-1542157565-4607d82cf417?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDM4fDZzTVZqVExTa2VRfHxlbnwwfHx8fHw%3D"
				/>
			</div>
		</div>

		<TabGroup>
			<Tab bind:group={tabSet} name="tab1" value={0}>
				<span>Account</span>
			</Tab>
			<Tab bind:group={tabSet} name="tab2" value={1}>Password</Tab>
			<Tab bind:group={tabSet} name="tab3" value={2}>Plan & Billing</Tab>
			<Tab bind:group={tabSet} name="tab4" value={3}>APIs</Tab>

			<!-- Tab Panels --->
			<svelte:fragment slot="panel">
				{#if tabSet === 0}
					<Account />
				{:else if tabSet === 1}
					<ChangePassword />
				{:else if tabSet === 2}
					<Billing />
				{:else if tabSet === 3}
					<ApisSettings userId={$user?.uid} />
				{/if}
			</svelte:fragment>
		</TabGroup>
	</div>
</div>
