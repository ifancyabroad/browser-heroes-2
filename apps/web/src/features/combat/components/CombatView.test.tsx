import { act, fireEvent, render as renderUi, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import type { RunView } from "@app/shared";
import type { ComponentProps } from "react";
import type { CombatActionBar } from "./CombatActionBar";
import { applyAction, createInitialRunState, selectConsumableInventory } from "@app/engine";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { TooltipProvider } from "../../../components/Tooltip";
import { useGameModalStore } from "../../../stores/gameModalStore";

const render = (ui: React.ReactNode) => renderUi(ui, { wrapper: MemoryRouter });

const selectors = vi.hoisted(() => ({
	selectCombatView: vi.fn(),
	selectAvailableActions: vi.fn(),
}));
const mutate = vi.hoisted(() => vi.fn());
const showError = vi.hoisted(() => vi.fn());
const renderActionBar = vi.hoisted(() => vi.fn());

vi.mock("@app/engine", async (importOriginal) => ({
	...(await importOriginal<typeof import("@app/engine")>()),
	...selectors,
}));
vi.mock("../../runs", () => ({
	useApplyRunAction: () => ({ mutate, isPending: false }),
	getEngineErrorMessage: (error: string) => `Engine: ${error}`,
}));
vi.mock("../../../stores/errorModalStore", () => ({
	useErrorModalStore: (selector: (state: { showError: typeof showError }) => unknown) =>
		selector({ showError }),
}));
vi.mock("../../../components/GameLayout", () => ({
	GameLayout: ({ children }: { children: React.ReactNode }) => children,
}));
vi.mock("./EnemySummary", () => ({
	EnemySummary: ({ descriptor }: { descriptor?: string }) => <div>Enemy {descriptor}</div>,
}));
vi.mock("./CombatActionBar", () => ({
	CombatActionBar: (props: ComponentProps<typeof CombatActionBar>) => {
		renderActionBar(props);
		return (
			<div>
				<span>
					availability:
					{[
						props.canBasicAttack,
						props.canSkipTurn,
						props.availableConsumableIds.has("healingPotion"),
						props.canContinue,
						props.canReturnToTown,
					].join(",")}
				</span>
				<button onClick={props.onBasicAttack}>Basic</button>
				<button onClick={props.onSkipTurn}>Skip</button>
				<button onClick={() => props.onUseConsumable("healingPotion")}>Potion</button>
				<button onClick={() => props.onUseSkill("heavy_strike")}>Skill</button>
				<button onClick={props.onContinue}>Continue</button>
				<button onClick={props.onReturnToTown}>Town</button>
			</div>
		);
	},
}));

import { CombatView } from "./CombatView";

const { state: initialState } = createInitialRunState({
	runId: "run-id",
	seed: "combat-view-test",
	heroName: "Hero",
	classId: "warrior",
});
const run = {
	id: "run-id",
	state: applyAction(initialState, { type: "ENTER_COMBAT" }).state,
} as RunView;

function createCombatView() {
	return {
		turnOrder: [
			{ id: "hero", shortName: "Hero" },
			{ id: "enemy", shortName: "Enemy" },
		],
		battleNumber: 2,
		zoneBattleNumber: 2,
		battlesPerZone: 10,
		gold: 10,
		goldMultiplier: 1,
		zone: "forest",
		nextZoneOptions: ["castle"],
		consumables: selectConsumableInventory(run.state.hero),
		enemyDescriptor: undefined,
		combat: {
			status: "active",
			encounterType: "standard",
			log: [],
			player: {
				name: "Hero",
				level: 1,
				currentHp: 10,
				maxHp: 10,
				activeEffects: [],
			},
			enemy: { id: "enemy", name: "Enemy", currentHp: 10, portrait: "" },
		},
	};
}

describe("CombatView", () => {
	beforeEach(() => {
		useGameModalStore.setState({ modal: null });
		vi.clearAllMocks();
		selectors.selectCombatView.mockReturnValue(createCombatView());
		selectors.selectAvailableActions.mockReturnValue([
			{ type: "PLAYER_BASIC_ATTACK" },
			{ type: "PLAYER_SKIP_TURN" },
			{ type: "PLAYER_USE_CONSUMABLE", consumableType: "healingPotion" },
			{ type: "PLAYER_USE_SKILL", skillId: "heavy_strike" },
			{ type: "CONTINUE_TO_NEXT_COMBAT" },
			{ type: "RETURN_TO_TOWN" },
		]);
	});

	it("shows a stable fallback when combat state is unavailable", () => {
		selectors.selectCombatView.mockReturnValue(null);

		render(
			<TooltipProvider>
				<CombatView run={run} />
			</TooltipProvider>,
		);

		expect(screen.getByText("Combat state is unavailable.")).toBeInTheDocument();
	});

	it("opens and closes the combat log from navigation", () => {
		render(
			<TooltipProvider>
				<CombatView run={run} />
			</TooltipProvider>,
		);
		const logButton = screen.getByRole("button", { name: "Combat Log" });
		expect(logButton).toHaveAttribute("aria-expanded", "false");
		fireEvent.click(logButton);
		expect(useGameModalStore.getState().modal).toBe("combatLog");
		expect(logButton).toHaveAttribute("aria-expanded", "true");
		act(() => useGameModalStore.getState().close());
		expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
		expect(logButton).toHaveAttribute("aria-expanded", "false");
	});

	it("renders the current combat log and follows updates from the selector", () => {
		const combatView = createCombatView();
		const log = run.state.combat!.log;
		selectors.selectCombatView.mockReturnValue({
			...combatView,
			combat: { ...combatView.combat, log },
		});
		const view = render(
			<TooltipProvider>
				<CombatView run={run} />
			</TooltipProvider>,
		);
		expect(screen.getByLabelText("Combat log")).toHaveTextContent(log[0].message);
		selectors.selectCombatView.mockReturnValue({
			...combatView,
			combat: {
				...combatView.combat,
				log: [...log, { ...log[0], id: "next-entry", message: "The hero attacks." }],
			},
		});
		view.rerender(
			<TooltipProvider>
				<CombatView run={run} />
			</TooltipProvider>,
		);
		expect(screen.getByLabelText("Combat log")).toHaveTextContent("The hero attacks.");
	});

	it("maps available engine actions to command availability", () => {
		render(
			<TooltipProvider>
				<CombatView run={run} />
			</TooltipProvider>,
		);

		expect(screen.getByText("availability:true,true,true,true,true")).toBeInTheDocument();
		expect(screen.getByLabelText("10 gold")).toBeInTheDocument();
	});

	it("passes the enemy descriptor from the combat selector to the enemy summary", () => {
		selectors.selectCombatView.mockReturnValue({
			...createCombatView(),
			enemyDescriptor: "Ghost Owner",
		});

		render(
			<TooltipProvider>
				<CombatView run={run} />
			</TooltipProvider>,
		);

		expect(screen.getByText("Enemy Ghost Owner")).toBeInTheDocument();
	});

	it.each([
		["Basic", { type: "PLAYER_BASIC_ATTACK" }],
		["Skip", { type: "PLAYER_SKIP_TURN" }],
		["Potion", { type: "PLAYER_USE_CONSUMABLE", consumableType: "healingPotion" }],
		["Skill", { type: "PLAYER_USE_SKILL", skillId: "heavy_strike" }],
		["Continue", { type: "CONTINUE_TO_NEXT_COMBAT" }],
		["Town", { type: "RETURN_TO_TOWN" }],
	])("submits the %s engine action", (button, action) => {
		render(
			<TooltipProvider>
				<CombatView run={run} />
			</TooltipProvider>,
		);

		fireEvent.click(screen.getByRole("button", { name: button }));

		expect(mutate).toHaveBeenCalledWith({ runId: "run-id", action }, expect.any(Object));
	});

	it("shows translated engine failures", () => {
		render(
			<TooltipProvider>
				<CombatView run={run} />
			</TooltipProvider>,
		);
		fireEvent.click(screen.getByRole("button", { name: "Basic" }));
		const callbacks = mutate.mock.calls[0][1];

		callbacks.onSuccess({ result: { ok: false, error: "PLAYER_CANNOT_ACT" } });

		expect(showError).toHaveBeenCalledWith("Engine: PLAYER_CANNOT_ACT");
	});

	it.each(["explosivePotion", "speedPotion", "invisibilityPotion"] as const)(
		"passes consumable data and submits %s through the generic callback",
		(consumableType) => {
			const combatView = createCombatView();
			combatView.consumables[consumableType].quantity = 1;
			selectors.selectCombatView.mockReturnValue(combatView);
			selectors.selectAvailableActions.mockReturnValue([
				{ type: "PLAYER_USE_CONSUMABLE", consumableType },
			]);
			render(
				<TooltipProvider>
					<CombatView run={run} />
				</TooltipProvider>,
			);
			const props = renderActionBar.mock.lastCall![0] as ComponentProps<
				typeof CombatActionBar
			>;
			expect(props.consumables).toBe(combatView.consumables);
			expect(props.availableConsumableIds).toEqual(new Set([consumableType]));
			act(() => props.onUseConsumable(consumableType));
			expect(mutate).toHaveBeenCalledWith(
				{ runId: run.id, action: { type: "PLAYER_USE_CONSUMABLE", consumableType } },
				expect.any(Object),
			);
		},
	);

	it("shows the action-specific transport failure", () => {
		render(
			<TooltipProvider>
				<CombatView run={run} />
			</TooltipProvider>,
		);
		fireEvent.click(screen.getByRole("button", { name: "Potion" }));
		const callbacks = mutate.mock.calls[0][1];

		callbacks.onError();

		expect(showError).toHaveBeenCalledWith("Unable to use that consumable. Please try again.");
	});

	it("retains combat log access in the outgoing combat frame without a world toggle", () => {
		render(
			<TooltipProvider>
				<CombatView run={{ ...run, state: { ...run.state, phase: "dead" } }} />
			</TooltipProvider>,
		);
		fireEvent.click(screen.getByRole("button", { name: "Combat Log" }));
		expect(useGameModalStore.getState().modal).toBe("combatLog");
		expect(screen.queryByRole("button", { name: "World Log" })).not.toBeInTheDocument();
	});
});
