<script lang="ts">
	import { Breadcrumb, BreadcrumbItem } from 'flowbite-svelte';
	import type { PageData } from './$types';

	// From load in +page.server.ts
	export let data: PageData;

	// `$:` means 're-run whenever these values change'
	$: ({ gameId } = data);
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

<h1>{gameId}</h1>
