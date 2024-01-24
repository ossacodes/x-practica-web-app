<script>
	import { useChat } from "ai/svelte";

	// let messages = [
	// 	{ id: 1, text: 'Hello!', sender: 'me' },
	// 	{ id: 2, text: 'Hi, how are you?', sender: 'other' },
	// 	{ id: 3, text: 'I am fine, thank you!', sender: 'me' },
    //     { id: 4, text: 'Good to hear that!', sender: 'other' }
        
	// 	// Add more messages here...
	// ];
    const { messages, handleSubmit, input } = useChat({
		api: 'http://localhost:5173/main/chats'
	});
</script>
<div class="flex flex-col-reverse items-center justify-start flex-1 overflow-y-auto">
    <div class="flex flex-col space-y-4 justify-cemter sm:w-full lg:w-1/2">
        {#each $messages as message}
            <div class={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                    class={`p-2 rounded-lg ${message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
                >
                    {message.content}
                </div>
            </div>
        {/each}
    </div>
</div>
