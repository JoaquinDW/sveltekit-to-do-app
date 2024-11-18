<script lang="ts">
	import { getTasksState, type TodoItem } from '$lib/state.svelte';

	let user = 'John Doe';
	let tasks = getTasksState();
	let taskTitle = $state('');

	function addTask(taskTitle: string) {
		if (taskTitle) {
			tasks.add(taskTitle);
		}
	}
</script>

{#snippet taskSnippet(task: TodoItem)}
	<li class="flex items-center justify-between rounded-lg bg-white p-4 shadow-md">
		<div class="flex items-center justify-between gap-2">
			<input
				type="checkbox"
				class="h-6 w-6 rounded-lg border-2 border-gray-400"
				class:checked={task.completed}
				bind:checked={task.completed}
			/>
			<p class="mb-0.5 text-lg font-semibold" class:completed={task.completed === true}>
				{task.text}
			</p>
		</div>
		<div>
			<button class="rounded-lg bg-blue-600 px-4 py-2 text-white">
				{task.completed ? 'Completed' : 'In Progress'}
			</button>
		</div>
	</li>
{/snippet}

<article class="flex h-[83vh] flex-1 flex-col px-20">
	<div class="flex items-end justify-between gap-1">
		<div>
			<h1 class="text-3xl font-bold">Good Morning, {user} 👋</h1>
			<!-- date -->
			<p class="text-lg text-gray-500">
				Today,
				{new Date().toLocaleDateString('en-US', {
					weekday: 'long',
					month: 'long',
					day: 'numeric',
					year: 'numeric'
				})}
			</p>
		</div>
		<p class=" text-lg">
			{tasks.tasksCount} tasks, {tasks.completedTasks.length} completed
		</p>
	</div>
	<ul class="mt-10 flex h-[90vh] flex-1 flex-col justify-start gap-4">
		{#each tasks.filteredTasks as task, key (task.id)}
			{@render taskSnippet(task)}
		{:else}
			<p>No tasks found</p>
		{/each}
	</ul>

	<dic action="?/addTodo" class="absolute bottom-10 flex w-2/3 rounded-2xl">
		<input
			class="relative w-full rounded-2xl bg-gray-900 px-8 py-6 text-lg text-white"
			placeholder="Create a new task"
			bind:value={taskTitle}
		/>
		<!-- button to add task -->
		<button
			class="absolute bottom-2 right-2 top-2 w-1/6 rounded-2xl bg-blue-600 py-3 font-semibold text-white"
			onclick={() => addTask(taskTitle)}
			onkeydown={(e) => e.key === 'Enter' && addTask(taskTitle)}
		>
			Add Task
		</button>
	</dic>
</article>

<style>
	.completed {
		@apply text-gray-500 line-through opacity-80;
	}
</style>
