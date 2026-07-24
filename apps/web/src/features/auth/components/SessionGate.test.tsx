import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const useCurrentUser = vi.hoisted(() => vi.fn());

vi.mock("../hooks/useCurrentUser", () => ({ useCurrentUser }));

import { SessionGate } from "./SessionGate";

describe("SessionGate", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("shows a loader while the session is loading", () => {
		useCurrentUser.mockReturnValue({ isPending: true, isError: false });

		render(<SessionGate>Application</SessionGate>);

		expect(screen.getByText("Loading...")).toBeInTheDocument();
		expect(screen.queryByText("Application")).not.toBeInTheDocument();
	});

	it("shows a stable error when the session cannot load", () => {
		useCurrentUser.mockReturnValue({ isPending: false, isError: true });

		render(<SessionGate>Application</SessionGate>);

		expect(screen.getByText("Unable to load session.")).toBeInTheDocument();
	});

	it("renders the application after session resolution", () => {
		useCurrentUser.mockReturnValue({ isPending: false, isError: false });

		render(<SessionGate>Application</SessionGate>);

		expect(screen.getByText("Application")).toBeInTheDocument();
	});
});
