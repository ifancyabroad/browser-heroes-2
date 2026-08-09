/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_HOLDING_PAGE_ENABLED?: string;
	readonly VITE_HOLDING_PAGE_BYPASS_KEY?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
