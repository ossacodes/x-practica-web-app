<script lang="ts">
	import { goto } from '$app/navigation';
	import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton';
	import SearchTextField from './SearchTextField.svelte';
	let valueSingle: string = 'dashboard';
	let navItems = [
		{
			name: 'Python Code to C++',
			value: 'code',
			icon: `<i class="ri-code-s-slash-line"></i>`
		},
		{
			name: 'Posts',
			value: 'posts',
			icon: `<i class="ri-image-add-line ri-xl"></i>` // Add SVG here
		},
		{
			name: 'Analytics',
			value: 'analytics',
			icon: `<i class="ri-line-chart-line ri-xl"></i>` // Add SVG here
		},
		{
			name: 'Settings',
			value: 'settings',
			icon: `<i class="ri-settings-2-line ri-xl"></i>` // Add SVG here
		}
		// Add more items as needed...
	];

	function addChat() {
		console.log('Add Chat');
	}
</script>

<nav class="p-2">
	<ListBox rounded="rounded" class="space-y-1 list-nav">
		<div class="flex items-center justify-between mx-2 mt-5 text-2xl rounded-none">
			Chats(4)
			<button
				style="border-radius: 5px; background-color: white;"
				on:click={addChat}
				class="flex items-center justify-center bg-white hover:bg-white h-7 w-7"
				aria-label="Add Chat"
			>
				<center>
					<svg
						width="12"
						height="12"
						viewBox="0 0 12 12"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<g id="24 / basic / plus">
							<path
								id="icon"
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M6.5 5.5H11V6.5H6.5V11H5.5V6.5H1V5.5H5.5V1H6.5V5.5Z"
								fill="black"
								stroke="black"
							/>
						</g>
					</svg>
				</center>
			</button>
		</div>
		<div class="h-3"></div>
		<SearchTextField />
		<div class="h-3"></div>
		{#each navItems as item (item.value)}
			<div class="flex items-center p-4 bg-white rounded-lg shadow bg-opacity-5">
				<!-- Lead: Avatar -->
				<div class="flex-shrink-0">
					<!-- <img class="w-12 h-12 rounded-full" src="{chat.avatar}" alt="avatar" /> -->
					{@html item.icon}
				</div>

				<!-- Title and Subtitle -->
				<div class="w-32 ml-4">
					<div class="text-sm font-semibold truncate">{item.name}</div>
					<div class="overflow-hidden text-sm text-gray-500 truncate">
						Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci similique animi
						numquam hic sapiente ab nemo aspernatur blanditiis? Omnis corrupti aliquam ea at, quae
						commodi quasi dolores molestias porro quia.
					</div>
				</div>

				<!-- Trailing: Time -->
				<div class="ml-auto text-sm text-gray-500">3 min ago</div>
			</div>
			<!-- <ListBoxItem
				bind:group={valueSingle}
				on:change={() => {
					if (valueSingle === 'dashboard') {
						goto('/main/chats');
					} else if (valueSingle === 'posts') {
						goto('/main/chats/Posts');
					} else if (valueSingle === 'analytics') {
						goto('/User/Analytics');
					} else if (valueSingle === 'settings') {
						goto('/main/chats/Settings');
					}
				}}
				name="medium"
				value={item.value}
			>
				<svelte:fragment slot="lead">
					{@html item.icon}
				</svelte:fragment>{item.name}
			</ListBoxItem> -->
		{/each}
	</ListBox>
</nav>
