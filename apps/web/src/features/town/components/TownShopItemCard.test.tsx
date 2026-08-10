import { fireEvent, render, screen } from "@testing-library/react";
import { selectItemDefinition, type TownShopSlotView } from "@app/engine";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { TooltipProvider } from "../../../components/Tooltip";
import { TownShopItemCard } from "./TownShopItemCard";

const item = selectItemDefinition({
	instanceId: "shop-item",
	type: "static",
	itemId: "acid_edge",
});

if (!item) {
	throw new Error("Expected test item definition");
}

const testItem = item;

function createSlot(locked: boolean, overrides: Partial<TownShopSlotView> = {}): TownShopSlotView {
	return {
		id: "shop-slot",
		item: testItem,
		price: 100,
		purchased: false,
		locked,
		canAfford: true,
		equipmentPlacement: {
			destinations: [],
			automaticDestination: { equipmentSlot: "mainHand", replacedItems: [] },
		},
		...overrides,
	};
}

describe("TownShopItemCard", () => {
	beforeEach(() => {
		Object.defineProperty(window, "matchMedia", {
			configurable: true,
			value: vi.fn().mockReturnValue({
				matches: false,
				addEventListener: vi.fn(),
				removeEventListener: vi.fn(),
			}),
		});
	});

	it("exposes accessible lock and unlock controls", () => {
		const onLockChange = vi.fn();
		const { rerender } = render(
			<TownShopItemCard
				slot={createSlot(false)}
				isPending={false}
				onBuy={vi.fn()}
				onLockChange={onLockChange}
			/>,
		);

		const lockButton = screen.getByRole("button", { name: `Lock ${testItem.name}` });
		expect(lockButton).toHaveAttribute("aria-pressed", "false");
		fireEvent.click(lockButton);
		expect(onLockChange).toHaveBeenCalledWith(true);

		rerender(
			<TownShopItemCard
				slot={createSlot(true)}
				isPending={false}
				onBuy={vi.fn()}
				onLockChange={onLockChange}
			/>,
		);
		const unlockButton = screen.getByRole("button", {
			name: `Unlock ${testItem.name}`,
		});
		expect(unlockButton).toHaveAttribute("aria-pressed", "true");
		expect(unlockButton).toHaveClass(
			"aria-pressed:bg-primary",
			"aria-pressed:text-primary-contrast",
		);
	});

	it("blocks lock changes while an action is pending", () => {
		render(
			<TownShopItemCard
				slot={createSlot(false)}
				isPending
				onBuy={vi.fn()}
				onLockChange={vi.fn()}
			/>,
		);

		expect(screen.getByRole("button", { name: `Lock ${testItem.name}` })).toBeDisabled();
	});

	it("shows the price separately from the buy action", () => {
		render(
			<TownShopItemCard
				slot={createSlot(false)}
				isPending={false}
				onBuy={vi.fn()}
				onLockChange={vi.fn()}
			/>,
		);

		expect(
			screen.getByRole("button", { name: `Buy ${testItem.name} for 100 gold` }),
		).toHaveTextContent("Buy");
		expect(screen.getAllByText("100g").length).toBeGreaterThan(0);
	});

	it("shows weapon attack riders beneath the item effects", () => {
		render(
			<TownShopItemCard
				slot={createSlot(false)}
				isPending={false}
				onBuy={vi.fn()}
				onLockChange={vi.fn()}
			/>,
		);

		expect(screen.getByText("On hit")).toBeInTheDocument();
	});

	it("only describes equipped items that would be replaced", () => {
		const { rerender } = render(
			<TooltipProvider>
				<TownShopItemCard
					slot={createSlot(false)}
					isPending={false}
					onBuy={vi.fn()}
					onLockChange={vi.fn()}
				/>
			</TooltipProvider>,
		);

		expect(screen.queryByText("Replaces:")).not.toBeInTheDocument();

		rerender(
			<TooltipProvider>
				<TownShopItemCard
					slot={createSlot(false, {
						equipmentPlacement: {
							destinations: [
								{
									equipmentSlot: "mainHand",
									replacedItems: [
										{
											instanceId: "equipped-item",
											type: "static",
											itemId: "acid_edge",
										},
									],
								},
							],
							automaticDestination: null,
						},
					})}
					isPending={false}
					onBuy={vi.fn()}
					onLockChange={vi.fn()}
				/>
			</TooltipProvider>,
		);

		expect(screen.getAllByText("Replaces:")).toHaveLength(2);
	});
});
