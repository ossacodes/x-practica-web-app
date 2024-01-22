<script>
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
</script>

<div class="flex flex-col items-center justify-center mb-20 " id="how-it-works">
    <h2 class="mb-5 text-3xl font-bold lg:text-5xl lg:mb-9">FAQ</h2>
	<div class="flex flex-col items-center justify-center text-xl font-bold">
		<Accordion class="dark:bg-[#141325] rounded-lg" spacing='space-y-3' padding='py-5 px-6'>
			<AccordionItem>
				<!-- <svelte:fragment slot="lead">(icon)</svelte:fragment> -->
				<svelte:fragment slot="summary">How does it work?</svelte:fragment>
				<svelte:fragment slot="content">hello</svelte:fragment>
			</AccordionItem>
			<AccordionItem>
				<!-- <svelte:fragment slot="lead">(icon)</svelte:fragment> -->
				<svelte:fragment slot="summary">Can i scrap any website online?</svelte:fragment>
				<svelte:fragment slot="content">hello</svelte:fragment>
			</AccordionItem>
			<AccordionItem>
				<!-- <svelte:fragment slot="lead">(icon)</svelte:fragment> -->
				<svelte:fragment slot="summary">What are the requirements to get started?</svelte:fragment>
				<svelte:fragment slot="content">hello</svelte:fragment>
			</AccordionItem>
			<AccordionItem>
				<!-- <svelte:fragment slot="lead">(icon)</svelte:fragment> -->
				<svelte:fragment slot="summary">Does it export to excel sheets?</svelte:fragment>
				<svelte:fragment slot="content">hello</svelte:fragment>
			</AccordionItem>
			<AccordionItem>
				<!-- <svelte:fragment slot="lead">(icon)</svelte:fragment> -->
				<svelte:fragment slot="summary">Does it use GPT-4?</svelte:fragment>
				<svelte:fragment slot="content">hello</svelte:fragment>
			</AccordionItem>
			<AccordionItem>
				<!-- <svelte:fragment slot="lead">(icon)</svelte:fragment> -->
				<svelte:fragment slot="summary">How much data can it hundle?</svelte:fragment>
				<svelte:fragment slot="content">hello</svelte:fragment>
			</AccordionItem>
			<!-- ... -->
		</Accordion>
	</div>
</div>
