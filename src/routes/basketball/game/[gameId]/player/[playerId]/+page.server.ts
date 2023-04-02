import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const { gameId, playerId } = params;
	if (!gameId || !playerId) {
		// No player ID present
		throw error(404);
	}

	return { gameId, playerId };
}) satisfies PageServerLoad;
