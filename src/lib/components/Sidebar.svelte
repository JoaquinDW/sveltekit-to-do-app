<script lang="ts">
	import { getTasksState } from '$lib/state.svelte';

	const CATEGORIES = ['All', 'Completed', 'In Progress'];
	let tasks = getTasksState();

	function handleCategoryClick(category: 'All' | 'Completed' | 'In Progress') {
		tasks.updateCategory = category;
	}
</script>

<article class="h-[97vh] w-1/4 rounded-lg border bg-white px-6 py-20">
	<h3 class="mb-5 text-xl font-bold">Categories</h3>
	<ul>
		{#each CATEGORIES as category}
			<li>
				<button
					onclick={() => handleCategoryClick(category as 'All' | 'Completed' | 'In Progress')}
					class="w-full rounded-lg px-4 py-2 text-left font-medium"
					class:bg-primary={category === tasks.selectedCategory}
				>
					{category}
				</button>
			</li>
		{/each}
	</ul>
</article>
