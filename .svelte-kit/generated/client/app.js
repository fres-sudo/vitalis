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
	() => import('./nodes/8'),
	() => import('./nodes/9')
];

export const server_loads = [0];

export const dictionary = {
		"/(app)": [~4,[2]],
		"/(auth)/login": [~5,[3]],
		"/(auth)/resetpassword": [~6,[3]],
		"/(auth)/resetpassword/[token]": [~7,[3]],
		"/(auth)/signup": [~8,[3]],
		"/(auth)/verify/[userId]/[token]": [~9,[3]]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),

	reroute: (() => {})
};

export { default as root } from '../root.js';