import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const hooks = vi.hoisted(() => ({
	useAuth: vi.fn(),
}));

vi.mock("../features/auth", () => ({ useAuth: hooks.useAuth }));
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
vi.mock("../features/history/components/HistoryPanels", () => ({
	HeroHistoryPanel: (props: { hasSession: boolean }) => (
		<div>Hero panel {String(props.hasSession)}</div>
	),
	GhostHistoryPanel: (props: { hasSession: boolean }) => (
		<div>Ghost panel {String(props.hasSession)}</div>
	),
}));

import History from "./History";

describe("History", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		hooks.useAuth.mockReturnValue({ hasSession: true });
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

	it("switches between hero and ghost panels", () => {
		render(<History />);

		fireEvent.click(screen.getByRole("button", { name: "Ghosts tab" }));

		expect(screen.getByText("Ghost panel true")).toBeInTheDocument();
	});
});
