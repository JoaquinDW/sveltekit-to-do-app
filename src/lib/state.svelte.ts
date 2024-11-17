import { getContext, setContext } from 'svelte';

export type TodoItem = {
	id: number;
	text: string;
	completed: boolean;
};

export type CategoryType = 'All' | 'Completed' | 'In Progress';

export class TasksState {
	tasks = $state<TodoItem[]>([
		{ id: 1, text: 'Learn Svelte', completed: false },
		{ id: 2, text: 'Learn Sapper', completed: false },
		{ id: 3, text: 'Learn SvelteKit', completed: false }
	]);

	selectedCategory = $state<CategoryType>('All');

	// selectedCategory = $state<string>('All');

	constructor() {}

	add(text: string) {
		const id = this.tasks.length + 1;
		this.tasks.push({ id, text, completed: false });
	}

	remove(id: number) {
		this.tasks = this.tasks.filter((task) => task.id !== id);
	}

	toggleCompleted(id: number) {
		const task = this.tasks.find((task) => task.id === id);
		if (task) {
			task.completed = !task.completed;
		}
	}

	// updateSelectedCategory(category: CategoryType) {
	// 	this.selectedCategory = category;
	// }

	get completedTasks() {
		return this.tasks.filter((task) => task.completed);
	}

	get tasksCount() {
		return this.tasks.length;
	}

	get filteredTasks() {
		if (this.selectedCategory === 'All') {
			return this.tasks;
		}
		if (this.selectedCategory === 'Completed') {
			return this.completedTasks;
		}
		return this.tasks.filter((task) => !task.completed);
	}

	set updateCategory(category: CategoryType) {
		this.selectedCategory = category;
	}
}

const TASK_KEY = Symbol('tasks');

export function setTasksState() {
	return setContext(TASK_KEY, new TasksState());
}

export function getTasksState() {
	return getContext(TASK_KEY) as TasksState;
}
