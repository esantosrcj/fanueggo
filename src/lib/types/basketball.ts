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

export interface LUPlayer {
	personId: number;
	teamId: number;
	firstName: string;
	lastName: string;
	playerName: string;
	position: string;
	lineupStatus: string;
	rosterStatus: string;
}

export interface LUTeam {
	teamId: number;
	teamAbbreviation: string;
	players: LUPlayer[];
}

export interface LUGame {
	gameId: string;
	homeTeam: LUTeam;
	awayTeam: LUTeam;
}
