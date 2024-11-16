<script lang="ts">
	const CATEGORIES = [' All', 'Completed', 'In Progress'];
	let selectedCategory = $state('All');
	let user = 'John Doe';
	let tasks = $state([
		{
			id: 1,
			title: 'Create a Project with SvelteKit',
			status: 'In Progress'
		},
		{
			id: 2,
			title: 'Learn about Mathematics',
			status: 'In Progress'
		},
		{
			id: 3,
			title: 'Learn about Physics',
			status: 'In Progress'
		}
	]);
	let taskCount = $derived(tasks.length);
	let completedTasks = $derived(tasks.filter((task) => task.status === 'Completed').length);
	let taskTitle = '';

	function handleCategoryClick(category: string) {
		selectedCategory = category;
	}

	function handleCompleteTask(taskId: number) {
		tasks = tasks.map((task) => {
			if (task.id === taskId) {
				task.status = task.status === 'Completed' ? 'In Progress' : 'Completed';
			}
			return task;
		});
	}

	function addTask(title: string) {
		const newTask = {
			id: tasks.length + 1,
			title,
			status: 'In Progress'
		};
		tasks = [...tasks, newTask];
	}
</script>

<section class="flex h-full items-center justify-center px-2 py-4">
	<article class="h-[97vh] w-1/4 rounded-lg border bg-white px-6 py-20">
		<h3 class="mb-5 text-xl font-bold">Categories</h3>
		<ul>
			{#each CATEGORIES as category}
				<li>
					<button
						onclick={() => handleCategoryClick(category)}
						class="w-full rounded-lg px-4 py-2 text-left font-medium"
						class:bg-primary={category === selectedCategory}
					>
						{category}
					</button>
				</li>
			{/each}
		</ul>
	</article>
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
				{taskCount} tasks, {completedTasks} completed
			</p>
		</div>
		<ul class="mt-10 flex h-[90vh] flex-1 flex-col justify-start gap-4">
			{#each tasks as task, key (task.id)}
				<li class="flex items-center justify-between rounded-lg bg-white p-4 shadow-md">
					<div class="flex items-center justify-between gap-2">
						<input
							type="checkbox"
							class="h-6 w-6 rounded-lg border-2 border-gray-400"
							class:checked={task.status === 'Completed'}
							onchange={() => handleCompleteTask(task.id)}
						/>
						<p class="mb-0.5 text-lg font-semibold" class:completed={task.status === 'Completed'}>
							{task.title}
						</p>
					</div>
					<div>
						<button class="rounded-lg bg-blue-600 px-4 py-2 text-white">
							{task.status}
						</button>
					</div>
				</li>
			{:else}
				<p>No tasks found</p>
			{/each}
		</ul>

		<div class="absolute bottom-10 flex w-2/3 rounded-2xl">
			<input
				class="relative w-full rounded-2xl bg-gray-900 px-8 py-6 text-lg text-white"
				placeholder="Create a new task"
			/>
			<!-- button to add task -->
			<button
				class="absolute bottom-2 right-2 top-2 w-1/6 rounded-2xl bg-blue-600 py-3 font-semibold text-white"
			>
				Add Task
			</button>
		</div>
	</article>
</section>

<style>
	.completed {
		@apply text-gray-500 line-through opacity-80;
	}
</style>
