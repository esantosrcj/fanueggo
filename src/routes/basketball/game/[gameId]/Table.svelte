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

	export let gameId: string;
	export let starters: LUPlayer[];
</script>

<Table hoverable={true} shadow divClass="mb-8">
	<TableHead>
		<TableHeadCell>Team</TableHeadCell>
		<TableHeadCell>Name</TableHeadCell>
		<TableHeadCell>Position</TableHeadCell>
		<TableHeadCell>
			<span class="sr-only">Chart</span>
		</TableHeadCell>
	</TableHead>
	<TableBody tableBodyClass="divide-y">
		{#each starters as player}
			{#if player.position}
				<TableBodyRow>
					<TableBodyCell>{player.teamId}</TableBodyCell>
					<TableBodyCell>{player.playerName}</TableBodyCell>
					<TableBodyCell>{player.position}</TableBodyCell>
					<TableBodyCell>
						<a
							href={`/basketball/game/${gameId}/player/${player.personId}`}
							class="font-medium text-blue-600 hover:underline dark:text-blue-500"
						>
							Stats
						</a>
					</TableBodyCell>
				</TableBodyRow>
			{/if}
		{/each}
	</TableBody>
</Table>
