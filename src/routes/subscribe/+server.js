// src/routes/subscribe.js
import Stripe from 'stripe';
import { error } from '@sveltejs/kit';

const stripe = new Stripe(
	import.meta.env.VITE__STRIPESECRETKEY,
); // Add your Secret Key Here

/**
 * @param {{ body: { priceId: any; }; headers: { origin: any; }; }} request
 */
// @ts-ignore
export async function POST({ request }) {
	try {
		const requestData = await request.json();
		const { priceId } = requestData;
		const defaultOrigin = 'http://localhost:5173'; // Replace with your app's domain in production
		const origin = request.headers.get('origin') || defaultOrigin;

		// Create a Checkout Session with the selected price.
		const session = await stripe.checkout.sessions.create({
			payment_method_types: ['card'],
			line_items: [
				{
					price: priceId, // Use the price ID associated with the product.
					quantity: 1
				}
			],
			mode: 'subscription',
			success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: `${origin}/`
		});

		// If the session was created successfully, redirect to the Stripe Checkout page
		// @ts-ignore
		// throw redirect(303, session.url);
		// @ts-ignore
		// goto(session.url);

		console.log(session.url);

		// If the session was created successfully, return a Response object that redirects to the Stripe Checkout page
		// return new Response(null, {
		// 	status: 303,
		// 	// @ts-ignore
		// 	headers: {
		// 		Location: session.url,
		//     'Access-Control-Allow-Origin': '*',
		// 	}
		// });

		// return  {
		//   status: 200, // HTTP status code
		//   body: {
		//       success: true,
		//       message: 'Subscribed successfully!'
		//   }
		return new Response(
			JSON.stringify({
				returnUrl: session.url,
			}),
			{
				// @ts-ignore
				status: 200, // HTTP status code
				// @ts-ignore
				body: {
					success: true,
					message: 'Subscribed successfully!'
				}
			}
		);
	} catch (err) {
		console.error('Error creating Stripe Checkout session', err);
		// If there's an error, return a response with a 500 status code
		return error(500, 'Failed to create checkout session');
	}
}
