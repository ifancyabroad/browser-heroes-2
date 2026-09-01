import { fireEvent, render, screen } from "@testing-library/react";
import type { RunView } from "@app/shared";
import { beforeEach, describe, expect, it, vi } from "vitest";

const selectors = vi.hoisted(() => ({
	selectCombatView: vi.fn(),
	selectAvailableActions: vi.fn(),
	selectHeroProgression: vi.fn(),
	selectEncounterContext: vi.fn(),
}));
const mutate = vi.hoisted(() => vi.fn());
const showError = vi.hoisted(() => vi.fn());

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
vi.mock("../../../components/GameMainPanel", () => ({
	GameMainPanel: ({
		children,
		actions,
		header,
	}: {
		children: React.ReactNode;
		actions: React.ReactNode;
		header?: React.ReactNode;
	}) => (
		<div>
			{header}
			{children}
			{actions}
		</div>
	),
}));
vi.mock("./CombatSidebar", () => ({ CombatSidebar: () => <div>Combat sidebar</div> }));
vi.mock("./CombatantPanel", () => ({
	CombatantPanel: ({ descriptor }: { descriptor?: string }) => <div>Combatant {descriptor}</div>,
}));
vi.mock("./Battlefield", () => ({ Battlefield: () => <div>Battlefield</div> }));
vi.mock("./CombatActionBar", () => ({
	CombatActionBar: (props: {
		canBasicAttack: boolean;
		canSkipTurn: boolean;
		canUseHealingPotion: boolean;
		canContinue: boolean;
		canReturnToTown: boolean;
		onBasicAttack: () => void;
		onSkipTurn: () => void;
		onUseHealingPotion: () => void;
		onUseSkill: (id: "heavy_strike") => void;
		onContinue: () => void;
		onReturnToTown: () => void;
	}) => (
		<div>
			<span>
				availability:
				{[
					props.canBasicAttack,
					props.canSkipTurn,
					props.canUseHealingPotion,
					props.canContinue,
					props.canReturnToTown,
				].join(",")}
			</span>
			<button onClick={props.onBasicAttack}>Basic</button>
			<button onClick={props.onSkipTurn}>Skip</button>
			<button onClick={props.onUseHealingPotion}>Potion</button>
			<button onClick={() => props.onUseSkill("heavy_strike")}>Skill</button>
			<button onClick={props.onContinue}>Continue</button>
			<button onClick={props.onReturnToTown}>Town</button>
		</div>
	),
}));

import { CombatView } from "./CombatView";

const run = {
	id: "run-id",
	state: { hero: { classId: "warrior" } },
} as RunView;

function createCombatView() {
	return {
		battleNumber: 2,
		gold: 10,
		goldMultiplier: 1,
		zone: "forest",
		healingPotions: 1,
		maxHealingPotions: 3,
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
		selectors.selectHeroProgression.mockReturnValue({});
		selectors.selectEncounterContext.mockReturnValue({ zone: "caves" });
	});

	it("shows a stable fallback when combat state is unavailable", () => {
		selectors.selectCombatView.mockReturnValue(null);

		render(<CombatView run={run} />);

		expect(screen.getByText("Combat state is unavailable.")).toBeInTheDocument();
	});

	it("maps available engine actions to command availability", () => {
		render(<CombatView run={run} />);

		expect(screen.getByText("availability:true,true,true,true,true")).toBeInTheDocument();
	});

	it("passes the enemy descriptor from the combat selector to the combatant panel", () => {
		selectors.selectCombatView.mockReturnValue({
			...createCombatView(),
			enemyDescriptor: "Ghost Owner",
		});

		render(<CombatView run={run} />);

		expect(screen.getByText("Combatant Ghost Owner")).toBeInTheDocument();
	});

	it.each([
		["Basic", { type: "PLAYER_BASIC_ATTACK" }],
		["Skip", { type: "PLAYER_SKIP_TURN" }],
		["Potion", { type: "PLAYER_USE_CONSUMABLE", consumableType: "healingPotion" }],
		["Skill", { type: "PLAYER_USE_SKILL", skillId: "heavy_strike" }],
		["Continue", { type: "CONTINUE_TO_NEXT_COMBAT" }],
		["Town", { type: "RETURN_TO_TOWN" }],
	])("submits the %s engine action", (button, action) => {
		render(<CombatView run={run} />);

		fireEvent.click(screen.getByRole("button", { name: button }));

		expect(mutate).toHaveBeenCalledWith({ runId: "run-id", action }, expect.any(Object));
	});

	it("shows translated engine failures", () => {
		render(<CombatView run={run} />);
		fireEvent.click(screen.getByRole("button", { name: "Basic" }));
		const callbacks = mutate.mock.calls[0][1];

		callbacks.onSuccess({ result: { ok: false, error: "PLAYER_CANNOT_ACT" } });

		expect(showError).toHaveBeenCalledWith("Engine: PLAYER_CANNOT_ACT");
	});

	it("shows the action-specific transport failure", () => {
		render(<CombatView run={run} />);
		fireEvent.click(screen.getByRole("button", { name: "Potion" }));
		const callbacks = mutate.mock.calls[0][1];

		callbacks.onError();

		expect(showError).toHaveBeenCalledWith("Unable to use a healing potion. Please try again.");
	});
});
