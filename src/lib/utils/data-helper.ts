import type { GameDetail, SBGame, LUGame, GameLog, GameData } from '$lib/types/basketball';

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
	const groupByGame = gameLogs.reduce((acc: GameData[], curr) => {
		const gameId = curr.GAME_ID;
		const matchup = curr.MATCHUP;
		const teamId = curr.TEAM_ID;
		const team = curr.TEAM_ABBREVIATION;

		const playerId = curr.PLAYER_ID;
		const playerName = curr.PLAYER_NAME;
		const min = curr.MIN;
		const pts = curr.PTS;
		const fgm = curr.FGM;
		const fga = curr.FGA;
		const fgpct = curr.FG_PCT;
		const fg3m = curr.FG3M;
		const fg3a = curr.FG3A;
		const fg3pct = curr.FG3_PCT;
		const reb = curr.REB;
		const ast = curr.AST;
		const tov = curr.TOV;
		const stl = curr.STL;
		const blk = curr.BLK;

		const found = acc.find((obj) => obj.gameId === gameId);
		if (found) {
			found.players.push({
				playerId,
				playerName,
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
				blk,
				team
			});
		} else {
			acc.push({
				gameId,
				matchup,
				teamId,
				team,
				players: [
					{
						playerId,
						playerName,
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
						blk,
						team
					}
				]
			});
		}
		return acc;
	}, []);

	return groupByGame;
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
