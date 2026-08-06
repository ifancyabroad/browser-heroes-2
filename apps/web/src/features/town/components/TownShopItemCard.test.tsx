import { fireEvent, render, screen } from "@testing-library/react";
import { selectItemDefinition, type TownShopSlotView } from "@app/engine";
import { beforeEach, describe, expect, it, vi } from "vitest";
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

function createSlot(locked: boolean): TownShopSlotView {
	return {
		id: "shop-slot",
		item: testItem,
		price: 100,
		purchased: false,
		locked,
		canAfford: true,
		destinations: [],
		requiresEquipmentSlotSelection: false,
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

		const lockButtons = screen.getAllByRole("button", { name: `Lock ${testItem.name}` });
		expect(lockButtons[0]).toHaveAttribute("aria-pressed", "false");
		fireEvent.click(lockButtons[0]);
		expect(onLockChange).toHaveBeenCalledWith(true);

		rerender(
			<TownShopItemCard
				slot={createSlot(true)}
				isPending={false}
				onBuy={vi.fn()}
				onLockChange={onLockChange}
			/>,
		);
		const unlockButton = screen.getAllByRole("button", {
			name: `Unlock ${testItem.name}`,
		})[0];
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

		for (const button of screen.getAllByRole("button", { name: `Lock ${testItem.name}` })) {
			expect(button).toBeDisabled();
		}
	});
});
