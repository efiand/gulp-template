<script context="module">
	import { Breakpoint } from '../scripts/constants.js';
	import punctify from '../scripts/utils/punctify.js';
	import { state } from '../scripts/modules/stores.js';
</script>

<script>
	export let adaptive = false,
		alt = '',
		bemMix = '',
		ext = 'jpg',
		filename = '',
		height = null,
		immediately = false,
		width = null;

	let { rootPath } = $state;
</script>

<picture class="Picture {bemMix}">
	{#if !$state.devMode && ext !== 'svg'}
		{#if adaptive}
			<source
				type="image/webp"
				media="(min-width: {Breakpoint.DESKTOP}px)"
				srcset="{rootPath}images/{filename}-desktop.webp 1x, {rootPath}images/{filename}-desktop@2x.webp 2x"
			/>
			<source
				type="image/webp"
				media="(min-width: {Breakpoint.TABLET}px)"
				srcset="{rootPath}images/{filename}-tablet.webp 1x, {rootPath}images/{filename}-tablet@2x.webp 2x"
			/>
		{/if}

		<source type="image/webp" srcset="{rootPath}images/{filename}.webp 1x, {rootPath}images/{filename}@2x.webp 2x" />
	{/if}

	{#if adaptive}
		<source
			media="(min-width: {Breakpoint.DESKTOP}px)"
			srcset="{rootPath}images/{filename}-desktop.{ext} 1x, {rootPath}images/{filename}-desktop@2x.{ext} 2x"
		/>
		<source
			media="(min-width: {Breakpoint.TABLET}px)"
			srcset="{rootPath}images/{filename}-tablet.{ext} 1x, {rootPath}images/{filename}-tablet@2x.{ext} 2x"
		/>
	{/if}

	<img
		class="Picture__image"
		src="{rootPath}images/{filename}.{ext}"
		srcset="{rootPath}images/{filename}@2x.{ext} 2x"
		{width}
		{height}
		alt={alt ? punctify(alt) : ''}
		aria-hidden={alt ? null : 'true'}
		loading={immediately ? null : 'lazy'}
	/>
</picture>
