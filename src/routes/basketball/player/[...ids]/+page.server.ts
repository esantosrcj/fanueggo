import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	if (!params) {
		// No game ID present
		throw error(404);
	}
	const [playerId, gameId] = params.ids.split('/');

	return { playerId, gameId };
}) satisfies PageServerLoad;
