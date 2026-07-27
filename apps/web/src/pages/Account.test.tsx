import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";

const auth = vi.hoisted(() => ({
	useCurrentUser: vi.fn(),
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

	it("offers registration and login to a guest", () => {
		auth.useCurrentUser.mockReturnValue({
			data: {
				user: {
					id: "guest",
					type: "guest",
					displayName: null,
					email: null,
				},
			},
		});
		renderAccount();
		expect(screen.getByRole("heading", { name: "ACCOUNT" })).toBeInTheDocument();
		expect(screen.getByRole("button", { name: "CREATE ACCOUNT" })).toBeInTheDocument();
		expect(screen.getByRole("button", { name: "SIGN IN" })).toBeInTheDocument();

		fireEvent.click(screen.getByRole("button", { name: "CREATE ACCOUNT" }));
		expect(screen.getByRole("dialog")).toHaveTextContent("CREATE ACCOUNT");
	});

	it("shows account details to a registered player", () => {
		auth.useCurrentUser.mockReturnValue({
			data: {
				user: {
					id: "registered",
					type: "registered",
					displayName: "Player",
					email: "player@example.com",
				},
			},
		});
		renderAccount();
		expect(screen.getByText("Player")).toBeInTheDocument();
		expect(screen.getByText("player@example.com")).toBeInTheDocument();
		expect(screen.getByRole("button", { name: "SIGN OUT" })).toBeInTheDocument();
	});
});
