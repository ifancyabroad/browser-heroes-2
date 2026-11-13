import { applyAction, createInitialRunState, selectTownView } from "@app/engine";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { act, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { TooltipProvider } from "../../../components/Tooltip";
import { useSidebarStore } from "../../../stores/sidebarStore";
import { applyRunAction } from "../../runs/api/applyRunAction";
import { runKeys } from "../../runs/api/runKeys";
import type { ApplyRunActionResponse, RunView } from "@app/shared";
import { useHowToPlayModalStore } from "../../howToPlay";
import { useErrorModalStore } from "../../../stores/errorModalStore";
import { TownView } from "./TownView";
import { ALCHEMIST_QUOTES, TAVERN_QUOTES } from "../quotes";

vi.mock("../../runs/api/applyRunAction", () => ({ applyRunAction: vi.fn() }));
vi.mock("../../worldLog/api/getWorldLog", () => ({
	getWorldLog: vi.fn(async () => ({ entries: [] })),
}));

function createTownRun(): RunView {
	const { state: initial } = createInitialRunState({
		runId: "run-id",
		seed: "town-ui-tests",
		heroName: "Mira",
		classId: "warrior",
	});
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
	state.hero.healingPotions = 1;
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
		return <TownView run={data!.run} />;
	}
	const { unmount } = render(
		<QueryClientProvider client={client}>
			<MemoryRouter>
				<TooltipProvider>
					<Game />
				</TooltipProvider>
			</MemoryRouter>
		</QueryClientProvider>,
	);
	return { getRun: () => currentRun, unmount };
}

