import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import type { RunView } from "@app/shared";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useHowToPlayModalStore } from "../../howToPlay";

const selectors = vi.hoisted(() => ({
	selectTownView: vi.fn(),
	selectAvailableActions: vi.fn(),
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
	}: {
		children: React.ReactNode;
		actions: React.ReactNode;
	}) => (
		<div>
			{children}
			{actions}
		</div>
	),
}));
vi.mock("./HeroSidebar", () => ({
	HeroSidebar: ({ onSwapWeapons }: { onSwapWeapons: () => void }) => (
		<button onClick={onSwapWeapons}>Swap</button>
	),
}));
vi.mock("./TownActionBar", () => ({
	TownActionBar: (props: {
		canRest: boolean;
		canReroll: boolean;
		canBuyHealingPotion: boolean;
		canEnterCombat: boolean;
		onRest: () => void;
		onReroll: () => void;
		onBuyHealingPotion: () => void;
		onEnterCombat: () => void;
	}) => (
		<div>
			<span>
				availability:
				{[
					props.canRest,
					props.canReroll,
					props.canBuyHealingPotion,
					props.canEnterCombat,
				].join(",")}
			</span>
			<button onClick={props.onRest}>Rest</button>
			<button onClick={props.onReroll}>Reroll</button>
			<button onClick={props.onBuyHealingPotion}>Buy potion</button>
			<button onClick={props.onEnterCombat}>Enter</button>
		</div>
	),
}));
vi.mock("./TownShopGrid", () => ({
	TownShopGrid: ({ onBuy }: { onBuy: (slot: unknown) => void }) => (
		<div>
			<button
				onClick={() =>
					onBuy({
						id: "simple-item",
						purchased: false,
						canAfford: true,
						requiresEquipmentSlotSelection: false,
					})
				}
			>
				Buy item
			</button>
			<button
				onClick={() =>
					onBuy({
						id: "replacement-item",
						item: { id: "item-id" },
						destinations: ["mainHand"],
						purchased: false,
						canAfford: true,
						requiresEquipmentSlotSelection: true,
					})
				}
			>
				Buy replacement
			</button>
		</div>
	),
}));
vi.mock("../../../components/EquipmentSlotModal", () => ({
	EquipmentSlotModal: ({
		onCancel,
		onConfirm,
	}: {
		onCancel: () => void;
		onConfirm: (slot: "mainHand") => void;
	}) => (
		<div>
			<span>Replacement modal</span>
			<button onClick={onCancel}>Cancel</button>
			<button onClick={() => onConfirm("mainHand")}>Confirm replacement</button>
		</div>
	),
}));

import { TownView } from "./TownView";

const run = { id: "run-id", state: {} } as RunView;

function createTownView() {
	return {
		battleNumber: 2,
		day: 1,
		gold: 50,
		zone: "forest",
		canAffordRest: true,
		isFullyHealed: false,
		canAffordReroll: true,
		canAffordHealingPotion: true,
		canBuyHealingPotion: true,
		restCost: 10,
		rerollCost: 5,
		healingPotions: 1,
		maxHealingPotions: 3,
		healingPotionCost: 8,
		shopSlots: [],
	};
}

function renderView() {
	return render(
		<MemoryRouter>
			<TownView run={run} />
		</MemoryRouter>,
	);
}

describe("TownView", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		useHowToPlayModalStore.setState({ isOpen: false });
		selectors.selectTownView.mockReturnValue(createTownView());
		selectors.selectAvailableActions.mockReturnValue([
			{ type: "REST_AT_TOWN" },
			{ type: "REROLL_SHOP" },
			{ type: "BUY_CONSUMABLE" },
			{ type: "ENTER_COMBAT" },
			{ type: "SWAP_HAND_WEAPONS" },
		]);
	});

	it("shows a stable fallback when town state is unavailable", () => {
		selectors.selectTownView.mockReturnValue(null);

		renderView();

		expect(screen.getByText("Town state is unavailable.")).toBeInTheDocument();
	});

	it("combines engine availability with affordability", () => {
		renderView();

		expect(screen.getByText("availability:true,true,true,true")).toBeInTheDocument();
	});

	it("allows resting at full health so skill uses can be restored", () => {
		selectors.selectTownView.mockReturnValue({
			...createTownView(),
			isFullyHealed: true,
		});

		renderView();

		expect(screen.getByText("availability:true,true,true,true")).toBeInTheDocument();
	});

	it("opens the how-to-play guide from above the shop", () => {
		renderView();

		const triggers = screen.getAllByRole("button", { name: /how to play/i });
		fireEvent.click(triggers[0]);

		expect(useHowToPlayModalStore.getState().isOpen).toBe(true);
	});

	it.each([
		["Rest", { type: "REST_AT_TOWN" }],
		["Reroll", { type: "REROLL_SHOP" }],
		["Buy potion", { type: "BUY_CONSUMABLE", consumableType: "healingPotion" }],
		["Enter", { type: "ENTER_COMBAT" }],
		["Swap", { type: "SWAP_HAND_WEAPONS" }],
		["Buy item", { type: "BUY_ITEM", shopSlotId: "simple-item" }],
	])("submits the %s engine action", (button, action) => {
		renderView();

		fireEvent.click(screen.getByRole("button", { name: button }));

		expect(mutate).toHaveBeenCalledWith({ runId: "run-id", action }, expect.any(Object));
	});

	it("collects an equipment slot before buying replacement items", () => {
		renderView();
		fireEvent.click(screen.getByRole("button", { name: "Buy replacement" }));
		expect(screen.getByText("Replacement modal")).toBeInTheDocument();

		fireEvent.click(screen.getByRole("button", { name: "Confirm replacement" }));

		expect(mutate).toHaveBeenCalledWith(
			{
				runId: "run-id",
				action: {
					type: "BUY_ITEM",
					shopSlotId: "replacement-item",
					equipmentSlot: "mainHand",
				},
			},
			expect.any(Object),
		);
	});

	it("shows translated engine failures", () => {
		renderView();
		fireEvent.click(screen.getByRole("button", { name: "Rest" }));
		const callbacks = mutate.mock.calls[0][1];

		callbacks.onSuccess({ result: { ok: false, error: "NOT_ENOUGH_GOLD" } });

		expect(showError).toHaveBeenCalledWith("Engine: NOT_ENOUGH_GOLD");
	});

	it("shows the action-specific transport failure", () => {
		renderView();
		fireEvent.click(screen.getByRole("button", { name: "Reroll" }));
		const callbacks = mutate.mock.calls[0][1];

		callbacks.onError();

		expect(showError).toHaveBeenCalledWith("Unable to reroll the shop. Please try again.");
	});
});
