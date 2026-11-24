import { applyAction, createInitialRunState, selectTownView } from "@app/engine";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { act, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { TooltipProvider } from "../../../components/Tooltip";
import { applyRunAction } from "../../runs/api/applyRunAction";
import { runKeys } from "../../runs/api/runKeys";
import type { ApplyRunActionResponse, RunView } from "@app/shared";
import { useGameModalStore } from "../../../stores/gameModalStore";
import { HeroEquipmentModal } from "../../hero";
import { useErrorModalStore } from "../../../stores/errorModalStore";
import { TownView } from "./TownView";

vi.mock("../../runs/api/applyRunAction", () => ({ applyRunAction: vi.fn() }));
vi.mock("../../worldLog/api/getWorldLog", () => ({
	getWorldLog: vi.fn(async () => ({ entries: [] })),
}));

function createTownRun(): RunView {
	const { state: town } = createInitialRunState({
		runId: "run-id",
		seed: "town-ui-tests",
		heroName: "Mira",
		classId: "warrior",
	});
	const initial = applyAction(town, { type: "ENTER_COMBAT" }).state;
	if (!initial.combat) {
		throw new Error("Expected initial combat");
	}
	initial.combat.status = "player_won";
	initial.combat.enemy.currentHp = 0;
	const result = applyAction(initial, { type: "RETURN_TO_TOWN" });
	if (!result.ok) {
		throw new Error(result.error);
	}
	const state = result.state;
	state.gold = 100;
	state.hero.consumables.healingPotion = 1;
	return {
		id: state.id,
		season: 1,
		mode: "normal",
		dailyChallengeDate: null,
		status: "active",
		state,
		summary: {
			heroName: state.hero.name,
			classId: state.hero.classId,
			level: state.hero.level,
			battleNumber: state.battleNumber,
			zoneNumber: state.zoneNumber,
			zone: state.zone,
			endlessCycle: state.endlessCycle,
			day: state.day,
			kills: 1,
			hasDefeatedFinalBoss: false,
			slainBy: null,
		},
		createdAt: "2026-11-12T12:00:00Z",
		updatedAt: "2026-11-12T12:00:00Z",
		completedAt: null,
	};
}

function setup(run = createTownRun()) {
	let currentRun = run;
	const client = new QueryClient({
		defaultOptions: {
			queries: { retry: false, staleTime: Infinity },
			mutations: { retry: false },
		},
	});
	client.setQueryData(runKeys.game(), { run });
	vi.mocked(applyRunAction).mockImplementation(async ({ action }) => {
		const result = applyAction(currentRun.state, action);
		currentRun = { ...currentRun, state: result.state };
		return { run: currentRun, result, unlockedAchievements: [] };
	});
	function Game() {
		const { data } = useQuery({
			queryKey: runKeys.game(),
			queryFn: async () => ({ run: currentRun }),
		});
		return (
			<>
				<TownView run={data!.run} />
				<HeroEquipmentModal run={data!.run} />
			</>
		);
	}
	render(
		<QueryClientProvider client={client}>
			<MemoryRouter>
				<TooltipProvider>
					<Game />
				</TooltipProvider>
			</MemoryRouter>
		</QueryClientProvider>,
	);
	return { getRun: () => currentRun };
}

describe("TownView", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		useGameModalStore.setState({ modal: null });
		useErrorModalStore.getState().hideError();
	});
	it.each([
		{ count: 0, label: "0/3", tone: "border-error" },
		{ count: 1, label: "1/3", tone: "border-warning" },
		{ count: 2, label: "2/3", tone: "border-warning" },
		{ count: 3, label: "3/3", tone: "border-success" },
	])("shows $label with the appropriate potion status colour", ({ count, label, tone }) => {
		const run = createTownRun();
		run.state.hero.consumables.healingPotion = count;
		setup(run);
		const card = screen.getByRole("article", { name: "Alchemist" });
		for (const badge of within(card).getAllByText(label)) {
			expect(badge).toHaveClass("border-2", tone);
		}
	});
	it.each([
		{ rested: false, label: "Weary", tone: "border-warning" },
		{ rested: true, label: "Rested", tone: "border-success" },
	])("shows $label for the tavern", ({ rested, label, tone }) => {
		const run = createTownRun();
		if (!rested) {
			run.state.hero.skills[0].chargesRemaining = 0;
		}
		setup(run);
		const card = screen.getByRole("article", { name: "Tavern" });
		for (const badge of within(card).getAllByText(label)) {
			expect(badge).toHaveClass("border-2", tone);
		}
	});
	it("buys one potion per click and renders the updated inventory and gold", async () => {
		const run = createTownRun();
		const town = selectTownView(run.state)!;
		const { getRun } = setup(run);
		const alchemist = screen.getByRole("article", { name: "Alchemist" });
		expect(
			within(alchemist).getByText(`${town.consumables.healingPotion.price}g`),
		).toBeInTheDocument();
		fireEvent.click(screen.getByRole("button", { name: "Buy one healing potion" }));
		await waitFor(() => expect(within(alchemist).getByText("2/3")).toBeInTheDocument());
		expect(
			screen.getByLabelText(`${run.state.gold - town.consumables.healingPotion.price} gold`),
		).toBeInTheDocument();
		expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
		expect(getRun().state.hero.consumables.healingPotion).toBe(2);
		expect(applyRunAction).toHaveBeenCalledExactlyOnceWith({
			runId: run.id,
			action: { type: "BUY_CONSUMABLE", consumableType: "healingPotion", quantity: 1 },
		});
	});

	it("disables the alchemist after the final potion slot is filled", async () => {
		const run = createTownRun();
		run.state.hero.consumables.healingPotion = 2;
		setup(run);
		const buy = screen.getByRole("button", { name: "Buy one healing potion" });
		fireEvent.click(buy);
		await waitFor(() => expect(buy).toBeDisabled());
		expect(screen.getByRole("article", { name: "Alchemist" })).toHaveTextContent("3/3");
		fireEvent.click(buy);
		expect(applyRunAction).toHaveBeenCalledTimes(1);
	});

	it("rests immediately at full health to restore skill uses, then disables further rest", async () => {
		const run = createTownRun();
		run.state.hero.skills[0].chargesRemaining = 0;
		expect(selectTownView(run.state)!.isFullyHealed).toBe(true);
		const cost = selectTownView(run.state)!.restCost;
		const { getRun } = setup(run);
		const rest = screen.getByRole("button", { name: "Rest at tavern" });
		expect(
			within(screen.getByRole("article", { name: "Tavern" })).getByText(`${cost}g`),
		).toBeInTheDocument();
		fireEvent.click(rest);
		await waitFor(() => expect(getRun().state.day).toBe(run.state.day + 1));
		expect(getRun().state.hero.skills[0].chargesRemaining).toBeGreaterThan(0);
		expect(getRun().state.gold).toBe(run.state.gold - cost);
		expect(screen.getByRole("article", { name: "Tavern" })).toHaveTextContent("Rested");
		expect(rest).toBeDisabled();
		expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
		expect(applyRunAction).toHaveBeenCalledExactlyOnceWith({
			runId: run.id,
			action: { type: "REST_AT_TOWN" },
		});
	});

	it.each(["Rest at tavern", "Buy one healing potion"])(
		"disables %s when it is unaffordable",
		(action) => {
			const run = createTownRun();
			run.state.gold = 0;
			run.state.hero.currentHp = 1;
			setup(run);
			const button = screen.getByRole("button", { name: action });
			expect(button).toBeDisabled();
			fireEvent.click(button);
			expect(applyRunAction).not.toHaveBeenCalled();
		},
	);
	it("shows shop stock directly alongside navigation and town services", () => {
		setup();
		expect(screen.getByRole("navigation", { name: "Game navigation" })).toBeInTheDocument();
		expect(screen.getByRole("region", { name: "World Log" })).toBeInTheDocument();
		fireEvent.click(screen.getByRole("button", { name: "How to play" }));
		expect(useGameModalStore.getState().modal).toBe("howToPlay");
		const shop = screen.getByRole("region", { name: "Shop" });
		expect(within(shop).getByRole("button", { name: /^Reroll / })).toBeInTheDocument();
		expect(within(shop).getAllByRole("article")).toHaveLength(6);
		expect(screen.queryByRole("dialog", { name: "Shop" })).not.toBeInTheDocument();
		expect(screen.getByRole("region", { name: "World Log" })).toBeInTheDocument();
		expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
		expect(screen.getByRole("button", { name: "Rest at tavern" })).toBeInTheDocument();
	});
	it("shows a fallback outside town", () => {
		const run = createTownRun();
		run.state = createInitialRunState({
			runId: run.id,
			seed: "outside-town",
			heroName: "Mira",
			classId: "warrior",
		}).state;
		run.state = applyAction(run.state, { type: "ENTER_COMBAT" }).state;
		setup(run);
		expect(screen.getByText("Town state is unavailable.")).toBeInTheDocument();
	});
	it("blocks repeated actions while a service request is pending", async () => {
		setup();
		vi.mocked(applyRunAction).mockImplementation(() => new Promise(() => {}));
		const buy = screen.getByRole("button", { name: "Buy one healing potion" });
		fireEvent.click(buy);
		await waitFor(() => expect(buy).toBeDisabled());
		expect(screen.getByRole("button", { name: "Rest at tavern" })).toBeDisabled();
		expect(screen.getByRole("button", { name: /^Battle in / })).toBeDisabled();
		fireEvent.click(buy);
		expect(applyRunAction).toHaveBeenCalledTimes(1);
	});

	it("updates rest status only after a successful response", async () => {
		const run = createTownRun();
		run.state.hero.currentHp = 1;
		setup(run);
		let complete!: (response: ApplyRunActionResponse) => void;
		vi.mocked(applyRunAction).mockReturnValueOnce(
			new Promise((resolve) => {
				complete = resolve;
			}),
		);
		const rest = screen.getByRole("button", { name: "Rest at tavern" });
		fireEvent.click(rest);
		await waitFor(() => expect(rest).toBeDisabled());
		expect(screen.getByRole("article", { name: "Tavern" })).toHaveTextContent("Weary");
		const result = applyAction(run.state, { type: "REST_AT_TOWN" });
		expect(result.ok).toBe(true);
		await act(async () => {
			complete({ run: { ...run, state: result.state }, result, unlockedAchievements: [] });
		});
		await waitFor(() =>
			expect(screen.getByRole("article", { name: "Tavern" })).toHaveTextContent("Rested"),
		);
	});

	it("reports engine and transport errors and leaves rest available to retry", async () => {
		const run = createTownRun();
		run.state.hero.currentHp = 1;
		setup(run);
		vi.mocked(applyRunAction).mockResolvedValueOnce({
			run,
			result: { ok: false, error: "NOT_ENOUGH_GOLD", state: run.state, events: [] },
			unlockedAchievements: [],
		});
		const rest = screen.getByRole("button", { name: "Rest at tavern" });
		fireEvent.click(rest);
		await waitFor(() =>
			expect(useErrorModalStore.getState().message).toBe("You do not have enough gold."),
		);
		await waitFor(() => expect(rest).toBeEnabled());
		vi.mocked(applyRunAction).mockRejectedValueOnce(new Error("offline"));
		fireEvent.click(rest);
		await waitFor(() =>
			expect(useErrorModalStore.getState().message).toBe("Unable to rest. Please try again."),
		);
		await waitFor(() => expect(rest).toBeEnabled());
	});
	it("buys shop equipment into an available slot", async () => {
		const run = createTownRun();
		run.state.gold = 10000;
		run.state.hero.equipment.offHand = null;
		run.state.town!.shopSlots = [
			{
				id: "shop-slot",
				item: { instanceId: "shop-item", type: "static", itemId: "acid_edge" },
				price: 10,
				purchased: false,
			},
		];
		const slot = selectTownView(run.state)!.shopSlots[0];
		expect(slot.equipmentPlacement.automaticDestination).not.toBeNull();
		const { getRun } = setup(run);
		fireEvent.click(
			screen.getByRole("button", { name: `Buy ${slot.item.name} for ${slot.price} gold` }),
		);
		await waitFor(() => expect(getRun().state.town!.shopSlots[0].purchased).toBe(true));
		expect(applyRunAction).toHaveBeenCalledWith({
			runId: run.id,
			action: {
				type: "BUY_ITEM",
				shopSlotId: slot.id,
				equipmentSlot: slot.equipmentPlacement.automaticDestination!.equipmentSlot,
			},
		});
	});
	it("keeps the replacement choice after failure and closes only after a successful purchase", async () => {
		const run = createTownRun();
		run.state.gold = 10000;
		run.state.hero.equipment.offHand = {
			...structuredClone(run.state.hero.equipment.mainHand!),
			instanceId: "replacement-off-hand",
		};
		run.state.town!.shopSlots = [
			{
				id: "shop-slot",
				item: { instanceId: "shop-item", type: "static", itemId: "acid_edge" },
				price: 10,
				purchased: false,
			},
		];
		const slot = selectTownView(run.state)!.shopSlots[0];
		expect(slot.equipmentPlacement.automaticDestination).toBeNull();
		const { getRun } = setup(run);
		fireEvent.click(
			screen.getByRole("button", { name: `Buy ${slot.item.name} for ${slot.price} gold` }),
		);
		expect(applyRunAction).not.toHaveBeenCalled();
		const dialog = screen.getByRole("dialog");
		const choices = within(dialog).queryAllByRole("radio");
		if (choices.length) {
			fireEvent.click(choices[0]);
		}
		const confirm = within(dialog).getByRole("button", { name: "Confirm" });
		vi.mocked(applyRunAction).mockRejectedValueOnce(new Error("offline"));
		fireEvent.click(confirm);
		await waitFor(() =>
			expect(useErrorModalStore.getState().message).toBe(
				"Unable to buy that item. Please try again.",
			),
		);
		expect(dialog).toBeInTheDocument();
		if (choices.length) {
			expect(choices[0]).toBeChecked();
		}
		await waitFor(() => expect(confirm).toBeEnabled());
		fireEvent.click(confirm);
		await waitFor(() => expect(getRun().state.town!.shopSlots[0].purchased).toBe(true));
		await waitFor(() => expect(dialog).not.toBeInTheDocument());
		expect(screen.getByRole("region", { name: "Shop" })).toBeInTheDocument();
		expect(applyRunAction).toHaveBeenCalledWith({
			runId: run.id,
			action: {
				type: "BUY_ITEM",
				shopSlotId: slot.id,
				equipmentSlot: slot.equipmentPlacement.destinations[0].equipmentSlot,
			},
		});
	});
	it("disables reroll when the engine does not offer it", () => {
		const run = createTownRun();
		run.state.gold = 0;
		const cost = selectTownView(run.state)!.rerollCost;
		setup(run);
		const shop = screen.getByRole("region", { name: "Shop" });
		expect(within(shop).getByRole("button", { name: `Reroll ${cost}g` })).toBeDisabled();
		expect(applyRunAction).not.toHaveBeenCalled();
	});
	it("preserves a locked item when rerolling the shop", async () => {
		const run = createTownRun();
		run.state.gold = 10000;
		const slot = selectTownView(run.state)!.shopSlots[0];
		const { getRun } = setup(run);
		fireEvent.click(screen.getByRole("button", { name: `Lock ${slot.item.name}` }));
		await waitFor(() =>
			expect(getRun().state.shopLocks.some((lock) => lock.id === slot.id)).toBe(true),
		);
		const reroll = screen.getByRole("button", { name: /^Reroll / });
		await waitFor(() => expect(reroll).toBeEnabled());
		fireEvent.click(reroll);
		await waitFor(() => expect(getRun().state.town!.rerollCount).toBe(1));
		expect(getRun().state.town!.shopSlots).toContainEqual(
			run.state.town!.shopSlots.find((item) => item.id === slot.id),
		);
	});
	it.each([1, 2])("enters battle %i from the town hub", async (battleNumber) => {
		const run = createTownRun();
		run.state.battleNumber = battleNumber;
		const { getRun } = setup(run);
		fireEvent.click(screen.getByRole("button", { name: /^Battle in / }));
		await waitFor(() => expect(getRun().state.phase).toBe("combat"));
		expect(applyRunAction).toHaveBeenCalledWith({
			runId: "run-id",
			action: { type: "ENTER_COMBAT" },
		});
	});
	it("opens the equipment modal and swaps equipped weapons", async () => {
		const run = createTownRun();
		const mainHand = run.state.hero.equipment.mainHand;
		if (!mainHand) {
			throw new Error("Expected a warrior weapon");
		}
		run.state.hero.equipment.offHand = { ...structuredClone(mainHand), instanceId: "off-hand" };
		const { getRun } = setup(run);
		fireEvent.click(screen.getByRole("button", { name: "Equipment" }));
		const equipment = screen.getByRole("dialog", { name: "Equipment" });
		fireEvent.click(within(equipment).getByRole("button", { name: "Swap Weapons" }));
		await waitFor(() =>
			expect(getRun().state.hero.equipment.mainHand?.instanceId).toBe("off-hand"),
		);
		expect(applyRunAction).toHaveBeenCalledWith({
			runId: run.id,
			action: { type: "SWAP_HAND_WEAPONS" },
		});
	});
});