describe("TownView", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		useSidebarStore.getState().close();
		useHowToPlayModalStore.setState({ isOpen: false });
		useErrorModalStore.getState().hideError();
	});
	it("marks stock as viewed after visiting the shop without submitting an action", () => {
		setup();
		expect(screen.getByRole("article", { name: "Shop" })).toHaveTextContent("New stock");
		fireEvent.click(screen.getByRole("button", { name: "Visit Shop" }));
		fireEvent.click(screen.getByRole("button", { name: "Back to town" }));
		expect(screen.getByRole("article", { name: "Shop" })).toHaveTextContent("Viewed");
		expect(applyRunAction).not.toHaveBeenCalled();
	});
	it("resets the shop status when the town screen remounts", () => {
		const { unmount } = setup();
		fireEvent.click(screen.getByRole("button", { name: "Visit Shop" }));
		fireEvent.click(screen.getByRole("button", { name: "Back to town" }));
		expect(screen.getByRole("article", { name: "Shop" })).toHaveTextContent("Viewed");
		unmount();
		setup();
		expect(screen.getByRole("article", { name: "Shop" })).toHaveTextContent("New stock");
	});
	it("shows zone-relative battle progress", () => {
		const run = createTownRun();
		run.state.battleNumber = 11;
		run.state.zoneNumber = 2;
		setup(run);
		expect(
			within(screen.getByRole("region", { name: "Next battle" })).getByText("Battle 1/10"),
		).toBeInTheDocument();
	});
	it.each([
		{ count: 0, label: "0/3", tone: "border-error" },
		{ count: 1, label: "1/3", tone: "border-warning" },
		{ count: 2, label: "2/3", tone: "border-warning" },
		{ count: 3, label: "3/3 MAX", tone: "border-success" },
	])("shows $label with the appropriate potion status colour", ({ count, label, tone }) => {
		const run = createTownRun();
		run.state.hero.healingPotions = count;
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
	it.each([
		{ service: "Alchemist", quotes: ALCHEMIST_QUOTES },
		{ service: "Tavern", quotes: TAVERN_QUOTES },
	])("selects a quote on each visit to the $service", ({ service, quotes }) => {
		setup();
		const random = vi.spyOn(Math, "random").mockReturnValue(0);
		try {
			fireEvent.click(screen.getByRole("button", { name: `Visit ${service}` }));
			const dialog = screen.getByRole("dialog", { name: service });
			expect(within(dialog).getByText(quotes[0])).toBeInTheDocument();
			fireEvent.click(within(dialog).getByRole("button", { name: "Close" }));
			random.mockReturnValue(0.999);
			fireEvent.click(screen.getByRole("button", { name: `Visit ${service}` }));
			expect(
				within(screen.getByRole("dialog", { name: service })).getByText(
					quotes[quotes.length - 1],
				),
			).toBeInTheDocument();
		} finally {
			random.mockRestore();
		}
	});
	it("buys one potion and renders the updated inventory and gold", async () => {
		const run = createTownRun();
		const cost = selectTownView(run.state)!.healingPotionCost;
		const { getRun } = setup(run);
		fireEvent.click(screen.getByRole("button", { name: "Visit Alchemist" }));
		const dialog = screen.getByRole("dialog", { name: "Alchemist" });
		const quote = ALCHEMIST_QUOTES.find((line) => within(dialog).queryByText(line));
		expect(quote).toBeDefined();
		expect(
			within(dialog).queryByRole("button", { name: "Buy maximum healing potions" }),
		).not.toBeInTheDocument();
		fireEvent.click(within(dialog).getByRole("button", { name: "Buy one healing potion" }));
		await waitFor(() => expect(within(dialog).getByText("2/3 potions")).toBeInTheDocument());
		expect(within(dialog).getByText(quote!)).toBeInTheDocument();
		expect(within(dialog).getByLabelText(`${run.state.gold - cost} gold`)).toBeInTheDocument();
		expect(getRun().state.hero.healingPotions).toBe(2);
		expect(applyRunAction).toHaveBeenCalledExactlyOnceWith({
			runId: run.id,
			action: { type: "BUY_CONSUMABLE", consumableType: "healingPotion" },
		});
	});
	it("disables purchases after the final slot is filled while keeping visits available", async () => {
		const run = createTownRun();
		run.state.hero.healingPotions = 2;
		setup(run);
		fireEvent.click(screen.getByRole("button", { name: "Visit Alchemist" }));
		const dialog = screen.getByRole("dialog");
		fireEvent.click(within(dialog).getByRole("button", { name: "Buy one healing potion" }));
		await waitFor(() => expect(within(dialog).getByText("3/3 MAX")).toBeInTheDocument());
		expect(
			within(dialog).getByRole("button", { name: "Buy one healing potion" }),
		).toBeDisabled();
		fireEvent.click(within(dialog).getByRole("button", { name: "Close" }));
		expect(screen.getByRole("button", { name: "Visit Alchemist" })).toBeEnabled();
	});
	it("rests at full health to restore skill uses, then reflects full recovery", async () => {
		const run = createTownRun();
		run.state.hero.skills[0].chargesRemaining = 0;
		expect(selectTownView(run.state)!.isFullyHealed).toBe(true);
		const cost = selectTownView(run.state)!.restCost;
		const { getRun } = setup(run);
		fireEvent.click(screen.getByRole("button", { name: "Visit Tavern" }));
		fireEvent.click(screen.getByRole("button", { name: "Buy rest" }));
		await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
		expect(getRun().state.hero.skills[0].chargesRemaining).toBeGreaterThan(0);
		expect(getRun().state.gold).toBe(run.state.gold - cost);
		expect(getRun().state.day).toBe(run.state.day + 1);
		expect(screen.getByRole("article", { name: "Tavern" })).toHaveTextContent("Rested");
		fireEvent.click(screen.getByRole("button", { name: "Visit Tavern" }));
		expect(screen.getByRole("button", { name: "Buy rest" })).toBeDisabled();
	});
	it.each([
		{ service: "Tavern", action: "Buy rest" },
		{ service: "Alchemist", action: "Buy one healing potion" },
	])("allows visiting $service without gold but prevents purchasing", ({ service, action }) => {
		const run = createTownRun();
		run.state.gold = 0;
		run.state.hero.currentHp = 1;
		setup(run);
		fireEvent.click(screen.getByRole("button", { name: `Visit ${service}` }));
		const dialog = screen.getByRole("dialog", { name: service });
		expect(within(dialog).getByRole("button", { name: action })).toBeDisabled();
		expect(within(dialog).getByText(/Not enough gold/)).toBeInTheDocument();
		expect(applyRunAction).not.toHaveBeenCalled();
	});

	it("opens the shop with its own navigation and returns to town", () => {
		setup();
		expect(screen.getByRole("navigation", { name: "Game navigation" })).toBeInTheDocument();
		expect(screen.getByRole("region", { name: "World Log" })).toBeInTheDocument();
		fireEvent.click(screen.getByRole("button", { name: "How to play" }));
		expect(useHowToPlayModalStore.getState().isOpen).toBe(true);
		fireEvent.click(screen.getByRole("button", { name: "Visit Shop" }));
		expect(screen.queryByRole("region", { name: "World Log" })).not.toBeInTheDocument();
		expect(screen.queryByRole("link", { name: "Home" })).not.toBeInTheDocument();
		expect(screen.queryByRole("button", { name: "How to play" })).not.toBeInTheDocument();
		expect(screen.getByRole("button", { name: "Reroll shop" })).toBeInTheDocument();
		fireEvent.click(screen.getByRole("button", { name: "Back to town" }));
		expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
		expect(screen.getByRole("button", { name: "Visit Tavern" })).toBeInTheDocument();
	});
	it("shows a fallback outside town", () => {
		const run = createTownRun();
		run.state = createInitialRunState({
			runId: run.id,
			seed: "outside-town",
			heroName: "Mira",
			classId: "warrior",
		}).state;
		setup(run);
		expect(screen.getByText("Town state is unavailable.")).toBeInTheDocument();
	});
	it("blocks purchase and dismissal while a request is pending", async () => {
		setup();
		vi.mocked(applyRunAction).mockImplementation(() => new Promise(() => {}));
		fireEvent.click(screen.getByRole("button", { name: "Visit Alchemist" }));
		const buy = screen.getByRole("button", { name: "Buy one healing potion" });
		fireEvent.click(buy);
		await waitFor(() => expect(buy).toBeDisabled());
		expect(screen.getByRole("button", { name: "Close" })).toBeDisabled();
		fireEvent.keyDown(screen.getByRole("dialog"), { key: "Escape" });
		expect(screen.getByRole("dialog", { name: "Alchemist" })).toBeInTheDocument();
		expect(applyRunAction).toHaveBeenCalledTimes(1);
	});
	it("waits for a successful rest response before closing the tavern", async () => {
		const run = createTownRun();
		run.state.hero.currentHp = 1;
		setup(run);
		let complete!: (response: ApplyRunActionResponse) => void;
		vi.mocked(applyRunAction).mockReturnValueOnce(
			new Promise((resolve) => {
				complete = resolve;
			}),
		);
		fireEvent.click(screen.getByRole("button", { name: "Visit Tavern" }));
		const dialog = screen.getByRole("dialog", { name: "Tavern" });
		const buy = within(dialog).getByRole("button", { name: "Buy rest" });
		fireEvent.click(buy);
		await waitFor(() => expect(buy).toBeDisabled());
		expect(dialog).toBeInTheDocument();
		const result = applyAction(run.state, { type: "REST_AT_TOWN" });
		expect(result.ok).toBe(true);
		await act(async () => {
			complete({ run: { ...run, state: result.state }, result, unlockedAchievements: [] });
		});
		await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
	});
	it("reports engine and transport errors without closing the tavern", async () => {
		const run = createTownRun();
		run.state.hero.currentHp = 1;
		setup(run);
		vi.mocked(applyRunAction).mockResolvedValueOnce({
			run,
			result: { ok: false, error: "NOT_ENOUGH_GOLD", state: run.state, events: [] },
			unlockedAchievements: [],
		});
		fireEvent.click(screen.getByRole("button", { name: "Visit Tavern" }));
		fireEvent.click(screen.getByRole("button", { name: "Buy rest" }));
		await waitFor(() =>
			expect(useErrorModalStore.getState().message).toBe("You do not have enough gold."),
		);
		expect(screen.getByRole("dialog", { name: "Tavern" })).toBeInTheDocument();
		await waitFor(() => expect(screen.getByRole("button", { name: "Buy rest" })).toBeEnabled());
		vi.mocked(applyRunAction).mockRejectedValueOnce(new Error("offline"));
		fireEvent.click(screen.getByRole("button", { name: "Buy rest" }));
		await waitFor(() =>
			expect(useErrorModalStore.getState().message).toBe("Unable to rest. Please try again."),
		);
		expect(screen.getByRole("dialog", { name: "Tavern" })).toBeInTheDocument();
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
		fireEvent.click(screen.getByRole("button", { name: "Visit Shop" }));
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
		fireEvent.click(screen.getByRole("button", { name: "Visit Shop" }));
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
		await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
		expect(applyRunAction).toHaveBeenCalledWith({
			runId: run.id,
			action: {
				type: "BUY_ITEM",
				shopSlotId: slot.id,
				equipmentSlot: slot.equipmentPlacement.destinations[0].equipmentSlot,
			},
		});
	});
	it("disables reroll and marks its price when the engine does not offer it", () => {
		const run = createTownRun();
		run.state.gold = 0;
		const cost = selectTownView(run.state)!.rerollCost;
		setup(run);
		fireEvent.click(screen.getByRole("button", { name: "Visit Shop" }));
		const navigation = screen.getByRole("navigation", { name: "Game navigation" });
		expect(within(navigation).getByRole("button", { name: "Reroll shop" })).toBeDisabled();
		expect(within(navigation).getByText(`${cost}g`)).toHaveClass("text-error");
		expect(applyRunAction).not.toHaveBeenCalled();
	});
	it("preserves a locked item when rerolling the shop", async () => {
		const run = createTownRun();
		run.state.gold = 10000;
		const slot = selectTownView(run.state)!.shopSlots[0];
		const { getRun } = setup(run);
		fireEvent.click(screen.getByRole("button", { name: "Visit Shop" }));
		fireEvent.click(screen.getByRole("button", { name: `Lock ${slot.item.name}` }));
		await waitFor(() =>
			expect(getRun().state.shopLocks.some((lock) => lock.id === slot.id)).toBe(true),
		);
		const reroll = screen.getByRole("button", { name: "Reroll shop" });
		await waitFor(() => expect(reroll).toBeEnabled());
		fireEvent.click(reroll);
		await waitFor(() => expect(getRun().state.town!.rerollCount).toBe(1));
		expect(getRun().state.town!.shopSlots).toContainEqual(
			run.state.town!.shopSlots.find((item) => item.id === slot.id),
		);
		fireEvent.click(screen.getByRole("button", { name: "Back to town" }));
		expect(screen.getByRole("article", { name: "Shop" })).toHaveTextContent("Viewed");
	});
	it("continues from town into combat", async () => {
		const { getRun } = setup();
		fireEvent.click(screen.getByRole("button", { name: "Continue" }));
		await waitFor(() => expect(getRun().state.phase).toBe("combat"));
		expect(applyRunAction).toHaveBeenCalledWith({
			runId: "run-id",
			action: { type: "ENTER_COMBAT" },
		});
	});
	it("opens the hero drawer and swaps equipped weapons", async () => {
		const run = createTownRun();
		const mainHand = run.state.hero.equipment.mainHand;
		if (!mainHand) {
			throw new Error("Expected a warrior weapon");
		}
		run.state.hero.equipment.offHand = { ...structuredClone(mainHand), instanceId: "off-hand" };
		const { getRun } = setup(run);
		fireEvent.click(screen.getByRole("button", { name: "Hero" }));
		const drawer = screen.getByRole("dialog", { name: "Hero details" });
		fireEvent.mouseDown(within(drawer).getByRole("tab", { name: "Equipment" }), {
			button: 0,
			ctrlKey: false,
		});
		fireEvent.click(within(drawer).getByRole("button", { name: "Swap Weapons" }));
		await waitFor(() =>
			expect(getRun().state.hero.equipment.mainHand?.instanceId).toBe("off-hand"),
		);
		expect(applyRunAction).toHaveBeenCalledWith({
			runId: run.id,
			action: { type: "SWAP_HAND_WEAPONS" },
		});
	});
});
