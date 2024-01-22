<script>
	import { goto } from '$app/navigation';

	let isLoading = false;

	/**
	 * @param {string} priceId
	 */
	async function handleSubscribe(priceId) {
		const response = await fetch('/subscribe', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ priceId })
		});

		console.log(response.status);

		if (response.ok) {
			// @ts-ignore
			if (response.status === 200) {
				const data = await response.json();
				// @ts-ignore
				console.log(data);
				// Get the URL to redirect to from the Location header and redirect the browser to the Stripe Checkout page
				// const checkoutUrl = response.headers.get('Location');
				// @ts-ignore
				window.location.href = data.returnUrl;
			} else {
				// If the status code is not 303, we assume a JSON response with session information
				const { sessionId } = await response.json();
				console.log(sessionId);
				// Normally, you would redirect to a URL provided within the session, but here we're just using the sessionId for an example
				window.location.href = `/success?session_id=${sessionId}`;
			}
		} else {
			// Handle errors
			console.error('Failed to start Stripe Checkout');
			// Optionally, retrieve and display error details from the response
			const errorDetails = await response.json();
			console.error(errorDetails.error);
		}
	}
</script>

<div class="flex flex-col items-center justify-center mb-20 lg:flex-row">
	<div class="mb-4 overflow-hidden shadow-lg rounded-3xl lg:mr-10">
		<div class="px-6 py-8 bg-white dark:bg-[#141325] sm:p-10 sm:pb-6">
			<div class="flex justify-center mb-10">
				<span
					class="inline-flex px-4 py-1 text-2xl font-semibold leading-5 tracking-wide uppercase rounded-full dark:text-white"
				>
					Free
				</span>
			</div>
			<div class="flex justify-center mt-4 text-6xl font-extrabold leading-none dark:text-white">
				<span class="ml-1 mr-3 text-xl font-medium leading-8 text-gray-500 dark:text-gray-400">
					from
				</span>
				$0
				<span class="pt-8 ml-1 text-2xl font-medium leading-8 text-gray-500 dark:text-gray-400">
					/month
				</span>
			</div>
		</div>
		<div class="px-6 pt-6 pb-8 bg-white dark:bg-[#141325] sm:p-10 sm:pt-6">
			<ul>
				<li class="flex items-start mt-4">
					<div class="flex-shrink-0">
						<svg
							class="w-6 h-6 text-green-500"
							stroke="currentColor"
							fill="none"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M5 13l4 4L19 7"
							>
							</path>
						</svg>
					</div>
					<p class="ml-3 text-base leading-6 text-gray-700 dark:text-gray-200">
						$10/month per user
					</p>
				</li>
				<li class="flex items-start mt-4">
					<div class="flex-shrink-0">
						<svg
							class="w-6 h-6 text-green-500"
							stroke="currentColor"
							fill="none"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M5 13l4 4L19 7"
							>
							</path>
						</svg>
					</div>
					<p class="ml-3 text-base leading-6 text-gray-700 dark:text-gray-200">
						Unlimited number of projects
					</p>
				</li>
				<li class="flex items-start mt-4">
					<div class="flex-shrink-0">
						<svg
							class="w-6 h-6 text-green-500"
							stroke="currentColor"
							fill="none"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M5 13l4 4L19 7"
							>
							</path>
						</svg>
					</div>
					<p class="ml-3 text-base leading-6 text-gray-700 dark:text-gray-200">Cancel anytime</p>
				</li>
			</ul>
			<div class="mt-6 shadow rounded-3xl">
				<a
					href="/"
					class="flex items-center justify-center px-5 py-3 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-transparent border border-transparent border-white rounded-full hover:bg-indigo-600 focus:outline-none focus:shadow-outline"
				>
					Try For Free
				</a>
			</div>
		</div>
	</div>

	<!-- pro plan  -->
	<div class="mb-4 overflow-hidden shadow-lg rounded-3xl">
		<div class="px-6 py-8 bg-white dark:bg-[#141325] sm:p-10 sm:pb-6">
			<div class="flex justify-center mb-10">
				<span
					class="inline-flex px-4 py-1 text-2xl font-semibold leading-5 tracking-wide uppercase rounded-full dark:text-white"
				>
					Pro
				</span>
			</div>
			<div class="flex justify-center mt-4 text-6xl font-extrabold leading-none dark:text-white">
				<span class="ml-1 mr-3 text-xl font-medium leading-8 text-gray-500 dark:text-gray-400">
					from
				</span>
				$10
				<span class="pt-8 ml-1 text-2xl font-medium leading-8 text-gray-500 dark:text-gray-400">
					/month
				</span>
			</div>
		</div>
		<div class="px-6 pt-6 pb-8 bg-white dark:bg-[#141325] sm:p-10 sm:pt-6">
			<ul>
				<li class="flex items-start mt-4">
					<div class="flex-shrink-0">
						<svg
							class="w-6 h-6 text-green-500"
							stroke="currentColor"
							fill="none"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M5 13l4 4L19 7"
							>
							</path>
						</svg>
					</div>
					<p class="ml-3 text-base leading-6 text-gray-700 dark:text-gray-200">
						$10/month per user
					</p>
				</li>
				<li class="flex items-start mt-4">
					<div class="flex-shrink-0">
						<svg
							class="w-6 h-6 text-green-500"
							stroke="currentColor"
							fill="none"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M5 13l4 4L19 7"
							>
							</path>
						</svg>
					</div>
					<p class="ml-3 text-base leading-6 text-gray-700 dark:text-gray-200">
						Unlimited number of projects
					</p>
				</li>
				<li class="flex items-start mt-4">
					<div class="flex-shrink-0">
						<svg
							class="w-6 h-6 text-green-500"
							stroke="currentColor"
							fill="none"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M5 13l4 4L19 7"
							>
							</path>
						</svg>
					</div>
					<p class="ml-3 text-base leading-6 text-gray-700 dark:text-gray-200">Cancel anytime</p>
				</li>
			</ul>
			<div class="mt-6 shadow rounded-3xl">
				<button
					on:click={async () => {
						isLoading = true;
						await handleSubscribe('price_1OWlydFlHhT4Atj1WGXsBFVK');
						isLoading = false;
					}}
					class="flex items-center justify-center w-full px-5 py-3 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-transparent border border-transparent border-white rounded-full hover:bg-indigo-600 focus:outline-none focus:shadow-outline"
				>
				{#if !isLoading}  Go Pro {/if}
				{#if isLoading}  Loading...  {/if}
				</button>
			</div>
		</div>
	</div>
</div>
