import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";

const auth = vi.hoisted(() => ({
	useAuth: vi.fn(),
}));

let desktopBreakpointListener: ((event: MediaQueryListEvent) => void) | undefined;

vi.mock("../features/auth", async (importOriginal) => ({
	...(await importOriginal<typeof import("../features/auth")>()),
	useAuth: auth.useAuth,
}));

import { Header } from "./Header";
import { useAuthModalStore } from "../features/auth";

function renderHeader() {
	return render(
		<QueryClientProvider client={new QueryClient()}>
			<MemoryRouter>
				<Header />
			</MemoryRouter>
		</QueryClientProvider>,
	);
}

describe("Header", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		useAuthModalStore.getState().close();
		desktopBreakpointListener = undefined;
		window.matchMedia = vi.fn().mockReturnValue({
			matches: false,
			media: "(min-width: 48rem)",
			onchange: null,
			addEventListener: vi.fn(
				(_event: string, listener: (event: MediaQueryListEvent) => void) => {
					desktopBreakpointListener = listener;
				},
			),
			removeEventListener: vi.fn(),
			addListener: vi.fn(),
			removeListener: vi.fn(),
			dispatchEvent: vi.fn(),
		});
	});

	it("shows sign in and requests the global login modal for unregistered users", () => {
		auth.useAuth.mockReturnValue({ isRegistered: false });

		renderHeader();

		expect(screen.getByRole("link", { name: "CONTACT" })).toHaveAttribute("href", "/contact");
		expect(screen.queryByRole("link", { name: "ACCOUNT" })).not.toBeInTheDocument();
		fireEvent.click(screen.getByRole("button", { name: "SIGN IN" }));
		expect(useAuthModalStore.getState().modal).toBe("login");
	});

	it("shows account instead of sign in for registered users", () => {
		auth.useAuth.mockReturnValue({ isRegistered: true });

		renderHeader();

		expect(screen.getByRole("link", { name: "ACCOUNT" })).toHaveAttribute("href", "/account");
		expect(screen.queryByRole("button", { name: "SIGN IN" })).not.toBeInTheDocument();
	});

	it("opens a mobile menu with the site navigation and closes after navigation", () => {
		auth.useAuth.mockReturnValue({ isRegistered: false });

		renderHeader();

		fireEvent.click(screen.getByRole("button", { name: "MENU" }));

		const mobileNavigation = screen.getByRole("navigation", { name: "Mobile navigation" });
		expect(screen.getByRole("dialog", { name: "BROWSER HEROES" })).toBeInTheDocument();
		expect(within(mobileNavigation).getByRole("link", { name: "HOME" })).toHaveAttribute(
			"href",
			"/",
		);
		expect(
			within(mobileNavigation).getByRole("link", { name: "DAILY CHALLENGE" }),
		).toHaveAttribute("href", "/daily-challenge");
		expect(
			within(mobileNavigation).getByRole("link", { name: "HALL OF FAME" }),
		).toHaveAttribute("href", "/hall-of-fame");
		expect(within(mobileNavigation).getByRole("link", { name: "HISTORY" })).toHaveAttribute(
			"href",
			"/history",
		);
		expect(within(mobileNavigation).getByRole("link", { name: "CONTACT" })).toHaveAttribute(
			"href",
			"/contact",
		);

		fireEvent.click(within(mobileNavigation).getByRole("link", { name: "CONTACT" }));
		expect(
			screen.queryByRole("navigation", { name: "Mobile navigation" }),
		).not.toBeInTheDocument();
	});

	it("closes the mobile menu before opening sign in", () => {
		auth.useAuth.mockReturnValue({ isRegistered: false });

		renderHeader();
		fireEvent.click(screen.getByRole("button", { name: "MENU" }));

		const mobileNavigation = screen.getByRole("navigation", { name: "Mobile navigation" });
		fireEvent.click(within(mobileNavigation).getByRole("button", { name: "SIGN IN" }));

		expect(
			screen.queryByRole("navigation", { name: "Mobile navigation" }),
		).not.toBeInTheDocument();
		expect(useAuthModalStore.getState().modal).toBe("login");
	});

	it("shows account in the registered mobile menu", () => {
		auth.useAuth.mockReturnValue({ isRegistered: true });

		renderHeader();
		fireEvent.click(screen.getByRole("button", { name: "MENU" }));

		const mobileNavigation = screen.getByRole("navigation", { name: "Mobile navigation" });
		expect(within(mobileNavigation).getByRole("link", { name: "ACCOUNT" })).toHaveAttribute(
			"href",
			"/account",
		);
		expect(
			within(mobileNavigation).queryByRole("button", { name: "SIGN IN" }),
		).not.toBeInTheDocument();
	});

	it("dismisses the mobile menu with the close button and Escape", () => {
		auth.useAuth.mockReturnValue({ isRegistered: false });

		renderHeader();
		fireEvent.click(screen.getByRole("button", { name: "MENU" }));
		fireEvent.click(screen.getByRole("button", { name: "Close menu" }));
		expect(
			screen.queryByRole("navigation", { name: "Mobile navigation" }),
		).not.toBeInTheDocument();

		fireEvent.click(screen.getByRole("button", { name: "MENU" }));
		fireEvent.keyDown(document, { key: "Escape" });
		expect(
			screen.queryByRole("navigation", { name: "Mobile navigation" }),
		).not.toBeInTheDocument();
	});

	it("closes an open mobile menu when the viewport reaches the desktop breakpoint", () => {
		auth.useAuth.mockReturnValue({ isRegistered: false });

		renderHeader();
		fireEvent.click(screen.getByRole("button", { name: "MENU" }));
		expect(screen.getByRole("navigation", { name: "Mobile navigation" })).toBeInTheDocument();

		act(() => {
			desktopBreakpointListener?.({ matches: true } as MediaQueryListEvent);
		});

		expect(
			screen.queryByRole("navigation", { name: "Mobile navigation" }),
		).not.toBeInTheDocument();
	});
});
