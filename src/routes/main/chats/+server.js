import OpenAI from 'openai';
import { OPENAI_KEY } from '$env/static/private';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { db } from '$lib/firebase/firebaseAdmin';

const openai = new OpenAI({
	apiKey: OPENAI_KEY // This is the default and can be omitted
});

/** @type {import('./$types').RequestHandler} */
// @ts-ignore
export const POST = async ({ request }) => {
	// Extract the `prompt` from the body of the request
	const { messages, userId } = await request.json();
	// const prompt = messages.map();

	//    const data = await request.json();

	// Ask OpenAI for a streaming chat completion given the prompt
	const response = await openai.chat.completions.create({
		model: 'gpt-3.5-turbo',
		stream: true,
		messages: messages.map((/** @type {{ content: any; role: any; }} */ message) => ({
			content: message.content,
			role: message.role
		}))
	});

	const chatsDocRef = db.collection('chats').doc(userId).collection('MyAiChats');

	// Convert the response into a friendly text-stream
	const stream = OpenAIStream(response, {
		onStart: async () => {
			await chatsDocRef.add({
				content: messages[messages.length - 1].content,
				role: 'user',
				timestamp: Date.now(),
                date: new Date(),
			});
		},
		onCompletion: async (completion) => {
			await chatsDocRef.add({
				content: completion,
				role: 'bot',
				timestamp: Date.now(),
                date: new Date(),
			});
		}
	});
	// Respond with the stream
	return new StreamingTextResponse(stream);
};
