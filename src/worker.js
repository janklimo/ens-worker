import { AlchemyProvider } from 'ethers';

export default {
	async fetch(request, env) {
		const provider = new AlchemyProvider('mainnet', env.API_TOKEN);

		const url = new URL(request.url);
		const address = url.searchParams.get('address');

		try {
			const name = await provider.lookupAddress(address);
			const response = { ensName: name };
			return new Response(JSON.stringify(response), {
				headers: { 'Content-Type': 'application/json' },
			});
		} catch (error) {
			const response = { ensName: null };
			return new Response(JSON.stringify(response), {
				headers: { 'Content-Type': 'application/json' },
			});
		}
	},
};
