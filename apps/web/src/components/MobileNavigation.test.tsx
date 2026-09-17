import { fireEvent, render, screen, within, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";

const auth = vi.hoisted(() => ({ useAuth: vi.fn() }));

vi.mock("../features/auth", async (importOriginal) => ({
	...(await importOriginal<typeof import("../features/auth")>()),
	useAuth: auth.useAuth,
}));

import { useAuthModalStore } from "../features/auth";
import { MobileNavigation } from "./MobileNavigation";

function renderMobileNavigation() {
	return render(
		<MemoryRouter>
			<MobileNavigation />
		</MemoryRouter>,
	);
}

describe("MobileNavigation", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		useAuthModalStore.getState().close();
	});

	it("opens a mobile menu with the site navigation and closes after navigation", () => {
		auth.useAuth.mockReturnValue({ isRegistered: false });

		renderMobileNavigation();

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
		expect(
			within(mobileNavigation).queryByRole("button", { name: "JOURNAL" }),
		).not.toBeInTheDocument();
		expect(within(mobileNavigation).getByRole("link", { name: "HISTORY" })).toHaveAttribute(
			"href",
			"/history",
		);
		expect(within(mobileNavigation).getByRole("link", { name: "CONTACT" })).toHaveAttribute(
			"href",
			"/contact",
		);

		fireEvent.click(within(mobileNavigation).getByRole("link", { name: "HISTORY" }));
		expect(
			screen.queryByRole("navigation", { name: "Mobile navigation" }),
		).not.toBeInTheDocument();
	});

	it("closes the mobile menu before opening sign in", () => {
		auth.useAuth.mockReturnValue({ isRegistered: false });

		renderMobileNavigation();
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

		renderMobileNavigation();
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

		renderMobileNavigation();
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
		const changes = new EventTarget();
		const media = window.matchMedia("(min-width: 48rem)");
		vi.mocked(window.matchMedia).mockReturnValue({
			...media,
			addEventListener: changes.addEventListener.bind(changes),
			removeEventListener: changes.removeEventListener.bind(changes),
		});
		auth.useAuth.mockReturnValue({ isRegistered: false });

		renderMobileNavigation();
		fireEvent.click(screen.getByRole("button", { name: "MENU" }));
		expect(screen.getByRole("navigation", { name: "Mobile navigation" })).toBeInTheDocument();

		act(() => {
			changes.dispatchEvent(Object.assign(new Event("change"), { matches: true }));
		});

		expect(
			screen.queryByRole("navigation", { name: "Mobile navigation" }),
		).not.toBeInTheDocument();
	});
});
