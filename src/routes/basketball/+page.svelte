<script lang="ts">
	import { Breadcrumb, BreadcrumbItem, Card, Heading, Mark } from 'flowbite-svelte';
	import type { PageData } from './$types';

	// From load in +page.server.ts
	export let data: PageData;

	// `$:` means 're-run whenever these values change'
	$: ({ date, games } = data);
</script>

<svelte:head>
	<title>Basketball</title>
	<meta name="description" content="Basketball page" />
</svelte:head>

<Breadcrumb aria-label="App breadcrumb">
	<BreadcrumbItem>Basketball</BreadcrumbItem>
</Breadcrumb>

<div class="text-center">
	<Heading tag="h2" class="mb-4 mt-4">Games <Mark>{date}</Mark></Heading>
</div>

<div class="ml-12">
	{#if games.length}
		<div class="grid grid-cols-3 gap-2">
			{#each games as game}
				<Card href={`/basketball/game/${game.gameId}`} class="mb-6">
					<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
						{game.startTime}
					</h5>
					<p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">
						{game.awayTeam} @ {game.homeTeam}
					</p>
				</Card>
			{/each}
		</div>
	{:else}
		<div class="text-center">
			<Heading tag="h3">No Games Scheduled</Heading>
		</div>
	{/if}
</div>
