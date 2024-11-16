import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				primary: '#F4F4F4'
			}
		}
	},

	plugins: []
} satisfies Config;
