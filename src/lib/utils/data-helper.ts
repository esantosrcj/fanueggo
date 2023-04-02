import type { GameDetail, SBGame, LUGame, GameLog } from '$lib/types/basketball';

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
		const { gameId, awayTeam, homeTeam } = game;
		const matchup = `${awayTeam.teamAbbreviation} @ ${homeTeam.teamAbbreviation}`;
		return {
			gameId: gameId,
			matchup: matchup,
			awayTeam: awayTeam.teamAbbreviation,
			awayPlayers: awayTeam.players,
			homeTeam: homeTeam.teamAbbreviation,
			homePlayers: homeTeam.players
		};
	}

	return undefined;
};

export const transformPlayerData = (gameLogs: GameLog[]) => {
	return gameLogs.map((game) => {
		const {
			GAME_ID: gameId,
			MATCHUP: matchup,
			MIN: min,
			PTS: pts,
			FGM: fgm,
			FGA: fga,
			FG_PCT: fgpct,
			FG3M: fg3m,
			FG3A: fg3a,
			FG3_PCT: fg3pct,
			REB: reb,
			AST: ast,
			TOV: tov,
			STL: stl,
			BLK: blk
		} = game;

		return {
			gameId,
			matchup,
			min,
			pts,
			fgm,
			fga,
			fgpct,
			fg3m,
			fg3a,
			fg3pct,
			reb,
			ast,
			tov,
			stl,
			blk
		};
	});
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

export const formatTodayDate = () => {
	const date = new Date();
	const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000);
	const dateStr = localDate.toISOString().split('T')[0];
	return dateStr.replace(/-/g, '');
};
