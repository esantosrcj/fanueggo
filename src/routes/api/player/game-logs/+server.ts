import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { GameLog } from '$lib/types/basketball';
import { playerGameLogsParams } from '$lib/utils/url-params';
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
		const dataRows = resultSets[0].rowSet; // Array of arrays
		const headers = resultSets[0].headers;
		const jsonStrArr: string[] = [];
		dataRows.forEach((row: (string | number)[]) => {
			// row is an array
			const keyValPairs: string[] = [];
			row.forEach((rowData, index) => {
				const value = typeof rowData === 'string' ? `"${rowData}"` : rowData;
				keyValPairs.push(`"${headers[index]}":${value}`);
			});
			jsonStrArr.push(`{${keyValPairs.join(',')}}`);
		});
		const gameLogs: GameLog[] = jsonStrArr.map((game) => JSON.parse(game));

		return json(gameLogs);
	}

	return json([]);
}) satisfies RequestHandler;
