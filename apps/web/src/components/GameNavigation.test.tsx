import { applyAction, createInitialRunState } from "@app/engine";
import type { RunView } from "@app/shared";
import { act, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { TooltipProvider } from "./Tooltip";
import { MemoryRouter } from "react-router-dom";
import { GameNavigation } from "./GameNavigation";
import { HeroSummary, HeroStatsModal, HeroEquipmentModal, HeroSkillsModal } from "../features/hero";
import { HowToPlayModal } from "../features/howToPlay";
import { useGameModalStore } from "../stores/gameModalStore";

const action = vi.hoisted(() => ({ mutate: vi.fn(), isPending: false }));
vi.mock("../features/runs", () => ({
	useApplyRunAction: () => action,
	getEngineErrorMessage: (error: string) => `Engine: ${error}`,
}));

beforeEach(() => {
	useGameModalStore.setState({ modal: null });
	action.mutate.mockReset();
	action.isPending = false;
});

function createRun(combat = false): RunView {
	const { state } = createInitialRunState({
		runId: "hero-menu-test",
		seed: "hero-menu-test",
		heroName: "Mira",
		classId: "warrior",
	});
	return {
		id: state.id,
		state: combat ? applyAction(state, { type: "ENTER_COMBAT" }).state : state,
	} as RunView;
}

function menu(run: RunView) {
	return (
		<MemoryRouter>
			<TooltipProvider>
				<GameNavigation showCombatLog={run.state.combat !== null} />
				<HeroStatsModal run={run} />
				<HeroEquipmentModal run={run} />
				<HeroSkillsModal run={run} />
				<HowToPlayModal />
			</TooltipProvider>
		</MemoryRouter>
	);
}

describe("GameNavigation", () => {
	it("shows current hero stats with the class portrait and restores focus on close", async () => {
		const run = createRun();
		run.state.hero.attributes.strength = 23;
		render(menu(run));
		const opener = screen.getByRole("button", { name: "Hero stats" });
		act(() => opener.focus());
		fireEvent.click(opener);
		const dialog = screen.getByRole("dialog", { name: "Stats" });
		expect(
			within(dialog).getByRole("img", { name: "Warrior class portrait" }),
		).toBeInTheDocument();
		expect(within(dialog).getByText("Mira the Warrior")).toBeInTheDocument();
		expect(
			within(dialog).getByRole("region", { name: "Attributes" }).querySelector("li"),
		).toHaveTextContent("23");
		expect(within(dialog).getByRole("region", { name: "Proficiencies" })).toBeInTheDocument();
		fireEvent.click(within(dialog).getByRole("button", { name: "Close" }));
		await waitFor(() => expect(opener).toHaveFocus());
		expect(opener).toHaveAttribute("aria-expanded", "false");
	});

	it("reuses equipment controls and blocks weapon swaps while an action is pending", () => {
		const run = createRun();
		run.state.hero.equipment.offHand = {
			...structuredClone(run.state.hero.equipment.mainHand!),
			instanceId: "off-hand",
		};
		const view = render(menu(run));
		fireEvent.click(screen.getByRole("button", { name: "Equipment" }));
		const dialog = screen.getByRole("dialog", { name: "Equipment" });
		fireEvent.click(within(dialog).getByRole("button", { name: "Swap Weapons" }));
		expect(action.mutate).toHaveBeenCalledWith(
			{ runId: run.id, action: { type: "SWAP_HAND_WEAPONS" } },
			expect.any(Object),
		);
		action.isPending = true;
		view.rerender(menu(run));
		expect(screen.getByRole("button", { name: "Swap Weapons" })).toBeDisabled();
	});

	it("does not offer weapon swapping without authorization from available actions", () => {
		render(menu(createRun(true)));
		fireEvent.click(screen.getByRole("button", { name: "Equipment" }));
		expect(screen.getByRole("button", { name: "Swap Weapons" })).toBeDisabled();
	});

	it("keeps the skills modal current with combat charges and feats", () => {
		const run = createRun(true);
		run.state.hero.skills = [{ skillId: "heavy_strike", chargesRemaining: 6 }];
		run.state.combat!.player.skills = [{ skillId: "heavy_strike", chargesRemaining: 2 }];
		run.state.combat!.player.featIds = ["commanding_presence"];
		const view = render(menu(run));
		fireEvent.click(screen.getByRole("button", { name: "Skills and feats" }));
		expect(screen.getByText("2/6")).toBeInTheDocument();
		expect(screen.getByText("Commanding Presence")).toBeInTheDocument();
		const next = structuredClone(run);
		next.state.combat!.player.skills[0].chargesRemaining = 1;
		view.rerender(menu(next));
		expect(screen.getByRole("dialog", { name: "Skills and feats" })).toBeInTheDocument();
		expect(screen.getByText("1/6")).toBeInTheDocument();
	});

	it("retains the existing empty state for heroes without skills or feats", () => {
		const run = createRun();
		run.state.hero.skills = [];
		run.state.hero.featIds = [];
		render(menu(run));
		fireEvent.click(screen.getByRole("button", { name: "Skills and feats" }));
		expect(screen.getByText("No skills")).toBeInTheDocument();
	});

	it("uses the same store for How to Play and only renders the selected dialog", () => {
		render(menu(createRun()));
		fireEvent.click(screen.getByRole("button", { name: "Hero stats" }));
		expect(screen.getByRole("dialog", { name: "Stats" })).toBeInTheDocument();
		act(() => useGameModalStore.getState().open("howToPlay"));
		expect(screen.getAllByRole("dialog")).toHaveLength(1);
		expect(screen.getByRole("dialog", { name: "HOW TO PLAY" })).toBeInTheDocument();
		fireEvent.click(screen.getByRole("button", { name: "Close" }));
		expect(useGameModalStore.getState().modal).toBeNull();
	});
});

describe("HeroSummary", () => {
	it("uses live combat HP, displays XP, and reserves the empty effects row", () => {
		const run = createRun(true);
		run.state.combat!.player.currentHp = 7;
		run.state.combat!.player.maxHp = 30;
		run.state.combat!.player.activeEffects = [];
		const view = render(
			<MemoryRouter>
				<TooltipProvider>
					<HeroSummary run={run} />
				</TooltipProvider>
			</MemoryRouter>,
		);
		expect(screen.getByText("7/30")).toBeInTheDocument();
		expect(screen.getByText("XP")).toBeInTheDocument();
		expect(screen.getByLabelText("Hero active effects")).toHaveClass("min-h-8", "flex-wrap");
		const next = structuredClone(run);
		next.state.combat!.player.currentHp = 5;
		view.rerender(
			<MemoryRouter>
				<TooltipProvider>
					<HeroSummary run={next} />
				</TooltipProvider>
			</MemoryRouter>,
		);
		expect(screen.getByText("5/30")).toBeInTheDocument();
	});
});
