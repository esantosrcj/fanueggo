<script lang="ts">
	import { Breadcrumb, BreadcrumbItem } from 'flowbite-svelte';
	import { Listgroup } from 'flowbite-svelte';
	import type { PageData } from './$types';

	// From load in +page.server.ts
	export let data: PageData;

	let links = [
		{ name: 'Accordions', href: '/accordions', current: true },
		{ name: 'Alerts', href: '/alerts' },
		{ name: 'Badges', href: '/badges' },
		{ name: 'Breadcrumbs', href: '/breadcrumbs' }
	];
</script>

<svelte:head>
	<title>Basketball</title>
	<meta name="description" content="Basketball page" />
</svelte:head>

<Breadcrumb aria-label="Default breadcrumb example">
	<BreadcrumbItem href="/" home>Home</BreadcrumbItem>
</Breadcrumb>

<div class="p-8">
	<h1>Today's Games - {data.todayDate}</h1>
</div>

<Listgroup active items={links} let:item class="w-48">
	{item.name}
</Listgroup>
