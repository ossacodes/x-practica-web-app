<script>
	import Account from '$lib/components/Admin/settings/Account.svelte';
	import Billing from '$lib/components/Admin/settings/Billing.svelte';
import { Tab, TabGroup } from '@skeletonlabs/skeleton';
	let tabSet = 0;
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
            <Tab bind:group={tabSet} name="tab3" value={3}>APIs</Tab>
			<Tab bind:group={tabSet} name="tab3" value={4}>Appearance</Tab>

			<!-- Tab Panels --->
			<svelte:fragment slot="panel">
				{#if tabSet === 0}
					<Account />
				{:else if tabSet === 1}
					(tab panel 2 contents)
				{:else if tabSet === 2}
					<Billing />
				{/if}
			</svelte:fragment>
		</TabGroup>

		
	</div>
</div>
