import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const hooks = vi.hoisted(() => ({
	useAuth: vi.fn(),
	useGhostHistory: vi.fn(),
}));

vi.mock("../features/auth", () => ({ useAuth: hooks.useAuth }));
vi.mock("../features/history/hooks/useGhostHistory", () => ({
	useGhostHistory: hooks.useGhostHistory,
}));
vi.mock("../features/heroDossier", () => ({ HeroDossierModal: () => null }));
vi.mock("../components/PageLayout", () => ({
	PageLayout: ({ children }: { children: React.ReactNode }) => children,
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
			<button onClick={() => onChange("ghosts")}>Ghosts tab</button>
			{renderPanel(value as "heroes" | "ghosts")}
		</div>
	),
}));
vi.mock("../features/history/components/HistoryPanels", async (importOriginal) => ({
	...(await importOriginal<typeof import("../features/history/components/HistoryPanels")>()),
	HeroHistoryPanel: (props: { hasSession: boolean }) => (
		<div>Hero panel {String(props.hasSession)}</div>
	),
}));

import History from "./History";

describe("History", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		hooks.useAuth.mockReturnValue({ hasSession: true });
		hooks.useGhostHistory.mockReturnValue({
			data: { entries: [], total: 40, totalPages: 2 },
			isPending: false,
			isError: false,
			isFetching: false,
		});
	});

	it("renders personal history for signed-in users", () => {
		render(<History />);

		expect(screen.getByRole("heading", { name: "HISTORY" })).toBeInTheDocument();
		expect(screen.getByText("Hero panel true")).toBeInTheDocument();
	});

	it("passes the missing-session state to history panels", () => {
		hooks.useAuth.mockReturnValue({ hasSession: false });

		render(<History />);

		expect(screen.getByText("Hero panel false")).toBeInTheDocument();
	});

	it("filters active ghosts and resets pagination while preserving class", () => {
		render(<History />);
		fireEvent.click(screen.getByRole("button", { name: "Ghosts tab" }));
		expect(screen.getByRole("button", { name: "ALL" })).toHaveAttribute("aria-pressed", "true");
		fireEvent.change(screen.getByLabelText("CLASS"), { target: { value: "mage" } });
		fireEvent.click(screen.getByRole("button", { name: "Next page" }));
		expect(hooks.useGhostHistory).toHaveBeenLastCalledWith(
			{ classId: "mage", page: 2, limit: 20, sort: "updatedAt", direction: "desc" },
			true,
		);
		fireEvent.click(screen.getByRole("button", { name: "ACTIVE" }));
		expect(hooks.useGhostHistory).toHaveBeenLastCalledWith(
			{
				status: "active",
				classId: "mage",
				page: 1,
				limit: 20,
				sort: "updatedAt",
				direction: "desc",
			},
			true,
		);
		expect(screen.getByRole("button", { name: "ACTIVE" })).toHaveAttribute(
			"aria-pressed",
			"true",
		);
		fireEvent.click(screen.getByRole("button", { name: "ALL" }));
		expect(hooks.useGhostHistory).toHaveBeenLastCalledWith(
			{ classId: "mage", page: 1, limit: 20, sort: "updatedAt", direction: "desc" },
			true,
		);
	});

	it("switches between hero and ghost panels", () => {
		render(<History />);

		fireEvent.click(screen.getByRole("button", { name: "Ghosts tab" }));

		expect(screen.getByText("No ghosts yet.")).toBeInTheDocument();
	});
});
