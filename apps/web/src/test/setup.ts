import "@testing-library/jest-dom/vitest";
import { beforeEach, vi } from "vitest";

// jsdom does not implement media queries. Breakpoint tests can override this default.
beforeEach(() => {
	Object.defineProperty(window, "matchMedia", {
		configurable: true,
		writable: true,
		value: vi.fn().mockImplementation((query: string) => ({
			matches: false,
			media: query,
			onchange: null,
			addEventListener: vi.fn(),
			removeEventListener: vi.fn(),
			addListener: vi.fn(),
			removeListener: vi.fn(),
			dispatchEvent: vi.fn().mockReturnValue(false),
		})),
	});
});
