export const HOLDING_PAGE_BYPASS_PARAM = "holding_bypass";
export const HOLDING_PAGE_STORAGE_KEY = "browser-heroes:holding-page-bypass";

export function canAccessGame(): boolean {
	if (import.meta.env.VITE_HOLDING_PAGE_ENABLED !== "true") {
		return true;
	}

	const bypassKey = import.meta.env.VITE_HOLDING_PAGE_BYPASS_KEY ?? "";
	if (!bypassKey) {
		return false;
	}

	const url = new URL(window.location.href);
	const suppliedKey = url.searchParams.get(HOLDING_PAGE_BYPASS_PARAM);

	if (suppliedKey === bypassKey) {
		try {
			window.localStorage.setItem(HOLDING_PAGE_STORAGE_KEY, bypassKey);
		} catch {
			// Storage can be unavailable in privacy-restricted browsers. The URL still grants access.
		}

		url.searchParams.delete(HOLDING_PAGE_BYPASS_PARAM);
		try {
			window.history.replaceState(
				window.history.state,
				"",
				`${url.pathname}${url.search}${url.hash}`,
			);
		} catch {
			// URL cleanup is cosmetic and should not prevent a valid bypass.
		}

		return true;
	}

	try {
		return window.localStorage.getItem(HOLDING_PAGE_STORAGE_KEY) === bypassKey;
	} catch {
		return false;
	}
}
