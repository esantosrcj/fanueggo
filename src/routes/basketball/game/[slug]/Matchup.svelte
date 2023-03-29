<script lang="ts">
	import Table from './Table.svelte';
	import type { LUPlayer } from '$lib/types/basketball';

	export let matchup = 'Team 1 at Team 2';
	export let awayStarters: LUPlayer[];
	export let homeStarters: LUPlayer[];
</script>

<div class="ml-8 mt-8">
	<h1 class="mb-4">{matchup}</h1>
	<!-- Away Starters -->
	<Table starters={awayStarters} />
	<!-- Home Starters -->
	<Table starters={homeStarters} />
</div>
