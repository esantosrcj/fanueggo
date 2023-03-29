import type { GameDetail, SBGame, LUGame } from '$lib/types/basketball';

export const transformGames = (games: SBGame[], gameDate: string) => {
	const gameDetails: GameDetail[] = [];
	if (games.length) {
		games.forEach((g) => {
			const date = new Date(g.gameTimeUTC);
			const startTime = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
			const detail = {
				gameId: g.gameId,
				gameDate: gameDate,
				gameTimeUTC: g.gameTimeUTC,
				startTime: startTime,
				homeTeamId: g.homeTeam.teamId,
				homeTeam: g.homeTeam.teamTricode,
				awayTeamId: g.awayTeam.teamId,
				awayTeam: g.awayTeam.teamTricode
			};
			gameDetails.push(detail);
		});
	}

	return gameDetails;
};

export const transformGame = (game: LUGame) => {
	if (game) {
		const { awayTeam, homeTeam } = game;
		const matchup = `${awayTeam.teamAbbreviation} @ ${homeTeam.teamAbbreviation}`;
		return {
			matchup: matchup,
			awayTeam: awayTeam.teamAbbreviation,
			awayPlayers: awayTeam.players,
			homeTeam: homeTeam.teamAbbreviation,
			homePlayers: homeTeam.players
		};
	}

	return undefined;
};

export const formatDate = (date: string) => {
	const [year, month, day] = date.split('-');
	const gameDate = new Date(+year, +month - 1, +day);
	return gameDate.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
};
