<script lang="ts">
	import { setTasksState } from '$lib/state.svelte';
	import '../app.css';
	let { children } = $props();

	let contextState = setTasksState();
	$inspect(contextState);
</script>

{@render children()}
