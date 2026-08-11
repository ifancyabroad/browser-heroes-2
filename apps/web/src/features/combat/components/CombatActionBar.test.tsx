import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { CombatantState } from "@app/engine";
import type { ComponentProps } from "react";

vi.mock("../../../components/Tooltip", () => ({
	Tooltip: ({ children }: { children: React.ReactNode }) => children,
}));

import { CombatActionBar } from "./CombatActionBar";

type CombatActionBarProps = ComponentProps<typeof CombatActionBar>;

function createProps(overrides: Partial<CombatActionBarProps> = {}): CombatActionBarProps {
	return {
		player: {
			basicAttack: { name: "Longsword" },
			skills: [],
			currentHp: 8,
			maxHp: 10,
		} as unknown as CombatantState,
		isPending: false,
		canBasicAttack: true,
		canSkipTurn: true,
		canUseHealingPotion: true,
		availableSkillIds: new Set(),
		healingPotions: 2,
		maxHealingPotions: 3,
		canContinue: false,
		canReturnToTown: false,
		isEnemySlain: false,
		onBasicAttack: vi.fn(),
		onSkipTurn: vi.fn(),
		onUseHealingPotion: vi.fn(),
		onUseSkill: vi.fn(),
		onContinue: vi.fn(),
		onReturnToTown: vi.fn(),
		...overrides,
	};
}

describe("CombatActionBar", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("invokes available combat actions", () => {
		const props = createProps();
		render(<CombatActionBar {...props} />);

		fireEvent.click(screen.getByRole("button", { name: "Basic attack: Longsword" }));
		fireEvent.click(screen.getByRole("button", { name: "Skip turn" }));
		fireEvent.click(screen.getByRole("button", { name: "Use health potion" }));

		expect(props.onBasicAttack).toHaveBeenCalledOnce();
		expect(props.onSkipTurn).toHaveBeenCalledOnce();
		expect(props.onUseHealingPotion).toHaveBeenCalledOnce();
		expect(
			screen.queryByRole("button", { name: "Continue to next battle" }),
		).not.toBeInTheDocument();
		expect(screen.queryByRole("button", { name: "Return to town" })).not.toBeInTheDocument();

		const buttons = screen.getAllByRole("button");
		expect(buttons.at(-2)).toHaveAccessibleName("Use health potion");
		expect(buttons.at(-1)).toHaveAccessibleName("Skip turn");
	});

	it("does not invoke unavailable actions", () => {
		const props = createProps({
			canBasicAttack: false,
			canSkipTurn: false,
			canUseHealingPotion: false,
		});
		render(<CombatActionBar {...props} />);

		fireEvent.click(screen.getByRole("button", { name: "Basic attack: Longsword" }));
		fireEvent.click(screen.getByRole("button", { name: "Skip turn" }));
		fireEvent.click(screen.getByRole("button", { name: "Use health potion" }));

		expect(props.onBasicAttack).not.toHaveBeenCalled();
		expect(props.onSkipTurn).not.toHaveBeenCalled();
		expect(props.onUseHealingPotion).not.toHaveBeenCalled();
	});

	it("blocks every action while a request is pending", () => {
		const props = createProps({
			isPending: true,
			canContinue: true,
			canReturnToTown: true,
		});
		render(<CombatActionBar {...props} />);

		for (const button of screen.getAllByRole("button")) {
			expect(button).toHaveAttribute("aria-disabled", "true");
			fireEvent.click(button);
		}
		expect(props.onBasicAttack).not.toHaveBeenCalled();
		expect(props.onContinue).not.toHaveBeenCalled();
		expect(props.onReturnToTown).not.toHaveBeenCalled();
	});

	it("enables post-combat run actions independently", () => {
		const props = createProps({ canContinue: true, canReturnToTown: true, isEnemySlain: true });
		render(<CombatActionBar {...props} />);

		fireEvent.click(screen.getByRole("button", { name: "Continue to next battle" }));
		fireEvent.click(screen.getByRole("button", { name: "Return to town" }));

		expect(props.onContinue).toHaveBeenCalledOnce();
		expect(props.onReturnToTown).toHaveBeenCalledOnce();
		expect(
			screen.queryByRole("button", { name: "Basic attack: Longsword" }),
		).not.toBeInTheDocument();
		expect(screen.queryByRole("button", { name: "Skip turn" })).not.toBeInTheDocument();

		const buttons = screen.getAllByRole("button");
		expect(buttons[0]).toHaveAccessibleName("Continue to next battle");
		expect(buttons[1]).toHaveAccessibleName("Return to town");
	});

	it("renders potion inventory accessibly", () => {
		render(<CombatActionBar {...createProps({ healingPotions: 1, maxHealingPotions: 4 })} />);

		expect(screen.getByRole("button", { name: "Use health potion" })).toHaveTextContent("1/4");
	});

	it("forwards available skill ids", () => {
		const onUseSkill = vi.fn();
		const player = {
			...createProps().player,
			skills: [{ skillId: "heavy_strike", chargesRemaining: 1 }],
		} as CombatantState;
		render(
			<CombatActionBar
				{...createProps({
					player,
					availableSkillIds: new Set(["heavy_strike"]),
					onUseSkill,
				})}
			/>,
		);

		fireEvent.click(screen.getByRole("button", { name: "Use Heavy Strike" }));

		expect(onUseSkill).toHaveBeenCalledWith("heavy_strike");
	});
});
