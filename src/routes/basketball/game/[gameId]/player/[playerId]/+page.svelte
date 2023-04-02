<script lang="ts">
	import { Breadcrumb, BreadcrumbItem, Heading } from 'flowbite-svelte';
	import type { PageData } from './$types';
	import Table from './Table.svelte';

	// From load in +page.server.ts
	export let data: PageData;

	// `$:` means 're-run whenever these values change'
	$: ({ gameId, gameLogs } = data);
</script>

<svelte:head>
	<title>Player</title>
	<meta name="description" content="Player" />
</svelte:head>

<Breadcrumb aria-label="Breadcrumb">
	<BreadcrumbItem href="/" home>Home</BreadcrumbItem>
	<BreadcrumbItem href="/basketball">Basketball</BreadcrumbItem>
	<BreadcrumbItem href={`/basketball/game/${gameId}`}>Game</BreadcrumbItem>
	<BreadcrumbItem>Player</BreadcrumbItem>
</Breadcrumb>

{#if gameLogs && gameLogs.length}
	<div class="ml-8 mt-8">
		<Table {gameLogs} />
	</div>
{:else}
	<div class="text-center">
		<Heading tag="h1" class="mb-4" customSize="text-4xl font-extrabold  md:text-5xl lg:text-6xl">
			No Data.
		</Heading>
	</div>
{/if}
