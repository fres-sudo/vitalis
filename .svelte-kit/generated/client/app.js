export { matchers } from './matchers.js';

export const nodes = [
	() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8')
];

export const server_loads = [0];

export const dictionary = {
		"/(app)": [~3,[2]],
		"/(auth)/login": [~4],
		"/(auth)/resetpassword": [~5],
		"/(auth)/resetpassword/[token]": [~6],
		"/(auth)/signup": [~7],
		"/(auth)/verify/[userId]/[token]": [~8]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),

	reroute: (() => {})
};

export { default as root } from '../root.js';