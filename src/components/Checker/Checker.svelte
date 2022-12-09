<script>
	export let bemMix = '',
		checked = false,
		name = null,
		title = '',
		type = 'checkbox',
		value = null;
</script>

<label class="Checker {bemMix}">
	<input class="Checker__input Checker__input_{type}" {type} {name} {value} {checked} />
	{title}
</label>
