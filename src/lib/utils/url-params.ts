export const playerGameLogsParams = (
	playerID: number,
	lastNGames = 0,
	dateFrom = '',
	dateTo = '',
	gameSegment = '',
	leagueID = '00',
	location = '',
	measureType = 'Base',
	month = 0,
	oppTeamID = 0,
	opponentTeamID = 0,
	outcome = '',
	poRound = 0,
	paceAdjust = 'N',
	perMode = 'Totals',
	period = 0,
	plusMinus = 'N',
	rank = 'N',
	season = '2022-23',
	seasonSegment = '',
	seasonType = 'Regular Season',
	shotClockRange = '',
	teamID = '',
	vsConference = '',
	vsDivision = ''
) => {
	if (lastNGames < 0 || lastNGames > 15) {
		lastNGames = 0;
	}

	const urlParams = [
		`DateFrom=${dateFrom}`,
		`DateTo=${dateTo}`,
		`GameSegment=${gameSegment}`,
		`LastNGames=${lastNGames}`,
		`LeagueID=${leagueID}`,
		`Location=${location}`,
		`MeasureType=${measureType}`,
		`Month=${month}`,
		`OppTeamID=${oppTeamID}`,
		`OpponentTeamID=${opponentTeamID}`,
		`Outcome=${outcome}`,
		`PORound=${poRound}`,
		`PaceAdjust=${paceAdjust}`,
		`PerMode=${perMode}`,
		`Period=${period}`,
		`PlayerID=${playerID}`,
		`PlusMinus=${plusMinus}`,
		`Rank=${rank}`,
		`Season=${season}`,
		`SeasonSegment=${seasonSegment}`,
		`SeasonType=${seasonType}`,
		`ShotClockRange=${shotClockRange}`,
		`TeamID=${teamID}`,
		`VsConference=${vsConference}`,
		`VsDivision=${vsDivision}`
	];

	return urlParams.join('&');
};
