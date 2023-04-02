<script lang="ts">
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';
	import type { GameLog } from '$lib/types/basketball';

	export let gameLogs: GameLog[];
</script>

<h1 class="mb-8">{gameLogs[0].PLAYER_NAME}</h1>
<Table hoverable={true} shadow divClass="mb-8">
	<TableHead>
		<TableHeadCell>Matchup</TableHeadCell>
		<TableHeadCell>Minutes</TableHeadCell>
		<TableHeadCell>Points</TableHeadCell>
		<TableHeadCell>FGM</TableHeadCell>
		<TableHeadCell>FGA</TableHeadCell>
		<TableHeadCell>FG%</TableHeadCell>
		<TableHeadCell>3PM</TableHeadCell>
		<TableHeadCell>3PA</TableHeadCell>
		<TableHeadCell>3P%</TableHeadCell>
		<TableHeadCell>REB</TableHeadCell>
		<TableHeadCell>AST</TableHeadCell>
	</TableHead>
	<TableBody tableBodyClass="divide-y">
		{#each gameLogs as game}
			<TableBodyRow>
				<TableBodyCell>{game.MATCHUP}</TableBodyCell>
				<TableBodyCell>{Math.round(game.MIN)}</TableBodyCell>
				<TableBodyCell>{game.PTS}</TableBodyCell>
				<TableBodyCell>{game.FGM}</TableBodyCell>
				<TableBodyCell>{game.FGA}</TableBodyCell>
				<TableBodyCell>{`${(game.FG_PCT * 100).toFixed(1)}%`}</TableBodyCell>
				<TableBodyCell>{game.FG3M}</TableBodyCell>
				<TableBodyCell>{game.FG3A}</TableBodyCell>
				<TableBodyCell>{`${(game.FG3_PCT * 100).toFixed(1)}%`}</TableBodyCell>
				<TableBodyCell>{game.REB}</TableBodyCell>
				<TableBodyCell>{game.AST}</TableBodyCell>
			</TableBodyRow>
		{/each}
	</TableBody>
</Table>
