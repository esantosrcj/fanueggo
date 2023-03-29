interface SBTeam {
	teamId: number;
	teamTricode: string;
}

export interface SBGame {
	gameId: string;
	gameTimeUTC: string;
	homeTeam: SBTeam;
	awayTeam: SBTeam;
}

export interface GameDetail {
	gameId: string;
	gameDate: string;
	gameTimeUTC: string;
	startTime: string;
	homeTeamId: number;
	homeTeam: string;
	awayTeamId: number;
	awayTeam: string;
}
