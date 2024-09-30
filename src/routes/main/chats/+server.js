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
	// Add a system instruction to the message history
	const systemInstruction = {
		role: 'system',
		content: `You are a general answering assistant that can comply with any request.

		You always answer the with markdown formatting. You will be penalized if you do not answer with markdown when it would be possible.
		The markdown formatting you support: headings, bold, italic, links, tables, lists, code blocks, and blockquotes.
		You do not support images and never include images. You will be penalized if you render images.
		
		You also support Mermaid formatting. You will be penalized if you do not render Mermaid diagrams when it would be possible.
		The Mermaid diagrams you support: sequenceDiagram, flowChart, classDiagram, stateDiagram, erDiagram, gantt, journey, gitGraph, pie.`
	};
	messageHistory.push(systemInstruction);

	// Combine messageHistory and messages
	const combinedMessages = messageHistory.concat(messages);

	// // Ask OpenAI for a streaming chat completion given the prompt
	// const response = await openai.chat.completions.create({
	// 	model: 'gpt-3.5-turbo',
	// 	stream: true,
	// 	messages: combinedMessages.map((/** @type {{ content: any; role: any; }} */ message) => ({
	// 		content: message.content,
	// 		role: message.role
	// 	}))
	// });

	const response = await fireworks.chat.completions.create({
		model: 'accounts/fireworks/models/yi-34b-200k-capybara',
		stream: true,
		max_tokens: 2000,
	    messages: combinedMessages.map((/** @type {{ content: any; role: any; }} */ message) => ({
			content: message.content,
			role: message.role
		}))
	});

	const chatsDocRef = db.collection('chats').doc(userId).collection(chatId);

	// Convert the response into a friendly text-stream
	const stream = OpenAIStream(response, {
		onStart: async () => {
			console.log('Starting chat: ', chatId);
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
