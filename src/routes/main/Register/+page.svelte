<script >
	import { auth } from '$lib/firebase/firebase.client';
	import { createUserWithEmailAndPassword } from 'firebase/auth';
	import { userStore } from 'sveltefire';
	import { goto } from '$app/navigation';
	import { addDoc, collection, doc, getFirestore, setDoc } from 'firebase/firestore';

	let username = '';
	let email = '';
	let password = '';
	let confirmPassword = '';
	let isLoading = false;

	const firestore = getFirestore();

	const user = userStore(auth);
	if ($user?.uid != null) {
		goto('/User');
	}

	function handleCreateAccount() {
		// Handle login logic here
		isLoading = true;
		createUserWithEmailAndPassword(auth, email, password)
			.then(async (userCredential) => {
				// Signed in
				// await addDoc(collection(firestore, 'users'), {
				// 	userID: userCredential.user.uid,
				// 	username: username,
				// 	email: email,
				// });

				await setDoc(doc(firestore, 'users', userCredential.user.uid), {
					userID: userCredential.user.uid,
					username: username,
					email: email
				});

				const user = userCredential.user;
				isLoading = false;
				console.log(user);
				goto('/User');
				// ...
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				isLoading = false;
				console.log(errorCode, errorMessage);
				// ..
			});
	}
</script>

<div class="flex items-center justify-center min-h-screen px-4 py-12 sm:px-6 lg:px-8">
	<div class="w-full max-w-md space-y-8">
		<div>
			<h2 class="mt-6 text-3xl font-extrabold text-center text-white">Create a new account</h2>
		</div>
		<form class="mt-8 space-y-6" on:submit|preventDefault={handleCreateAccount}>
			<input type="hidden" name="remember" value="true" />
			<div class="space-y-4 rounded-md shadow-sm">
				<div>
					<label for="username" class="sr-only">Username</label>
					<input
						class="rounded-lg input"
						bind:value={username}
						id="username"
						name="username"
						type="text"
						autocomplete="username"
						required
						placeholder="Username"
					/>
				</div>
				<div>
					<label for="email-address" class="sr-only">Email address</label>
					<input
						class="rounded-lg input"
						bind:value={email}
						id="email-address"
						name="email"
						type="email"
						autocomplete="email"
						required
						placeholder="Email address"
					/>
				</div>
				<div>
					<label for="password" class="sr-only">Password</label>
					<input
						class="rounded-lg input"
						bind:value={password}
						id="password"
						name="password"
						type="password"
						autocomplete="current-password"
						required
						placeholder="Password"
					/>
				</div>
				<div>
					<label for="ConfirmPassword" class="sr-only">Confirm Password</label>
					<input
						class="rounded-lg input"
						bind:value={confirmPassword}
						id="confirmPassword"
						name="confirmPassword"
						type="password"
						autocomplete="current-password"
						required
						placeholder="Confirm Password"
					/>
				</div>
			</div>

			<div>
				<button
					type="submit"
					class="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
				>
					{#if isLoading}
						Loading...
					{:else}
						Create Account
					{/if}
				</button>
			</div>
			<div class="flex items-center justify-center">
				<p class="text-sm font-medium text-white">
					Already have an account? <a
						href="/User/Login"
						class="text-indigo-500 hover:text-indigo-300">Login</a
					>
				</p>
			</div>
		</form>
	</div>
</div>
