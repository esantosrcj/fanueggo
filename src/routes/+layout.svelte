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
		padding: 1.5rem;
	}
</style>
