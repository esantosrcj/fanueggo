<script lang="ts">
	import { Tabs, TabItem } from 'flowbite-svelte';
	import Table from './Table.svelte';
	import type { LUPlayer } from '$lib/types/basketball';

	export let matchup = 'Team 1 at Team 2';
	export let awayTeam: string;
	export let awayStarters: LUPlayer[];
	export let homeTeam: string;
	export let homeStarters: LUPlayer[];
</script>

<div class="ml-8 mt-8">
	<h1 class="mb-4">{matchup}</h1>
	<Tabs style="underline">
		<TabItem open>
			<span slot="title">{awayTeam}</span>
			<!-- Away Starters -->
			<Table starters={awayStarters} />
		</TabItem>
		<TabItem>
			<span slot="title">{homeTeam}</span>
			<!-- Home Starters -->
			<Table starters={homeStarters} />
		</TabItem>
	</Tabs>
</div>
