import { AlchemyProvider } from 'ethers';

export default {
  async fetch(request, env) {
    const provider = new AlchemyProvider('mainnet', env.API_TOKEN);

    const url = new URL(request.url);
    const address = url.searchParams.get('address');

    const headers = { 'Content-Type': 'application/json' };

    try {
      const name = await provider.lookupAddress(address);

      if (!name) {
        const response = { status: 'ENS name not found.' };

        return new Response(JSON.stringify(response), { status: 404, headers });
      }

      const response = { ensName: name };
      return new Response(JSON.stringify(response), { headers });
    } catch (error) {
      const response = { status: 'Server error.' };
      return new Response(JSON.stringify(response), { status: 500, headers });
    }
  },
};
