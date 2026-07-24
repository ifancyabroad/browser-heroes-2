import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const hooks = vi.hoisted(() => ({
	useCurrentUser: vi.fn(),
	useStatsSummary: vi.fn(),
}));

vi.mock("../features/auth", () => ({ useCurrentUser: hooks.useCurrentUser }));
vi.mock("../features/stats/hooks/useStatsSummary", () => ({
	useStatsSummary: hooks.useStatsSummary,
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
			<button onClick={() => onChange("ghosts")}>Ghosts tab</button>
			{renderPanel(value as "heroes" | "ghosts")}
		</div>
	),
}));
vi.mock("../features/stats/components/StatsPanels", () => ({
	HeroStatsPanel: (props: { hasSession: boolean; summaryPending: boolean }) => (
		<div>
			Hero panel {String(props.hasSession)} {String(props.summaryPending)}
		</div>
	),
	GhostStatsPanel: (props: { hasSession: boolean; summaryError: boolean }) => (
		<div>
			Ghost panel {String(props.hasSession)} {String(props.summaryError)}
		</div>
	),
}));

import Stats from "./Stats";

describe("Stats", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		hooks.useCurrentUser.mockReturnValue({ data: { user: { id: "user-id" } } });
		hooks.useStatsSummary.mockReturnValue({
			data: undefined,
			isPending: true,
			isError: false,
			refetch: vi.fn(),
		});
	});

	it("enables summary loading only for signed-in users", () => {
		render(<Stats />);

		expect(hooks.useStatsSummary).toHaveBeenCalledWith(true);
		expect(screen.getByText("Hero panel true true")).toBeInTheDocument();
	});

	it("uses the empty summary path without a session", () => {
		hooks.useCurrentUser.mockReturnValue({ data: { user: null } });

		render(<Stats />);

		expect(hooks.useStatsSummary).toHaveBeenCalledWith(false);
		expect(screen.getByText("Hero panel false true")).toBeInTheDocument();
	});

	it("switches between hero and ghost panels", () => {
		hooks.useStatsSummary.mockReturnValue({
			data: undefined,
			isPending: false,
			isError: true,
			refetch: vi.fn(),
		});
		render(<Stats />);

		fireEvent.click(screen.getByRole("button", { name: "Ghosts tab" }));

		expect(screen.getByText("Ghost panel true true")).toBeInTheDocument();
	});
});
