import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const state = vi.hoisted(() => ({ mutate: vi.fn(), isPending: false, isError: false }));
vi.mock("../hooks/useLogin", () => ({ useLogin: () => state }));

import { SignIn } from "./SignIn";

describe("SignIn", () => {
	beforeEach(() => {
		state.mutate.mockReset();
		state.isError = false;
	});

	it("submits the account credentials", () => {
		render(<SignIn />);
		fireEvent.change(screen.getByLabelText("Email"), {
			target: { value: "admin@example.com" },
		});
		fireEvent.change(screen.getByLabelText("Password"), {
			target: { value: "secure-password" },
		});
		fireEvent.click(screen.getByRole("button", { name: "Sign in" }));

		expect(state.mutate).toHaveBeenCalledWith({
			email: "admin@example.com",
			password: "secure-password",
		});
	});

	it("shows a generic authentication failure", () => {
		state.isError = true;
		render(<SignIn />);

		expect(screen.getByText("Unable to sign in with those credentials.")).toBeInTheDocument();
	});
});
