<script context="module">
	import { punctify } from '../../scripts/utils.js';
</script>

<script>
	export let area = false,
		bemMix = '',
		name = null,
		pattern = null,
		placeholder = '',
		required = false,
		title = placeholder,
		type = 'text',
		value = null;

	let visuallyHidden = title === placeholder;
	let icon = type === 'text' ? null : type;

	placeholder = `${placeholder}${required ? '*' : ''}`;
</script>

<label class="Field {bemMix}">
	<span class:visuallyHidden>{punctify(title, [':'])}</span>

	{#if area}
		<textarea class="Field__input Field__input_area" {name} {placeholder} {required}>{value || ''}</textarea>
	{:else}
		<input
			class="Field__input"
			class:Field__input_iconable={icon}
			style:--icon="url('../images/icons.svg#{icon}')"
			{type}
			{name}
			{value}
			{placeholder}
			{pattern}
			{required}
		/>
	{/if}
</label>
