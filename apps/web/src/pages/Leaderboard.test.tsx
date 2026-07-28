import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const hooks = vi.hoisted(() => ({
	useAuth: vi.fn(),
	useRunLeaderboard: vi.fn(),
	useGhostLeaderboard: vi.fn(),
}));

vi.mock("../features/auth", () => ({ useAuth: hooks.useAuth }));
vi.mock("../features/leaderboards/hooks/useRunLeaderboard", () => ({
	useRunLeaderboard: hooks.useRunLeaderboard,
}));
vi.mock("../features/leaderboards/hooks/useGhostLeaderboard", () => ({
	useGhostLeaderboard: hooks.useGhostLeaderboard,
}));
vi.mock("../features/heroDossier", () => ({
	HeroDossierModal: () => null,
}));
vi.mock("../components/Layout", () => ({
	Layout: ({ children }: { children: React.ReactNode }) => children,
}));
vi.mock("../components/Header", () => ({ Header: () => null }));
vi.mock("../components/Card", () => ({
	Card: ({ children }: { children: React.ReactNode }) => children,
}));
vi.mock("../components/Tabs", () => ({
	Tabs: ({
		value,
		onChange,
		renderPanel,
	}: {
		value: string;
		onChange: (value: "heroes" | "ghosts") => void;
		renderPanel: (value: "heroes" | "ghosts") => React.ReactNode;
	}) => (
		<div>
			<button onClick={() => onChange("heroes")}>Heroes tab</button>
			<button onClick={() => onChange("ghosts")}>Ghosts tab</button>
			{renderPanel(value as "heroes" | "ghosts")}
		</div>
	),
}));
vi.mock("../features/leaderboards/components/LeaderboardFilters", () => ({
	LeaderboardFilters: ({ entryType }: { entryType: string }) => <div>{entryType} filters</div>,
}));
vi.mock("../features/leaderboards/components/LeaderboardTables", () => ({
	RunLeaderboardTable: () => <div>Hero table</div>,
	GhostLeaderboardTable: () => <div>Ghost table</div>,
}));
vi.mock("../components/TablePagination", () => ({
	TablePagination: ({ page, total }: { page: number; total: number }) => (
		<div>
			Page {page}, total {total}
		</div>
	),
}));

import Leaderboard from "./Leaderboard";

function queryState(overrides = {}) {
	return {
		data: { entries: [], total: 0, totalPages: 0 },
		isPending: false,
		isError: false,
		isFetching: false,
		refetch: vi.fn(),
		...overrides,
	};
}

describe("Leaderboard", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		hooks.useAuth.mockReturnValue({ hasSession: true });
		hooks.useRunLeaderboard.mockReturnValue(queryState());
		hooks.useGhostLeaderboard.mockReturnValue(queryState());
	});

	it("loads hero rankings by default with the expected query", () => {
		hooks.useRunLeaderboard.mockReturnValue(queryState({ isPending: true, data: undefined }));

		render(<Leaderboard />);

		expect(screen.getByText("Loading hero rankings...")).toBeInTheDocument();
		expect(hooks.useRunLeaderboard).toHaveBeenCalledWith(
			expect.objectContaining({ scope: "overall", page: 1, limit: 20 }),
			true,
		);
		expect(hooks.useGhostLeaderboard).toHaveBeenCalledWith(
			expect.objectContaining({ page: 1, limit: 20 }),
			false,
		);
	});

	it("renders hero empty, table, and pagination states", () => {
		const { rerender } = render(<Leaderboard />);
		expect(screen.getByText("No heroes match these filters.")).toBeInTheDocument();

		hooks.useRunLeaderboard.mockReturnValue(
			queryState({ data: { entries: [{}], total: 21, totalPages: 2 } }),
		);
		rerender(<Leaderboard />);
		expect(screen.getByText("Hero table")).toBeInTheDocument();
		expect(screen.getByText("Page 1, total 21")).toBeInTheDocument();
	});

	it("retries failed hero rankings", () => {
		const refetch = vi.fn();
		hooks.useRunLeaderboard.mockReturnValue(queryState({ isError: true, refetch }));
		render(<Leaderboard />);

		fireEvent.click(screen.getByRole("button", { name: "RETRY" }));

		expect(refetch).toHaveBeenCalledOnce();
	});

	it("switches to and enables ghost rankings", () => {
		hooks.useGhostLeaderboard.mockReturnValue(
			queryState({ data: { entries: [{}], total: 1, totalPages: 1 } }),
		);
		render(<Leaderboard />);

		fireEvent.click(screen.getByRole("button", { name: "Ghosts tab" }));

		expect(screen.getByText("Ghost table")).toBeInTheDocument();
		expect(hooks.useGhostLeaderboard).toHaveBeenLastCalledWith(
			expect.objectContaining({ page: 1, limit: 20 }),
			true,
		);
	});

	it("announces background leaderboard updates", () => {
		hooks.useRunLeaderboard.mockReturnValue(queryState({ isFetching: true }));

		render(<Leaderboard />);

		expect(screen.getByText("Updating leaderboard...")).toHaveAttribute("aria-live", "polite");
	});
});
