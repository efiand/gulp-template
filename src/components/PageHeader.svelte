<script context="module">
	import Logo from './Logo.svelte';
	import { state } from '../scripts/modules/stores.js';
</script>

<script>
	export let bemMix = '';
</script>

<header class="PageHeader" class:[bemMix]={bemMix}>
	<Logo bemMix="PageHeader__logo" {...$state.logo} />
</header>
