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

import { DeathScreen } from "./DeathScreen";

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
			<DeathScreen run={run} />
		</MemoryRouter>,
	);
}

describe("DeathScreen", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		selectRunSummaryView.mockReturnValue(summary);
	});

	it("renders a safe fallback when summary selection fails", () => {
		selectRunSummaryView.mockReturnValue(null);

		renderScreen();

		expect(screen.getByRole("heading", { name: "HERO SLAIN" })).toHaveFocus();
		expect(screen.getByRole("link", { name: "Try Again" })).toHaveAttribute(
			"href",
			"/create-character",
		);
	});

	it("renders death identity, enemy, battle, and final moments", () => {
		renderScreen();

		expect(screen.getByRole("heading", { name: "TEST HERO WAS SLAIN" })).toBeInTheDocument();
		expect(
			screen.getByText(
				"The dungeon falls quiet. Test Hero's wounds are too deep, and their story ends in the dark.",
			),
		).toBeInTheDocument();
		expect(screen.getByText(/Test Hero the Warrior/)).toBeInTheDocument();
		expect(screen.getByText("Dragon")).toBeInTheDocument();
		expect(screen.getByText("20")).toBeInTheDocument();
		expect(screen.getByRole("region", { name: "Final moments" })).toHaveTextContent(
			"Dragon attacks.",
		);
	});
});
