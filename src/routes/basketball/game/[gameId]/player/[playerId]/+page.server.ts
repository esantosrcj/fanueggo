import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { GameLog } from '$lib/types/basketball';

export const load = (async ({ params, fetch }) => {
	const { gameId, playerId } = params;
	if (!gameId || !playerId) {
		// No game ID or player ID present
		throw error(404);
	}

	const url = `/api/player/game-logs?playerId=${playerId}`;
	const res = await fetch(url);
	if (res.ok) {
		const gameLogs: GameLog[] = await res.json();
		return { gameId, gameLogs };
	}

	return { gameId, gameLogs: [] };
}) satisfies PageServerLoad;
