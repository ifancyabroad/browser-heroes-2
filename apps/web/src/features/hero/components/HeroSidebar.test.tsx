import { applyAction, createInitialRunState } from "@app/engine";
import type { RunView } from "@app/shared";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { TooltipProvider } from "../../../components/Tooltip";
import { HeroSidebar } from "./HeroSidebar";

vi.mock("../../worldLog/hooks/useWorldLog", () => ({
	useWorldLog: () => ({ entries: [], pending: false, error: false }),
}));

function createRun(): RunView {
	const { state } = createInitialRunState({
		runId: "sidebar-test",
		seed: "sidebar-test",
		heroName: "Mira",
		classId: "warrior",
	});
	state.hero.skills = [{ skillId: "heavy_strike", chargesRemaining: 6 }];
	state.combat!.player.skills = [{ skillId: "heavy_strike", chargesRemaining: 2 }];
	return { id: "sidebar-test", state } as RunView;
}

function sidebar(run: RunView, open = true) {
	return (
		<TooltipProvider>
			<HeroSidebar
				key={run.state.combat ? "combat" : "town"}
				run={run}
				open={open}
				onClose={vi.fn()}
				isPending={false}
			/>
		</TooltipProvider>
	);
}

function selectTab(name: string) {
	fireEvent.mouseDown(screen.getByRole("tab", { name }), { button: 0, ctrlKey: false });
}

describe("HeroSidebar", () => {
	beforeEach(() => {
		const media = window.matchMedia("");
		vi.mocked(window.matchMedia).mockImplementation((query) => ({
			...media,
			media: query,
			matches: query === "(min-width: 1024px)",
		}));
	});

	it("shows town tabs with Stats selected and resets defaults across views", () => {
		const run = createRun();
		run.state.combat!.status = "player_won";
		run.state.combat!.enemy.currentHp = 0;
		const result = applyAction(run.state, { type: "RETURN_TO_TOWN" });
		if (!result.ok) {
			throw new Error(result.error);
		}
		const townRun = { ...run, state: result.state };
		const view = render(sidebar(townRun));
		expect(screen.getByRole("tab", { name: "Stats" })).toHaveAttribute("aria-selected", "true");
		expect(screen.queryByRole("tab", { name: "Combat Log" })).not.toBeInTheDocument();
		selectTab("World Log");
		expect(screen.getByRole("region", { name: "World Log" })).toBeInTheDocument();
		view.rerender(sidebar(run));
		expect(screen.getByRole("tab", { name: "Combat Log" })).toHaveAttribute(
			"aria-selected",
			"true",
		);
		expect(screen.queryByRole("tab", { name: "Stats" })).not.toBeInTheDocument();
		view.rerender(sidebar(townRun));
		expect(screen.getByRole("tab", { name: "Stats" })).toHaveAttribute("aria-selected", "true");
	});

	it("uses live combat health, effects and charges while preserving the selected tab", () => {
		const run = createRun();
		run.state.combat!.player.currentHp = 7;
		run.state.combat!.player.maxHp = 30;
		const view = render(sidebar(run));
		expect(screen.getByText("7/30")).toBeInTheDocument();
		expect(screen.getByLabelText("Hero active effects")).toBeInTheDocument();
		selectTab("Skills");
		expect(screen.getByText("2/6")).toBeInTheDocument();
		const next = structuredClone(run);
		next.state.battleNumber += 1;
		next.state.combat!.player.currentHp = 5;
		next.state.combat!.player.skills[0].chargesRemaining = 1;
		next.state.combat!.player.activeEffects = [];
		view.rerender(sidebar(next));
		expect(screen.getByText("5/30")).toBeInTheDocument();
		expect(screen.getByText("1/6")).toBeInTheDocument();
		expect(screen.getByRole("tab", { name: "Skills" })).toHaveAttribute(
			"aria-selected",
			"true",
		);
		selectTab("Equipment");
		expect(screen.getByRole("button", { name: "Swap Weapons" })).toBeDisabled();
	});

	it("keeps combat tabs for the outgoing death frame", () => {
		const run = createRun();
		run.state.phase = "dead";
		run.state.combat!.status = "enemy_won";
		run.state.combat!.player.currentHp = 0;
		render(sidebar(run));
		expect(screen.getByRole("tab", { name: "Combat Log" })).toHaveAttribute(
			"aria-selected",
			"true",
		);
		expect(screen.queryByRole("tab", { name: "Stats" })).not.toBeInTheDocument();
	});

	it("keeps both logs in matching containers", () => {
		render(sidebar(createRun()));
		const combatPanel = screen.getByRole("region", { name: "Combat Log" });
		expect(combatPanel).toHaveClass("min-h-[10lh]");
		selectTab("World Log");
		expect(screen.getByRole("region", { name: "World Log" }).className).toBe(
			combatPanel.className,
		);
	});

	it("opens the same tabs in the mobile hero drawer", () => {
		vi.mocked(window.matchMedia).mockImplementation(
			(query) =>
				({
					media: query,
					matches: false,
					addEventListener: vi.fn(),
					removeEventListener: vi.fn(),
				}) as unknown as MediaQueryList,
		);
		const run = createRun();
		const view = render(sidebar(run, false));
		expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
		view.rerender(sidebar(run));
		expect(screen.getByRole("dialog", { name: "Hero details" })).toBeInTheDocument();
		expect(screen.getAllByRole("tab")).toHaveLength(4);
		expect(screen.getByRole("tab", { name: "Combat Log" })).toHaveAttribute(
			"aria-selected",
			"true",
		);
	});
});
