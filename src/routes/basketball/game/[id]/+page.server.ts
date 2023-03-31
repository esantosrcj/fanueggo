import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { LUGame } from '$lib/types/basketball';
import { transformGame, formatTodayDate } from '$lib/utils/data-helper';
import { LINEUPS_JSON } from '$env/static/private';

export const load = (async ({ params, fetch }) => {
	const gameId = params.id;
	if (!gameId) {
		// No game ID present
		throw error(404);
	}

	// Get today game lineups
	const date = formatTodayDate();
	const url = LINEUPS_JSON.replace(/today/i, date);
	const res = await fetch(url);
	if (!res.ok) {
		throw error(404);
	}
	const { games } = await res.json();
	const game = games.find((g: LUGame) => g.gameId === gameId);
	const matchup = transformGame(game);

	return { game: matchup };
}) satisfies PageServerLoad;
