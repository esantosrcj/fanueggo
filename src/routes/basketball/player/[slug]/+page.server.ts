import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const playerId = params.slug;
	if (!playerId) {
		// No game ID present
		throw error(404);
	}

	return { playerId };
}) satisfies PageServerLoad;
