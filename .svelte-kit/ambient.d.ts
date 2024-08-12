
// this file is generated — do not edit it


/// <reference types="@sveltejs/kit" />

/**
 * Environment variables [loaded by Vite](https://vitejs.dev/guide/env-and-mode.html#env-files) from `.env` files and `process.env`. Like [`$env/dynamic/private`](https://kit.svelte.dev/docs/modules#$env-dynamic-private), this module cannot be imported into client-side code. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://kit.svelte.dev/docs/configuration#env) (if configured).
 * 
 * _Unlike_ [`$env/dynamic/private`](https://kit.svelte.dev/docs/modules#$env-dynamic-private), the values exported from this module are statically injected into your bundle at build time, enabling optimisations like dead code elimination.
 * 
 * ```ts
 * import { API_KEY } from '$env/static/private';
 * ```
 * 
 * Note that all environment variables referenced in your code should be declared (for example in an `.env` file), even if they don't have a value until the app is deployed:
 * 
 * ```
 * MY_FEATURE_FLAG=""
 * ```
 * 
 * You can override `.env` values from the command line like so:
 * 
 * ```bash
 * MY_FEATURE_FLAG="enabled" npm run dev
 * ```
 */
declare module '$env/static/private' {
	export const ORIGIN: string;
	export const DATABASE_URL: string;
	export const REDIS_URL: string;
	export const GOOGLE_CLIENT_ID: string;
	export const GOOGLE_CLIENT_SECRET: string;
	export const npm_package_devDependencies__tailwindcss_typography: string;
	export const npm_package_devDependencies_vite_plugin_restart: string;
	export const npm_package_devDependencies_prettier: string;
	export const npm_package_dependencies_bits_ui: string;
	export const TERM_PROGRAM: string;
	export const npm_package_devDependencies_eslint_plugin_svelte: string;
	export const NODE: string;
	export const _P9K_TTY: string;
	export const npm_package_devDependencies_prettier_plugin_svelte: string;
	export const npm_package_devDependencies_typescript: string;
	export const npm_package_dependencies_vaul_svelte: string;
	export const INIT_CWD: string;
	export const SHELL: string;
	export const TERM: string;
	export const npm_package_scripts_db_generate: string;
	export const npm_package_devDependencies_vite: string;
	export const HOMEBREW_REPOSITORY: string;
	export const TMPDIR: string;
	export const npm_package_dependencies_svelte_sonner: string;
	export const npm_package_scripts_lint: string;
	export const TERM_PROGRAM_VERSION: string;
	export const npm_package_dependencies_tailwind_variants: string;
	export const WINDOWID: string;
	export const npm_package_scripts_dev: string;
	export const npm_package_devDependencies__lucia_auth_adapter_drizzle: string;
	export const npm_package_devDependencies_drizzle_kit: string;
	export const npm_package_dependencies_paneforge: string;
	export const npm_package_dependencies_hono_rate_limiter: string;
	export const npm_package_private: string;
	export const npm_package_devDependencies__sveltejs_kit: string;
	export const npm_config_registry: string;
	export const LC_ALL: string;
	export const ZSH: string;
	export const npm_package_dependencies_formsnap: string;
	export const npm_package_scripts_initialize: string;
	export const USER: string;
	export const npm_package_devDependencies__types_nodemailer: string;
	export const LS_COLORS: string;
	export const npm_package_scripts_check_watch: string;
	export const COMMAND_MODE: string;
	export const npm_package_devDependencies_zod: string;
	export const PNPM_SCRIPT_SRC_DIR: string;
	export const npm_package_devDependencies_reflect_metadata: string;
	export const SSH_AUTH_SOCK: string;
	export const npm_package_devDependencies_lucia: string;
	export const npm_package_dependencies__node_rs_argon2: string;
	export const __CF_USER_TEXT_ENCODING: string;
	export const npm_package_devDependencies_dayjs: string;
	export const npm_package_devDependencies_eslint: string;
	export const npm_package_devDependencies_postcss: string;
	export const npm_package_devDependencies__typescript_eslint_eslint_plugin: string;
	export const npm_package_devDependencies_tslib: string;
	export const npm_execpath: string;
	export const PAGER: string;
	export const npm_package_devDependencies_ioredis: string;
	export const npm_package_devDependencies_svelte: string;
	export const npm_package_devDependencies_tsx: string;
	export const npm_package_dependencies_pino: string;
	export const LSCOLORS: string;
	export const npm_package_devDependencies_drizzle_orm: string;
	export const npm_config_frozen_lockfile: string;
	export const npm_package_devDependencies__typescript_eslint_parser: string;
	export const npm_package_devDependencies_nodemailer: string;
	export const npm_package_devDependencies_sveltekit_superforms: string;
	export const npm_package_dependencies_pino_pretty: string;
	export const npm_package_dependencies_tailwind_merge: string;
	export const PATH: string;
	export const npm_package_dependencies__internationalized_date: string;
	export const npm_package_devDependencies__sveltejs_adapter_node: string;
	export const __CFBundleIdentifier: string;
	export const npm_package_devDependencies__hono_zod_validator: string;
	export const npm_package_devDependencies_handlebars: string;
	export const PWD: string;
	export const npm_package_devDependencies_tailwindcss: string;
	export const npm_command: string;
	export const npm_package_scripts_preview: string;
	export const npm_package_devDependencies_lucide_svelte: string;
	export const P9K_SSH: string;
	export const npm_lifecycle_event: string;
	export const P9K_TTY: string;
	export const npm_package_name: string;
	export const npm_package_devDependencies__sveltejs_vite_plugin_svelte: string;
	export const npm_package_dependencies_resend: string;
	export const npm_package_scripts_test_integration: string;
	export const npm_package_dependencies_mode_watcher: string;
	export const NODE_PATH: string;
	export const npm_package_scripts_build: string;
	export const XPC_FLAGS: string;
	export const npm_package_devDependencies_tsyringe: string;
	export const npm_package_devDependencies_vitest: string;
	export const npm_package_dependencies_drizzle_zod: string;
	export const npm_package_devDependencies_arctic: string;
	export const npm_package_scripts_db_migrate: string;
	export const npm_package_devDependencies_eslint_config_prettier: string;
	export const npm_config_node_gyp: string;
	export const XPC_SERVICE_NAME: string;
	export const npm_package_version: string;
	export const npm_package_devDependencies__sveltejs_adapter_auto: string;
	export const npm_package_devDependencies_autoprefixer: string;
	export const npm_package_devDependencies_svelte_check: string;
	export const npm_package_devDependencies_vite_plugin_full_reload: string;
	export const HOME: string;
	export const SHLVL: string;
	export const npm_package_type: string;
	export const npm_package_scripts_test: string;
	export const npm_package_scripts_db_push: string;
	export const HOMEBREW_PREFIX: string;
	export const npm_package_scripts_db_studio: string;
	export const npm_package_devDependencies_bullmq: string;
	export const npm_package_devDependencies_postgres: string;
	export const LESS: string;
	export const LOGNAME: string;
	export const npm_package_scripts_format: string;
	export const npm_package_devDependencies_pg: string;
	export const npm_package_devDependencies_svelte_eslint_parser: string;
	export const ALACRITTY_WINDOW_ID: string;
	export const npm_lifecycle_script: string;
	export const npm_package_devDependencies_dotenv_cli: string;
	export const npm_package_devDependencies_prettier_plugin_tailwindcss: string;
	export const ZED_TERM: string;
	export const BUN_INSTALL: string;
	export const npm_package_dependencies_embla_carousel_svelte: string;
	export const npm_config_user_agent: string;
	export const HOMEBREW_CELLAR: string;
	export const INFOPATH: string;
	export const npm_package_devDependencies__playwright_test: string;
	export const npm_package_devDependencies__types_node: string;
	export const npm_package_devDependencies_oslo: string;
	export const npm_package_dependencies_clsx: string;
	export const _P9K_SSH_TTY: string;
	export const npm_package_devDependencies__types_eslint: string;
	export const npm_package_devDependencies_hono: string;
	export const npm_package_dependencies_cmdk_sv: string;
	export const npm_package_devDependencies__paralleldrive_cuid2: string;
	export const npm_package_scripts_check: string;
	export const COLORTERM: string;
	export const npm_package_scripts_test_unit: string;
	export const npm_package_dependencies_rate_limit_redis: string;
	export const npm_node_execpath: string;
	export const NODE_ENV: string;
}

