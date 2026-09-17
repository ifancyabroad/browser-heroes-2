import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";

const auth = vi.hoisted(() => ({ useAuth: vi.fn() }));

vi.mock("../features/auth", async (importOriginal) => ({
	...(await importOriginal<typeof import("../features/auth")>()),
	useAuth: auth.useAuth,
}));

import { useAuthModalStore } from "../features/auth";
import { Header } from "./Header";

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
	});

	it("shows sign in and requests the global login modal for unregistered users", () => {
		auth.useAuth.mockReturnValue({ isRegistered: false });

		renderHeader();

		expect(screen.getByRole("link", { name: "CONTACT" })).toHaveAttribute("href", "/contact");
		expect(screen.queryByRole("link", { name: "ACCOUNT" })).not.toBeInTheDocument();
		fireEvent.click(screen.getByRole("button", { name: "SIGN IN" }));
		expect(useAuthModalStore.getState().modal).toBe("login");
	});

	it("shows a mobile logo that links to the home page", () => {
		auth.useAuth.mockReturnValue({ isRegistered: false });

		renderHeader();

		expect(screen.getByRole("link", { name: "Browser Heroes home" })).toHaveAttribute(
			"href",
			"/",
		);
	});

	it("shows account instead of sign in for registered users", () => {
		auth.useAuth.mockReturnValue({ isRegistered: true });

		renderHeader();

		expect(screen.getByRole("link", { name: "ACCOUNT" })).toHaveAttribute("href", "/account");
		expect(screen.queryByRole("button", { name: "SIGN IN" })).not.toBeInTheDocument();
	});

	it("includes the main links, Journal dropdown, and mobile menu", () => {
		auth.useAuth.mockReturnValue({ isRegistered: false });
		renderHeader();
		for (const [name, path] of [
			["HOME", "/"],
			["DAILY CHALLENGE", "/daily-challenge"],
			["HALL OF FAME", "/hall-of-fame"],
		]) {
			expect(screen.getByRole("link", { name })).toHaveAttribute("href", path);
		}
		expect(screen.getByRole("button", { name: "JOURNAL" })).toBeInTheDocument();
		fireEvent.click(screen.getByRole("button", { name: "MENU" }));
		expect(screen.getByRole("navigation", { name: "Mobile navigation" })).toBeInTheDocument();
	});
});
