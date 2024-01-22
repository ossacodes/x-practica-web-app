<script>
	import Footer from '$lib/components/Footer.svelte';
	import NavBar from '$lib/components/NavBar.svelte';
	import '../app.postcss';
	import { AppShell, AppBar, Toast, initializeStores } from '@skeletonlabs/skeleton';
	initializeStores();
	
</script>

<Toast />
<AppShell>
	<!-- <svelte:fragment slot="header">
		<NavBar />
	</svelte:fragment> -->
	<!-- (sidebarLeft) -->
	<!-- (sidebarRight) -->
	<!-- (pageHeader) -->
	<!-- Router Slot -->
	<slot />
	<!-- ---- / ---- -->
	<!-- <svelte:fragment slot="pageFooter">
		<Footer />
	</svelte:fragment> -->
	<!-- (footer) -->
</AppShell>
