import OpenAI from 'openai';
import { OPENAI_KEY, FIREWORKS_API_KEY } from '$env/static/private';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { db } from '$lib/firebase/firebaseAdmin';

const openai = new OpenAI({
	apiKey: OPENAI_KEY // This is the default and can be omitted
});

const fireworks = new OpenAI({
	apiKey: FIREWORKS_API_KEY || '',
	baseURL: 'https://api.fireworks.ai/inference/v1'
});

/** @type {import('./$types').RequestHandler} */
// @ts-ignore
export const POST = async ({ request }) => {
	// Extract the `prompt` from the body of the request
	const { messages, userId, chatId, messageHistory } = await request.json();

	// console.log('messages History ', messageHistory);
	// console.log('messages ', messages);

	// Combine messageHistory and messages
	const combinedMessages = messageHistory.concat(messages);

	// Ask OpenAI for a streaming chat completion given the prompt
	const response = await openai.chat.completions.create({
		model: 'gpt-3.5-turbo',
		stream: true,
		messages: combinedMessages.map((/** @type {{ content: any; role: any; }} */ message) => ({
			content: message.content,
			role: message.role
		}))
	});

    // const response = await fireworks.chat.completions.create({
	// 	model: 'accounts/fireworks/models/mixtral-8x7b-instruct',
	// 	stream: true,
	// 	max_tokens: 1000,
    //     messages: combinedMessages.map((/** @type {{ content: any; role: any; }} */ message) => ({
	// 		content: message.content,
	// 		role: message.role
	// 	}))
	// });

	const chatsDocRef = db.collection('chats').doc(userId).collection(chatId);

	// Convert the response into a friendly text-stream
	const stream = OpenAIStream(response, {
		onStart: async () => {
			await chatsDocRef.add({
				content: messages[messages.length - 1].content,
				role: 'user',
				timestamp: Date.now(),
				date: new Date()
			});
		},
		onCompletion: async (completion) => {
			await chatsDocRef.add({
				content: completion,
				role: 'assistant',
				timestamp: Date.now(),
				date: new Date()
			});
		}
	});
	// Respond with the stream
	return new StreamingTextResponse(stream);
};