/**
 * Similar to [`$env/static/private`](https://kit.svelte.dev/docs/modules#$env-static-private), except that it only includes environment variables that begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Values are replaced statically at build time.
 * 
 * ```ts
 * import { PUBLIC_BASE_URL } from '$env/static/public';
 * ```
 */
declare module '$env/static/public' {
	
}

/**
 * This module provides access to runtime environment variables, as defined by the platform you're running on. For example if you're using [`adapter-node`](https://github.com/sveltejs/kit/tree/main/packages/adapter-node) (or running [`vite preview`](https://kit.svelte.dev/docs/cli)), this is equivalent to `process.env`. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://kit.svelte.dev/docs/configuration#env) (if configured).
 * 
 * This module cannot be imported into client-side code.
 * 
 * Dynamic environment variables cannot be used during prerendering.
 * 
 * ```ts
 * import { env } from '$env/dynamic/private';
 * console.log(env.DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 * 
 * > In `dev`, `$env/dynamic` always includes environment variables from `.env`. In `prod`, this behavior will depend on your adapter.
 */
declare module '$env/dynamic/private' {
	export const env: {
		ORIGIN: string;
		DATABASE_URL: string;
		REDIS_URL: string;
		GOOGLE_CLIENT_ID: string;
		GOOGLE_CLIENT_SECRET: string;
		npm_package_devDependencies__tailwindcss_typography: string;
		npm_package_devDependencies_vite_plugin_restart: string;
		npm_package_devDependencies_prettier: string;
		npm_package_dependencies_bits_ui: string;
		TERM_PROGRAM: string;
		npm_package_devDependencies_eslint_plugin_svelte: string;
		NODE: string;
		_P9K_TTY: string;
		npm_package_devDependencies_prettier_plugin_svelte: string;
		npm_package_devDependencies_typescript: string;
		npm_package_dependencies_vaul_svelte: string;
		INIT_CWD: string;
		SHELL: string;
		TERM: string;
		npm_package_scripts_db_generate: string;
		npm_package_devDependencies_vite: string;
		HOMEBREW_REPOSITORY: string;
		TMPDIR: string;
		npm_package_dependencies_svelte_sonner: string;
		npm_package_scripts_lint: string;
		TERM_PROGRAM_VERSION: string;
		npm_package_dependencies_tailwind_variants: string;
		WINDOWID: string;
		npm_package_scripts_dev: string;
		npm_package_devDependencies__lucia_auth_adapter_drizzle: string;
		npm_package_devDependencies_drizzle_kit: string;
		npm_package_dependencies_paneforge: string;
		npm_package_dependencies_hono_rate_limiter: string;
		npm_package_private: string;
		npm_package_devDependencies__sveltejs_kit: string;
		npm_config_registry: string;
		LC_ALL: string;
		ZSH: string;
		npm_package_dependencies_formsnap: string;
		npm_package_scripts_initialize: string;
		USER: string;
		npm_package_devDependencies__types_nodemailer: string;
		LS_COLORS: string;
		npm_package_scripts_check_watch: string;
		COMMAND_MODE: string;
		npm_package_devDependencies_zod: string;
		PNPM_SCRIPT_SRC_DIR: string;
		npm_package_devDependencies_reflect_metadata: string;
		SSH_AUTH_SOCK: string;
		npm_package_devDependencies_lucia: string;
		npm_package_dependencies__node_rs_argon2: string;
		__CF_USER_TEXT_ENCODING: string;
		npm_package_devDependencies_dayjs: string;
		npm_package_devDependencies_eslint: string;
		npm_package_devDependencies_postcss: string;
		npm_package_devDependencies__typescript_eslint_eslint_plugin: string;
		npm_package_devDependencies_tslib: string;
		npm_execpath: string;
		PAGER: string;
		npm_package_devDependencies_ioredis: string;
		npm_package_devDependencies_svelte: string;
		npm_package_devDependencies_tsx: string;
		npm_package_dependencies_pino: string;
		LSCOLORS: string;
		npm_package_devDependencies_drizzle_orm: string;
		npm_config_frozen_lockfile: string;
		npm_package_devDependencies__typescript_eslint_parser: string;
		npm_package_devDependencies_nodemailer: string;
		npm_package_devDependencies_sveltekit_superforms: string;
		npm_package_dependencies_pino_pretty: string;
		npm_package_dependencies_tailwind_merge: string;
		PATH: string;
		npm_package_dependencies__internationalized_date: string;
		npm_package_devDependencies__sveltejs_adapter_node: string;
		__CFBundleIdentifier: string;
		npm_package_devDependencies__hono_zod_validator: string;
		npm_package_devDependencies_handlebars: string;
		PWD: string;
		npm_package_devDependencies_tailwindcss: string;
		npm_command: string;
		npm_package_scripts_preview: string;
		npm_package_devDependencies_lucide_svelte: string;
		P9K_SSH: string;
		npm_lifecycle_event: string;
		P9K_TTY: string;
		npm_package_name: string;
		npm_package_devDependencies__sveltejs_vite_plugin_svelte: string;
		npm_package_dependencies_resend: string;
		npm_package_scripts_test_integration: string;
		npm_package_dependencies_mode_watcher: string;
		NODE_PATH: string;
		npm_package_scripts_build: string;
		XPC_FLAGS: string;
		npm_package_devDependencies_tsyringe: string;
		npm_package_devDependencies_vitest: string;
		npm_package_dependencies_drizzle_zod: string;
		npm_package_devDependencies_arctic: string;
		npm_package_scripts_db_migrate: string;
		npm_package_devDependencies_eslint_config_prettier: string;
		npm_config_node_gyp: string;
		XPC_SERVICE_NAME: string;
		npm_package_version: string;
		npm_package_devDependencies__sveltejs_adapter_auto: string;
		npm_package_devDependencies_autoprefixer: string;
		npm_package_devDependencies_svelte_check: string;
		npm_package_devDependencies_vite_plugin_full_reload: string;
		HOME: string;
		SHLVL: string;
		npm_package_type: string;
		npm_package_scripts_test: string;
		npm_package_scripts_db_push: string;
		HOMEBREW_PREFIX: string;
		npm_package_scripts_db_studio: string;
		npm_package_devDependencies_bullmq: string;
		npm_package_devDependencies_postgres: string;
		LESS: string;
		LOGNAME: string;
		npm_package_scripts_format: string;
		npm_package_devDependencies_pg: string;
		npm_package_devDependencies_svelte_eslint_parser: string;
		ALACRITTY_WINDOW_ID: string;
		npm_lifecycle_script: string;
		npm_package_devDependencies_dotenv_cli: string;
		npm_package_devDependencies_prettier_plugin_tailwindcss: string;
		ZED_TERM: string;
		BUN_INSTALL: string;
		npm_package_dependencies_embla_carousel_svelte: string;
		npm_config_user_agent: string;
		HOMEBREW_CELLAR: string;
		INFOPATH: string;
		npm_package_devDependencies__playwright_test: string;
		npm_package_devDependencies__types_node: string;
		npm_package_devDependencies_oslo: string;
		npm_package_dependencies_clsx: string;
		_P9K_SSH_TTY: string;
		npm_package_devDependencies__types_eslint: string;
		npm_package_devDependencies_hono: string;
		npm_package_dependencies_cmdk_sv: string;
		npm_package_devDependencies__paralleldrive_cuid2: string;
		npm_package_scripts_check: string;
		COLORTERM: string;
		npm_package_scripts_test_unit: string;
		npm_package_dependencies_rate_limit_redis: string;
		npm_node_execpath: string;
		NODE_ENV: string;
		[key: `PUBLIC_${string}`]: undefined;
		[key: `${string}`]: string | undefined;
	}
}

/**
 * Similar to [`$env/dynamic/private`](https://kit.svelte.dev/docs/modules#$env-dynamic-private), but only includes variables that begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Note that public dynamic environment variables must all be sent from the server to the client, causing larger network requests — when possible, use `$env/static/public` instead.
 * 
 * Dynamic environment variables cannot be used during prerendering.
 * 
 * ```ts
 * import { env } from '$env/dynamic/public';
 * console.log(env.PUBLIC_DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 */
declare module '$env/dynamic/public' {
	export const env: {
		[key: `PUBLIC_${string}`]: string | undefined;
	}
}
