<script lang="ts">
	import { Breadcrumb, BreadcrumbItem } from 'flowbite-svelte';
	import Matchup from './Matchup.svelte';
	import type { PageData } from './$types';

	// From load in +page.server.ts
	export let data: PageData;

	// `$:` means 're-run whenever these values change'
	$: ({ game } = data);
</script>

<svelte:head>
	<title>Basketball Game</title>
	<meta name="description" content="Basketball game" />
</svelte:head>

<Breadcrumb aria-label="Default breadcrumb example">
	<BreadcrumbItem href="/" home>Home</BreadcrumbItem>
	<BreadcrumbItem href="/basketball">Basketball</BreadcrumbItem>
	<BreadcrumbItem>Game</BreadcrumbItem>
</Breadcrumb>

{#if game}
	<Matchup
		matchup={`${game.awayTeam.teamAbbreviation} @ ${game.homeTeam.teamAbbreviation}`}
		awayTeam={game.awayTeam.teamAbbreviation}
		awayStarters={game.awayTeam.players}
		homeTeam={game.homeTeam.teamAbbreviation}
		homeStarters={game.homeTeam.players}
	/>
{:else}
	<h1>NO GAME</h1>
{/if}
