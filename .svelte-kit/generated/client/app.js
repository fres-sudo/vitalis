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
	() => import('./nodes/9'),
	() => import('./nodes/10'),
	() => import('./nodes/11')
];

export const server_loads = [0];

export const dictionary = {
		"/(app)": [~4,[2]],
		"/(app)/help": [5,[2]],
		"/(auth)/login": [~6,[3]],
		"/(auth)/resetpassword": [~7,[3]],
		"/(auth)/resetpassword/[token]": [~8,[3]],
		"/(auth)/signup": [~9,[3]],
		"/(auth)/test": [~10,[3]],
		"/(auth)/verify/[userId]/[token]": [~11,[3]]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),

	reroute: (() => {})
};

export { default as root } from '../root.js';