<script context="module">
	import Checker from '../Checker/Checker.svelte';
	import Field from '../Field/Field.svelte';
</script>

<script>
	export let action = null,
		method = 'get',
		sets = [],
		submitText = 'OK';
</script>

<form class="Form" {action} {method}>
	{#each sets as { checkers = [], fields = [], title }}
		<fieldset class="Form__set">
			<legend class="Form__title">{title}</legend>

			{#if checkers.length}
				<ul class="Form__checkers">
					{#each checkers as checker}
						<li class="Form__checker">
							<Checker {...checker} />
						</li>
					{/each}
				</ul>
			{/if}

			{#each fields as field}
				<p class="Form__field">
					<Field {...field} />
				</p>
			{/each}
		</fieldset>
	{/each}

	<button class="Form__submit Button" type="submit">{submitText}</button>
</form>
