import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";

const auth = vi.hoisted(() => ({
	useAuth: vi.fn(),
	useLogin: vi.fn(() => ({ mutate: vi.fn(), reset: vi.fn(), isPending: false })),
	useLogout: vi.fn(() => ({ mutate: vi.fn(), isPending: false })),
	useRegisterAccount: vi.fn(() => ({ mutate: vi.fn(), isPending: false })),
}));

vi.mock("../features/auth", () => auth);

import Account from "./Account";

function renderAccount() {
	return render(
		<QueryClientProvider client={new QueryClient()}>
			<MemoryRouter>
				<Account />
			</MemoryRouter>
		</QueryClientProvider>,
	);
}

describe("Account", () => {
	beforeEach(() => vi.clearAllMocks());

	it("shows account details to a registered player", () => {
		auth.useAuth.mockReturnValue({
			user: {
				id: "registered",
				type: "registered",
				displayName: "Player",
				email: "player@example.com",
			},
		});
		renderAccount();
		expect(screen.getByText("Player")).toBeInTheDocument();
		expect(screen.getByText("player@example.com")).toBeInTheDocument();
		expect(screen.getByRole("button", { name: "SIGN OUT" })).toBeInTheDocument();
	});
});
