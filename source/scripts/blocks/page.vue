<template>
	<div class="page">
		<main class="page__main" />
	</div>
</template>

<script>
	export default {
		name: 'PageApp',

		data() {
			return { ...this.$root.$data.appData };
		}
	};
</script>
