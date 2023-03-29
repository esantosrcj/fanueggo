import type { PageServerLoad } from './$types';
import { transformGames, formatDate } from '$lib/utils/data-helper';
import { SCOREBOARD_JSON } from '$env/static/private';

export const load = (async ({ fetch }) => {
	// Get today's games
	const res = await fetch(SCOREBOARD_JSON);
	if (res.ok) {
		const todaysScoreboard = await res.json();
		const { gameDate, games } = todaysScoreboard.scoreboard;
		const gamesData = transformGames(games, gameDate);
		const todayDate = formatDate(gameDate);

		// Sort by start time
		gamesData.sort((a, b) => {
			const dateA = new Date(a.gameTimeUTC).getTime();
			const dateB = new Date(b.gameTimeUTC).getTime();

			return dateA - dateB;
		});

		return { todayDate, games: gamesData };
	}

	const todayDate = new Date().toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});

	return { todayDate, games: [] };
}) satisfies PageServerLoad;
