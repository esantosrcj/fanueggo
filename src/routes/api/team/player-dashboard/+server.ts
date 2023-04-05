import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { ResultSet, PlayerStats } from '$lib/types/basketball';
import { teamPlayerDashboardParams } from '$lib/utils/url-params';
import { transformToJSON } from '$lib/utils/data-helper';
import { APIHeaders } from '$lib/constants/stats';
import { PUBLIC_STATS_API } from '$env/static/public';

export const GET = (async ({ url }) => {
	const teamId = Number(url.searchParams.get('teamId') ?? '0');

	if (teamId === 0) {
		// No valid team ID
		return json([]);
	}

	// Player game logs for last 10 games
	const urlParams = teamPlayerDashboardParams(teamId);
	const apiUrl = `${PUBLIC_STATS_API}/teamplayerdashboard?${urlParams}`;
	const res = await fetch(apiUrl, {
		method: 'GET',
		headers: APIHeaders
	});

	if (res.ok) {
		const { resultSets } = await res.json();
		const playerSznTotals = resultSets.find((r: ResultSet) => r.name === 'PlayersSeasonTotals');
		let playerStats: PlayerStats[] = [];
		if (playerSznTotals) {
			const { headers, rowSet } = playerSznTotals;
			playerStats = transformToJSON(headers, rowSet);
		}

		return json(playerStats);
	}

	return json([]);
}) satisfies RequestHandler;
