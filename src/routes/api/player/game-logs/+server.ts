import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { GameLog, ResultSet } from '$lib/types/basketball';
import { playerGameLogsParams } from '$lib/utils/url-params';
import { transformToJSON } from '$lib/utils/data-helper';
import { APIHeaders } from '$lib/constants/stats';
import { PUBLIC_STATS_API } from '$env/static/public';

export const GET = (async ({ url }) => {
	const playerId = Number(url.searchParams.get('playerId') ?? '0');

	// Player game logs for last 10 games
	const urlParams = playerGameLogsParams(playerId, 10);
	const apiUrl = `${PUBLIC_STATS_API}/playergamelogs?${urlParams}`;
	const res = await fetch(apiUrl, {
		method: 'GET',
		headers: APIHeaders
	});

	if (res.ok) {
		const { resultSets } = await res.json();
		const playerGameLogs = resultSets.find((r: ResultSet) => r.name === 'PlayerGameLogs');
		let gameLogs: GameLog[] = [];
		if (playerGameLogs) {
			const { headers, rowSet } = playerGameLogs;
			gameLogs = transformToJSON(headers, rowSet);
		}

		return json(gameLogs);
	}

	return json([]);
}) satisfies RequestHandler;
