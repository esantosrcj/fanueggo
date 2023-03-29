<script lang="ts">
	import { Breadcrumb, BreadcrumbItem, Heading, Mark } from 'flowbite-svelte';
	import { Listgroup } from 'flowbite-svelte';
	import type { PageData } from './$types';

	// From load in +page.server.ts
	export let data: PageData;

	$: links = data.games.map((g) => ({
		name: `${g.startTime} | ${g.awayTeam} @ ${g.homeTeam}`,
		href: `/basketball/game/${g.gameId}`
	}));
</script>

<svelte:head>
	<title>Basketball</title>
	<meta name="description" content="Basketball page" />
</svelte:head>

<Breadcrumb aria-label="App breadcrumb">
	<BreadcrumbItem href="/" home>Home</BreadcrumbItem>
	<BreadcrumbItem>Basketball</BreadcrumbItem>
</Breadcrumb>

<div class="text-center">
	<Heading tag="h2" class="mb-4 mt-4">Today's Games <Mark>{data.todayDate}</Mark></Heading>
</div>

<Listgroup active items={links} let:item class="w-48 ml-8">
	{item.name}
</Listgroup>
