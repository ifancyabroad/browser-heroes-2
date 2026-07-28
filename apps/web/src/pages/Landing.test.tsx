import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";

const hooks = vi.hoisted(() => ({
	useAuth: vi.fn(),
	useCurrentRun: vi.fn(),
}));

vi.mock("../features/auth", async (importOriginal) => ({
	...(await importOriginal<typeof import("../features/auth")>()),
	useAuth: hooks.useAuth,
}));
vi.mock("../features/runs", () => ({
	useCurrentRun: hooks.useCurrentRun,
}));

import Landing from "./Landing";
import { useAuthModalStore } from "../features/auth";

function renderLanding() {
	return render(
		<QueryClientProvider client={new QueryClient()}>
			<MemoryRouter>
				<Landing />
			</MemoryRouter>
		</QueryClientProvider>,
	);
}

describe("Landing", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		useAuthModalStore.getState().close();
		hooks.useCurrentRun.mockReturnValue({
			data: { run: null },
			isLoading: false,
		});
	});

	it("welcomes registered users without offering registration", () => {
		hooks.useAuth.mockReturnValue({
			user: { displayName: "Player" },
			hasSession: true,
			isRegistered: true,
		});

		renderLanding();

		expect(screen.getByText("Welcome back, Player.")).toBeInTheDocument();
		expect(screen.queryByRole("button", { name: "CREATE ACCOUNT" })).not.toBeInTheDocument();
	});

	it("offers account creation to guests", () => {
		hooks.useAuth.mockReturnValue({
			user: { displayName: null },
			hasSession: true,
			isRegistered: false,
		});

		renderLanding();

		expect(
			screen.getByText("Keep your heroes across browsers and devices."),
		).toBeInTheDocument();
		fireEvent.click(screen.getByRole("button", { name: "CREATE ACCOUNT" }));
		expect(useAuthModalStore.getState().modal).toBe("register");
	});
});
