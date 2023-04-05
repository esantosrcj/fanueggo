import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { LUGame } from '$lib/types/basketball';
import { transformGame, formatTodayDate } from '$lib/utils/data-helper';
import { LINEUPS_JSON, SCOREBOARD_JSON } from '$env/static/private';

export const load = (async ({ params, fetch }) => {
	const { gameId } = params;
	if (!gameId) {
		// No game ID present
		throw error(404);
	}

	let date;
	const sbRes = await fetch(SCOREBOARD_JSON);
	if (sbRes.ok) {
		const todaysScoreboard = await sbRes.json();
		const { gameDate } = todaysScoreboard.scoreboard;
		date = gameDate.replace(/-/g, '');
	} else {
		date = formatTodayDate();
	}

	// Get today game lineups
	let games: LUGame[] = [];
	const url = LINEUPS_JSON.replace(/date/i, date);
	const res = await fetch(url);
	if (res.status === 404) {
		// Try previous date player lineups
		let prevDate = new Date();
		prevDate = new Date(prevDate.setDate(prevDate.getDate() - 1));
		const prevDateStr = formatTodayDate(prevDate);
		const prevUrl = LINEUPS_JSON.replace(/date/i, prevDateStr);
		const prevRes = await fetch(prevUrl);
		const data = await prevRes.json();
		games = data.games;
	} else if (res.ok) {
		const data = await res.json();
		games = data.games;
	} else {
		throw error(404);
	}

	const game = games.find((g: LUGame) => g.gameId === gameId);
	if (game) {
		const matchup = transformGame(game);
		return { game: matchup };
	}

	return { game };
}) satisfies PageServerLoad;
