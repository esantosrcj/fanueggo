<script lang="ts">
	import logo from '$lib/images/svelte-logo.svg';
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
</script>

<Navbar let:hidden let:toggle rounded color="form">
	<NavBrand href="/">
		<img src={logo} class="mr-3 h-6 sm:h-9" alt="Svelte Logo" />
		<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
			Fanueggo
		</span>
	</NavBrand>
	<NavHamburger on:click={toggle} />
	<NavUl {hidden}>
		<NavLi href="/basketball">Basketball</NavLi>
	</NavUl>
</Navbar>
