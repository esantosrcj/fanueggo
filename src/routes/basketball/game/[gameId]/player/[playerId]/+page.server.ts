import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { MatchupData } from '$lib/types/basketball';
import { transformPlayerData } from '$lib/utils/data-helper';

export const load = (async ({ params, fetch }) => {
	const { gameId, playerId } = params;
	if (!gameId || !playerId) {
		// No game ID or player ID present
		throw error(404);
	}

	const url = `/api/player-data?playerId=${playerId}`;
	const res = await fetch(url);
	if (res.ok) {
		const playerStats = await res.json();
		let recentGames: MatchupData[] = [];
		// playerStats is array of arrays
		if (Array.isArray(playerStats) && playerStats.length) {
			recentGames = transformPlayerData(playerStats.flat());
		}

		return { gameId, games: recentGames };
	}

	return { gameId, games: [] };
}) satisfies PageServerLoad;
