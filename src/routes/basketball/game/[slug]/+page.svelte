<script lang="ts">
	import { Breadcrumb, BreadcrumbItem, Heading } from 'flowbite-svelte';
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
		matchup={game.matchup}
		awayTeam={game.awayTeam}
		awayStarters={game.awayPlayers}
		homeTeam={game.homeTeam}
		homeStarters={game.homePlayers}
	/>
{:else}
	<div class="text-center">
		<Heading tag="h1" class="mb-4" customSize="text-4xl font-extrabold  md:text-5xl lg:text-6xl">
			No Game.
		</Heading>
	</div>
{/if}
