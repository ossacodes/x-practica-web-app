<script>
	import Appbar from '$lib/components/Admin/Appbar.svelte';
	import ChatSection from '$lib/components/Admin/ChatSection.svelte';
	import PromptTextField from '$lib/components/Admin/PromptTextField.svelte';
	import { AppShell } from '@skeletonlabs/skeleton';
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
			<ChatSection />
			<PromptTextField />
		</div>

		<!-- ---- / ---- -->
		<!-- (pageFooter) -->
		<!-- (footer) -->
	</AppShell>
</div>
