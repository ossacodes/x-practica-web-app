<script>
    // @ts-nocheck
    
        import { useChat } from 'ai/svelte';
        // @ts-ignore
        // @ts-ignore
        import { getContext, onMount } from 'svelte';
        // @ts-ignore
        // @ts-ignore
        import { writable } from 'svelte/store';
        // @ts-ignore
        // @ts-ignore
        import { currentUserId } from '$lib/userState';
        // @ts-ignore
        import firebaseConfig, { db } from '$lib/firebase/firebase.client';
        import { initializeApp } from 'firebase/app';
        import { getFirestore, collection, getDocs, query, orderBy } from 'firebase/firestore';
        import CompCard from './CompCard.svelte';
        import { Paperclip, StopCircle } from 'lucide-svelte';
        import Dropdown from './Dropdown.svelte';
    
        /**
         * @type {string}
         */
        // @ts-ignore
        export let userId;
    
        /**
         * @type {any}
         */
         export let chatId;
    
         // @ts-ignore
         export let chatData;
    
         export let messageHistory;
    
        let showDropdown = false;
        let position = { x: 0, y: 0 };
        let items = ['Copy', 'Reply', 'Text to Speech', 'Delete'];
    
        // @ts-ignore
        const handleRightClick = (event) => {
            event.preventDefault(); // Prevent default right-click menu
            position = { x: event.clientX, y: event.clientY };
            showDropdown = true;
        };
    
        const handleClickOutside = () => {
            showDropdown = false;
        };
    
        // /**
        //  * @type {string | any[]}
        //  */
        // let data = [];
    
        // /**
        //  * @type {{ role: any; content: any; }[]}
        //  */
        // let messageHistory = [];
    
        const app = initializeApp(firebaseConfig);
        // @ts-ignore
        const firestore = getFirestore(app);
    
        // // Fetch data from a Firestore collection
        // async function fetchData() {
        // 	// const snapshot = await db.collection('chats').doc(userId).collection('MyAiChats').get();
        // 	// const data = snapshot.docs.map((doc) => doc.data());
        // 	// @ts-ignore
        // 	const collectionRef = collection(firestore, `chats/${userId}/${chatId}`);
        // 	const querySnapshot = await getDocs(query(collectionRef, orderBy('timestamp', 'asc')));
        // 	data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        // 	querySnapshot.docs.forEach((doc) => {
        // 		messageHistory.push({
        // 			role: doc.data().role,
        // 			content: doc.data().content
        // 		});
        // 	});
        // }
    
        // console.log(messageHistory);
    
        // onMount(() => {
        // 	fetchData();
        // });
    
        const { messages, handleSubmit, input, isLoading, stop } = useChat({
            api: 'http://localhost:5173/main/chats',
            body: {
                userId: userId,
                chatId: chatId,
                messageHistory: messageHistory
            },
            initialMessages: chatData
        });
    
        let isDragging = false;
        let isGenerating = false;
    
        // onMount(() => {
        // 	isGenerating = $isLoading?.valueOf();
        // });
    
        /**
         * @param {{ preventDefault: () => void; }} event
         */
        function onDragOver(event) {
            event.preventDefault(); // Necessary to allow dropping
            isDragging = true;
        }
        /**
         * @param {{ preventDefault: () => void; }} event
         */
        function onDragLeave(event) {
            isDragging = false;
        }
        /**
         * @param {{ preventDefault: () => void; }} event
         */
        function onDrop(event) {
            event.preventDefault();
            isDragging = false;
    
            // Access the files from the drop event
            // @ts-ignore
            const files = event.dataTransfer.files;
            if (files.length > 0) {
                // Handle the files, for example, uploading or reading file content
                console.log('Dropped files:', files);
            }
        }
    </script>
    
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
        class:highlight={isDragging}
        on:dragover={onDragOver}
        on:dragleave={onDragLeave}
        on:drop={onDrop}
        class="flex flex-col-reverse items-center justify-start flex-1 overflow-y-auto"
    >
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        {#if isDragging}
            <div class="border-2 border-gray-400 border-dashed rounded-lg sm:w-full lg:w-1/2 h-52">
                Drop files here
            </div>
        {/if}
        <div
            class={`${isDragging === true ? 'pointer-events-none' : ''} flex flex-col justify-center space-y-4  sm:w-full lg:w-1/2`}
        >
            {#if chatData.length > 0}
                <ul>
                    {#each chatData as message}
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <div on:click={handleClickOutside} class={`flex mt-5 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div
                                on:contextmenu={handleRightClick}
                                on:click={handleClickOutside}
                                class={`p-2 max-w-lg rounded-lg ${message.role === 'user' ? 'bg-blue-800 bg-opacity-30 text-white' : 'bg-gray-200 bg-opacity-5 text-gray'}`}
                            >
                                <CompCard {message} />
                            </div>
                            {#if showDropdown}
                                <Dropdown {items} {position} />
                            {/if}
                        </div>
                    {/each}
                </ul>
            {:else}
                <div></div>
            {/if}
    
            {#if $messages.length > 0}
                {#each $messages as message}
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <div on:click={handleClickOutside} class={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div
                            on:contextmenu={handleRightClick}
                            on:click={handleClickOutside}
                            class={`p-2 rounded-lg ${message.role === 'user' ? 'bg-blue-800 bg-opacity-30 text-white' : 'bg-gray-200 bg-opacity-5 text-gray'}`}
                        >
                            <CompCard {message} />
                        </div>
                        {#if showDropdown}
                            <Dropdown {items} {position} />
                        {/if}
                    </div>
                {/each}
            {/if}
        </div>
    </div>
    
    <form on:submit={handleSubmit}>
        <div class="flex justify-center pt-2 pb-6">
            <div
                class="flex items-center justify-center px-2 bg-white border sm:w-full lg:w-1/2 border-slate-700 rounded-xl bg-opacity-5"
            >
                <button>
                    <Paperclip class="m-3" size={26} />
                </button>
    
                <input
                    class="w-full h-12 bg-transparent border-0 border-none placeholder:text-lg focus:ring-0"
                    title="Input (text)"
                    type="text"
                    placeholder="Send a message..."
                    bind:value={$input}
                />
                {#if $isLoading}
                    <button on:click={stop}>
                        <StopCircle class="m-3" size={32} />
                    </button>
                {:else}
                    <button type="submit">
                        <svg
                            class="m-4"
                            width="26"
                            height="26"
                            viewBox="0 0 31 30"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M29.2482 1.75998C28.519 1.01477 27.4398 0.739145 26.4336 1.03081L2.96899 7.8106C1.90733 8.10519 1.15482 8.94664 0.952117 10.0141C0.745033 11.1021 1.46837 12.4846 2.41337 13.0621L9.75024 17.5421C10.5027 18.0029 11.474 17.8877 12.0967 17.2635L20.4982 8.86206C20.9211 8.4231 21.6211 8.4231 22.044 8.86206C22.4669 9.28352 22.4669 9.97039 22.044 10.4079L13.628 18.8094C13.0038 19.4335 12.8871 20.4019 13.3465 21.1558L17.8294 28.5204C18.3544 29.3939 19.2586 29.8912 20.2502 29.8912C20.3669 29.8912 20.4982 29.8912 20.6148 29.8752C21.7523 29.7308 22.6565 28.9564 22.9919 27.8627L29.9482 4.57456C30.2544 3.58289 29.9773 2.50373 29.2482 1.75998"
                                fill="white"
                            />
                            <path
                                opacity="0.4"
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M2.39026 22.5114C2.11026 22.5114 1.83026 22.4049 1.61734 22.1905C1.19005 21.7633 1.19005 21.072 1.61734 20.6447L3.60797 18.6526C4.03526 18.2268 4.72797 18.2268 5.15526 18.6526C5.58109 19.0799 5.58109 19.7726 5.15526 20.1999L3.16318 22.1905C2.95026 22.4049 2.67026 22.5114 2.39026 22.5114ZM7.87534 24.2503C7.59534 24.2503 7.31534 24.1438 7.10243 23.9295C6.67514 23.5022 6.67514 22.8109 7.10243 22.3836L9.09305 20.3915C9.52034 19.9657 10.2131 19.9657 10.6403 20.3915C11.0662 20.8188 11.0662 21.5115 10.6403 21.9388L8.64826 23.9295C8.43534 24.1438 8.15534 24.2503 7.87534 24.2503ZM8.24532 29.4536C8.45824 29.668 8.73824 29.7745 9.01824 29.7745C9.29824 29.7745 9.57824 29.668 9.79116 29.4536L11.7832 27.463C12.2091 27.0357 12.2091 26.343 11.7832 25.9157C11.3559 25.4899 10.6632 25.4899 10.2359 25.9157L8.24532 27.9078C7.81803 28.3351 7.81803 29.0263 8.24532 29.4536Z"
                                fill="white"
                            />
                        </svg>
                    </button>
                {/if}
            </div>
        </div>
    </form>
    
    <style>
        .highlight {
            background-color: #f0f0f0; /* Highlight color when dragging files over */
            opacity: 0.1;
        }
    </style>
    