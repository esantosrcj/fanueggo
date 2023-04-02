import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { GameData } from '$lib/types/basketball';
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
		let gameData: GameData[] = [];
		// playerStats is array of arrays
		if (Array.isArray(playerStats) && playerStats.length) {
			gameData = transformPlayerData(playerStats.flat());
		}

		return { gameId, gameData };
	}

	return { gameId, gameData: [] };
}) satisfies PageServerLoad;
