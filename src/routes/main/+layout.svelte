<script>
	import { AppShell } from '@skeletonlabs/skeleton';
	let selectedButton = 'button1';
</script>

<AppShell slotSidebarLeft="w-0 md:w-14 bg-surface-100/10">
	<!-- (header) -->
	<svelte:fragment slot="sidebarLeft">
		<div class="flex flex-col items-center justify-start h-screen space-y-10">
			<div class="h-10"></div>
			<button on:click={() => (selectedButton = 'button1')}>
				<svg
					width="35"
					height="35"
					viewBox="0 0 40 40"
					fill="{selectedButton === 'button1' ? 'white' : 'gray'}"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M3.3335 20.025C3.3335 11.2452 10.3502 3.33331 20.0335 3.33331C29.5002 3.33331 36.6668 11.095 36.6668 19.9749C36.6668 30.2737 28.2668 36.6666 20.0002 36.6666C17.2668 36.6666 14.2335 35.9322 11.8002 34.4967C10.9502 33.9793 10.2335 33.5954 9.31683 33.8958L5.95016 34.8973C5.10016 35.1644 4.3335 34.4967 4.5835 33.5954L5.70016 29.8564C5.8835 29.339 5.85016 28.7882 5.5835 28.3542C4.15016 25.7169 3.3335 22.8292 3.3335 20.025ZM17.8335 20.025C17.8335 21.2101 18.7835 22.1616 19.9668 22.1782C21.1502 22.1782 22.1002 21.2101 22.1002 20.0417C22.1002 18.8566 21.1502 17.9052 19.9668 17.9052C18.8002 17.8885 17.8335 18.8566 17.8335 20.025ZM25.5168 20.0417C25.5168 21.2101 26.4668 22.1782 27.6502 22.1782C28.8335 22.1782 29.7835 21.2101 29.7835 20.0417C29.7835 18.8566 28.8335 17.9052 27.6502 17.9052C26.4668 17.9052 25.5168 18.8566 25.5168 20.0417ZM12.2835 22.1782C11.1168 22.1782 10.1502 21.2101 10.1502 20.0417C10.1502 18.8566 11.1002 17.9052 12.2835 17.9052C13.4668 17.9052 14.4168 18.8566 14.4168 20.0417C14.4168 21.2101 13.4668 22.1616 12.2835 22.1782Z"
					/>
				</svg>
			</button>
			<button on:click={() => (selectedButton = 'button2')}>
				<svg
					width="35"
					height="35"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M7.19568 14.7245H16.7887"
						stroke="{selectedButton === 'button2' ? 'white' : 'gray'}"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
					<path
						d="M7.36201 21.062C4.25401 20.491 2.39001 18.818 2.39001 14.014V7.94898C2.39001 5.50698 3.64001 3.40998 6.01201 2.92298C8.38301 2.43498 10.185 2.60398 11.682 3.41098C13.18 4.21898 12.751 5.41098 14.29 6.28698C15.83 7.16298 18.307 5.84698 19.925 7.59198C21.619 9.41998 21.61 12.226 21.61 14.014C21.61 20.811 17.803 21.35 12 21.35"
                        stroke="{selectedButton === 'button2' ? 'white' : 'gray'}"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</button>
			<button on:click={() => (selectedButton = 'button3')}>
				<svg
					width="35"
					height="35"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M15.5951 15.6973H8.37512"
						stroke="white"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
					<path
						d="M15.5951 11.9373H8.37512"
						stroke="white"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
					<path
						d="M11.1299 8.17725H8.37488"
						stroke="white"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
					<path
						d="M20.017 7.84812C19.175 4.10412 16.816 2.75012 12 2.75012C5.70701 2.75012 3.60901 5.06312 3.60901 12.0001C3.60901 18.9371 5.70701 21.2501 12 21.2501C18.294 21.2501 20.391 18.9371 20.391 12.0001"
						stroke="white"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</button>

			<svg
				width="35"
				height="35"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M17.569 9.05054C17.569 9.05054 14.359 12.9035 12.011 12.9035C9.66397 12.9035 6.41797 9.05054 6.41797 9.05054"
					stroke="white"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<path
					d="M12.0001 21.1171C4.85707 21.1171 2.47607 18.8371 2.47607 12.0001C2.47607 5.16206 4.85707 2.88306 12.0001 2.88306C19.1431 2.88306 21.5241 5.16206 21.5241 12.0001C21.5241 17.3781 20.0511 19.9361 15.9471 20.7831"
					stroke="white"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
			<svg
				width="35"
				height="35"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M8.1615 3.78713C8.4525 3.70613 8.1585 3.78613 8.4805 3.72613C9.4925 3.53813 10.6605 3.45213 11.9995 3.45213C12.6445 3.45213 13.2495 3.47213 13.8165 3.51313"
					stroke="white"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<path
					d="M11.9995 21.9999C5.04446 21.9999 2.72546 19.6819 2.72546 12.7259C2.72546 8.59893 3.54146 6.10393 5.65846 4.75793"
					stroke="white"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<path
					d="M16.0206 3.83118C19.8826 4.73118 21.2746 7.33618 21.2746 12.7262C21.2746 18.5822 19.6306 21.1512 14.9596 21.8172"
					stroke="white"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<path
					d="M3.00037 9.27429H21.0084"
					stroke="white"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<path
					d="M16.4033 13.2113H16.4123"
					stroke="white"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<path
					d="M12.0044 13.2113H12.0134"
					stroke="white"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<path
					d="M7.59645 13.2113H7.60545"
					stroke="white"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<path
					d="M16.4033 17.0634H16.4123"
					stroke="white"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<path
					d="M12.0044 17.0634H12.0134"
					stroke="white"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<path
					d="M7.59645 17.0634H7.60545"
					stroke="white"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<path
					d="M16.0084 2.00037V5.26237"
					stroke="white"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<path
					d="M8.00037 2.00037V5.26237"
					stroke="white"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
			<svg
				width="35"
				height="35"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M8.57202 9.21753H15.427"
					stroke="white"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<path
					d="M19.449 9.46112C19.291 3.30712 17.944 2.50012 12 2.50012C5.61303 2.50012 4.53403 3.43212 4.53403 10.9291C4.53403 19.3221 4.37703 21.5001 5.97303 21.5001C7.56803 21.5001 10.173 17.8161 12 17.8161C13.827 17.8161 16.432 21.5001 18.027 21.5001C19.383 21.5001 19.474 19.9281 19.47 14.3111"
					stroke="white"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		</div>
	</svelte:fragment>
	<!-- (sidebarRight) -->
	<!-- (pageHeader) -->
	<!-- Router Slot -->
	<slot />
	<!-- ---- / ---- -->
	<!-- (pageFooter) -->
	<!-- (footer) -->
</AppShell>
