import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const logout = vi.hoisted(() => ({ mutate: vi.fn(), isPending: false }));
vi.mock("../hooks/useLogout", () => ({ useLogout: () => logout }));

import { Unauthorized } from "./Unauthorized";

describe("Unauthorized", () => {
	beforeEach(() => logout.mutate.mockReset());

	it("explains the denial and supports signing out", () => {
		render(<Unauthorized />);
		expect(screen.getByRole("heading", { name: "Not authorized" })).toBeInTheDocument();

		fireEvent.click(screen.getByRole("button", { name: "Sign out" }));
		expect(logout.mutate).toHaveBeenCalledOnce();
	});
});
