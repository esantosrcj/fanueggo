<script lang="ts">
	import '../app.css';
	import Navbar from './Navbar.svelte';
</script>

<div>
	<Navbar />

	<main>
		<slot />
	</main>
</div>

<style>
	main {
		margin: 1.5rem;
	}
</style>
