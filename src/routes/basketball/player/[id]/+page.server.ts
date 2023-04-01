import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const gamePlayerId = params.id;
	if (!gamePlayerId) {
		// No game ID present
		throw error(404);
	}

	const [gameId, playerId] = gamePlayerId.split('-');

	return { gameId, playerId };
}) satisfies PageServerLoad;
