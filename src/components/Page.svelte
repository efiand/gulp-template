<script context="module">
	import ErrorPage from './ErrorPage.svelte';
	import IndexPage from './IndexPage.svelte';
	import PageFooter from './PageFooter.svelte';
	import PageHeader from './PageHeader.svelte';
	import punctify from '../scripts/utils/punctify.js';
	import { state } from '../scripts/modules/stores.js';

	const components = {
		404: ErrorPage,
		index: IndexPage
	};
</script>

<script>
	export let data = {};

	state.set(data);
</script>

<svelte:head>
	<title>{$state.project}</title>
	<meta name="description" content={punctify($state.description)} />
</svelte:head>

<div class="Page">
	<PageHeader bemMix="Page__header" />

	<main class="Page__main Page__main_noJs">
		<svelte:component this={components[data.page]} {...data} />
	</main>

	<PageFooter bemMix="Page__footer" />
</div>
