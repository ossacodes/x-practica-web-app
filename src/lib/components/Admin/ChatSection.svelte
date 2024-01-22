<script>
	let messages = [
		{ id: 1, text: 'Hello!', sender: 'me' },
		{ id: 2, text: 'Hi, how are you?', sender: 'other' },
		{ id: 3, text: 'I am fine, thank you!', sender: 'me' },
        { id: 4, text: 'Good to hear that!', sender: 'other' }
        
		// Add more messages here...
	];
</script>
<div class="flex flex-col-reverse items-center justify-start flex-1 overflow-y-auto">
    <div class="flex flex-col space-y-4 justify-cemter sm:w-full lg:w-1/2">
        {#each messages as message (message.id)}
            <div class={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                <div
                    class={`p-2 rounded-lg ${message.sender === 'me' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
                >
                    {message.text}
                </div>
            </div>
        {/each}
    </div>
</div>
