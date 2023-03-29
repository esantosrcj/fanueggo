import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const gameId = params.slug;
	if (!gameId) {
		// No game ID present
		throw error(404);
	}

	return { gameId };
}) satisfies PageServerLoad;
