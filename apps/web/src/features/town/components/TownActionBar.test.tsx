import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("../../../components/Tooltip", () => ({
	Tooltip: ({ children }: { children: React.ReactNode }) => children,
}));

import { TownActionBar } from "./TownActionBar";

function createProps(overrides = {}) {
	return {
		isPending: false,
		canAffordRest: true,
		canRest: true,
		canAffordReroll: true,
		canReroll: true,
		canAffordHealingPotion: true,
		canBuyHealingPotion: true,
		canEnterCombat: true,
		restCost: 10,
		rerollCost: 5,
		healingPotions: 1,
		maxHealingPotions: 3,
		healingPotionCost: 8,
		onRest: vi.fn(),
		onReroll: vi.fn(),
		onBuyHealingPotion: vi.fn(),
		onEnterCombat: vi.fn(),
		...overrides,
	};
}

describe("TownActionBar", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("displays action costs", () => {
		render(<TownActionBar {...createProps()} />);

		expect(screen.getByRole("button", { name: "Reroll shop for 5 gold" })).toHaveTextContent(
			"5g",
		);
		expect(screen.getByRole("button", { name: "Rest for 10 gold" })).toHaveTextContent("10g");
		expect(
			screen.getByRole("button", {
				name: "Buy healing potion for 8 gold. 1 of 3 carried",
			}),
		).toHaveTextContent("1/3");
	});

	it.each([
		{ healingPotions: 0, expectedClass: "text-error" },
		{ healingPotions: 1, expectedClass: "text-text-bright" },
		{ healingPotions: 3, expectedClass: "text-primary" },
	])(
		"styles the $healingPotions/3 potion counter with $expectedClass",
		({ healingPotions, expectedClass }) => {
			render(<TownActionBar {...createProps({ healingPotions })} />);

			expect(screen.getByText(`${healingPotions}/3`)).toHaveClass(expectedClass);
		},
	);

	it("invokes every available town action", () => {
		const props = createProps();
		render(<TownActionBar {...props} />);

		fireEvent.click(screen.getByRole("button", { name: "Reroll shop for 5 gold" }));
		fireEvent.click(
			screen.getByRole("button", {
				name: "Buy healing potion for 8 gold. 1 of 3 carried",
			}),
		);
		fireEvent.click(screen.getByRole("button", { name: "Rest for 10 gold" }));
		fireEvent.click(screen.getByRole("button", { name: "Enter battle" }));

		expect(props.onReroll).toHaveBeenCalledOnce();
		expect(props.onBuyHealingPotion).toHaveBeenCalledOnce();
		expect(props.onRest).toHaveBeenCalledOnce();
		expect(props.onEnterCombat).toHaveBeenCalledOnce();
	});

	it("does not invoke unavailable actions", () => {
		const props = createProps({
			canRest: false,
			canReroll: false,
			canBuyHealingPotion: false,
			canEnterCombat: false,
		});
		render(<TownActionBar {...props} />);

		for (const button of screen.getAllByRole("button")) {
			fireEvent.click(button);
		}

		expect(props.onReroll).not.toHaveBeenCalled();
		expect(props.onBuyHealingPotion).not.toHaveBeenCalled();
		expect(props.onRest).not.toHaveBeenCalled();
		expect(props.onEnterCombat).not.toHaveBeenCalled();
	});

	it("blocks every action while a request is pending", () => {
		const props = createProps({ isPending: true });
		render(<TownActionBar {...props} />);

		for (const button of screen.getAllByRole("button")) {
			expect(button).toHaveAttribute("aria-disabled", "true");
			fireEvent.click(button);
		}
		expect(props.onReroll).not.toHaveBeenCalled();
		expect(props.onEnterCombat).not.toHaveBeenCalled();
	});
});
