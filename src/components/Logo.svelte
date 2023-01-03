<script context="module">
	import Picture from './Picture.svelte';
	import { state } from '../scripts/modules/stores.js';
</script>

<script>
	export let bemMix = '';

	let { logo, page } = $state;

	let href = page === 'index' ? null : `${page}.html`;
	let ariaCurrent = page === 'index' ? 'page' : null;
</script>

<a class="Logo {bemMix}" {href} aria-current={ariaCurrent}>
	<Picture bemMix="Logo__picture" {...logo} />
</a>
