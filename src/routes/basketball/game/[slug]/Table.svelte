<script lang="ts">
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';
	import type { LUPlayer } from '$lib/types/basketball';

	export let starters: LUPlayer[];
</script>

<Table hoverable={true} shadow divClass="mb-8">
	<TableHead>
		<TableHeadCell>Team</TableHeadCell>
		<TableHeadCell>Name</TableHeadCell>
		<TableHeadCell>Position</TableHeadCell>
	</TableHead>
	<TableBody tableBodyClass="divide-y">
		{#each starters as player}
			{#if player.position}
				<TableBodyRow>
					<TableBodyCell>{player.teamId}</TableBodyCell>
					<TableBodyCell>{player.playerName}</TableBodyCell>
					<TableBodyCell>{player.position}</TableBodyCell>
				</TableBodyRow>
			{/if}
		{/each}
	</TableBody>
</Table>
