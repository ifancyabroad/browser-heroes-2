import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import type { RunView } from "@app/shared";
import { beforeEach, describe, expect, it, vi } from "vitest";

const selectRunSummaryView = vi.hoisted(() => vi.fn());

vi.mock("@app/engine", async (importOriginal) => ({
	...(await importOriginal<typeof import("@app/engine")>()),
	selectRunSummaryView,
}));
vi.mock("../../../components/GameLayout", () => ({
	GameLayout: ({ children }: { children: React.ReactNode }) => children,
}));

import { VictoryScreen } from "./VictoryScreen";

const run = { state: {} } as RunView;
const summary = {
	status: "dead",
	hero: { name: "Test Hero", classId: "warrior", level: 7 },
	finalEnemy: { name: "Dragon" },
	battleNumber: 20,
	gold: 100,
	streak: 5,
	finalMomentLog: [
		{ id: "one", actor: "enemy", message: "Dragon attacks." },
		{ id: "two", actor: "system", message: "The run ends." },
	],
};

function renderScreen() {
	return render(
		<MemoryRouter>
			<VictoryScreen run={run} />
		</MemoryRouter>,
	);
}

describe("VictoryScreen", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		selectRunSummaryView.mockReturnValue(summary);
	});

	it("renders a safe fallback for non-retired summaries", () => {
		renderScreen();

		expect(screen.getByRole("link", { name: "New Hero" })).toHaveAttribute(
			"href",
			"/create-character",
		);
	});

	it("renders retired victory details and final moments", () => {
		selectRunSummaryView.mockReturnValue({ ...summary, status: "retired" });

		renderScreen();

		expect(screen.getByRole("heading", { name: "The Ladder Is Broken" })).toBeInTheDocument();
		expect(screen.getByRole("region", { name: "Final moments" })).toHaveTextContent(
			"The run ends.",
		);
	});
});
