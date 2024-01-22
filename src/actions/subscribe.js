// @ts-nocheck
// src/actions/subscribe.js
import Stripe from 'stripe';

const stripe = new Stripe(
	import.meta.env.VITE__STRIPEPUBLISHABLEKEY,
); // Add your Public Key Here

export async function post(request) {
	const { paymentMethodId, email, priceId } = JSON.parse(request.body);

	try {
		// Create a new customer or use an existing one in your system
		const customer = await stripe.customers.create({
			payment_method: paymentMethodId,
			email: email,
			invoice_settings: {
				default_payment_method: paymentMethodId
			}
		});

		// Subscribe the customer to the plan
		const subscription = await stripe.subscriptions.create({
			customer: customer.id,
			items: [{ price: priceId }],
			expand: ['latest_invoice.payment_intent']
		});

		return {
			status: 200,
			body: {
				subscriptionId: subscription.id,
				customerId: customer.id
			}
		};
	} catch (error) {
		return {
			status: 400,
			body: {
				error: {
					message: error.message
				}
			}
		};
	}
}
