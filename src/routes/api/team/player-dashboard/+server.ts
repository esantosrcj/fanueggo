import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { PlayerStats } from '$lib/types/basketball';
import { teamPlayerDashboardParams } from '$lib/utils/url-params';
import { APIHeaders } from '$lib/constants/stats';
import { PUBLIC_STATS_API } from '$env/static/public';

export const GET = (async ({ url }) => {
	const teamId = Number(url.searchParams.get('teamId') ?? '0');

	// Player game logs for last 10 games
	const urlParams = teamPlayerDashboardParams(teamId);
	const apiUrl = `${PUBLIC_STATS_API}/teamplayerdashboard?${urlParams}`;
	const res = await fetch(apiUrl, {
		method: 'GET',
		headers: APIHeaders
	});

	if (res.ok) {
		const { resultSets } = await res.json();
		const playerSznTotals = resultSets.find((r) => r.name === 'PlayersSeasonTotals');
		let playerStats: PlayerStats[] = [];
		if (playerSznTotals) {
			const { headers, rowSet } = playerSznTotals;
			const jsonStrArr: string[] = [];
			rowSet.forEach((row: (string | number)[]) => {
				// row is an array
				const keyValPairs: string[] = [];
				row.forEach((rowData, index) => {
					const value = typeof rowData === 'string' ? `"${rowData}"` : rowData;
					keyValPairs.push(`"${headers[index]}":${value}`);
				});
				jsonStrArr.push(`{${keyValPairs.join(',')}}`);
			});
			playerStats = jsonStrArr.map((sznAvg) => JSON.parse(sznAvg));
		}

		return json(playerStats);
	}

	return json([]);
}) satisfies RequestHandler;
