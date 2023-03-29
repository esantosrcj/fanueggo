import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { LUGame } from '$lib/types/basketball';
import { LINEUPS_JSON } from '$env/static/private';

export const load = (async ({ params, fetch }) => {
	const gameId = params.slug;
	if (!gameId) {
		// No game ID present
		throw error(404);
	}

	// Get game lineups
	const res = await fetch(LINEUPS_JSON);
	if (!res.ok) {
		throw error(404);
	}
	const { games } = await res.json();
	const game = games.find((g: LUGame) => g.gameId === gameId);

	return { game };
}) satisfies PageServerLoad;
