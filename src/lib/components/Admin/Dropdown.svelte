<!-- src/lib/Dropdown.svelte -->
<script>
	import { fly } from 'svelte/transition';
	import { Copy, Reply, Mic, Trash } from 'lucide-svelte';

	export let messageId;
	/**
	 * @type {any[]}
	 */
	 export let items = [];
	export let position = { x: 0, y: 0 };

	const handleClick = (/** @type {any} */ item) => {
		// Handle click event on dropdown items
		console.log(`Clicked on ${item} ${messageId}`);
	};

	const getIcon = (/** @type {any} */ item) => {
		switch (item) {
			case 'Copy':
				return Copy;
			case 'Reply':
				return Reply;
			case 'Text to Speech':
				return Mic;
			case 'Delete':
				return Trash;
			default:
				return null;
		}
	};
</script>

<div
	class="absolute z-10 flex flex-col justify-center p-1 overflow-hidden bg-black rounded-md shadow-sm bg-opacity-5"
	style={`top: ${position.y}px; left: ${position.x}px;`}
	in:fly={{ y: 10, duration: 200 }}
>
	{#each items as item}
		<button
			class="flex flex-row px-4 py-2 text-gray-200 cursor-pointer hover:text-gray-700 hover:bg-gray-100"
			on:click={() => handleClick(item)}
		>
			<svelte:component class="mr-3" this={getIcon(item)} size={25} />
			{item}
		</button>
	{/each}
</div>

<style>
	/* Additional custom styles if needed */
</style>
