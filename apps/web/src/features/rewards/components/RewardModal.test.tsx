import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("../../../components/Modal", () => ({
	Modal: ({
		title,
		children,
		footer,
	}: {
		title: string;
		children: React.ReactNode;
		footer: React.ReactNode;
	}) => (
		<div role="dialog" aria-label={title}>
			{children}
			{footer}
		</div>
	),
}));
vi.mock("./RewardOptionList", () => ({
	RewardOptionList: ({
		options,
		disabled,
		onSelect,
	}: {
		options: unknown[];
		disabled: boolean;
		onSelect: (option: unknown) => void;
	}) => (
		<div>
			{options.map((option, index) => (
				<button key={index} disabled={disabled} onClick={() => onSelect(option)}>
					Select {index}
				</button>
			))}
		</div>
	),
}));

import { RewardModal } from "./RewardModal";

const gold = { type: "gold" as const, optionIndex: 0, amount: 10 };
const replacement = {
	type: "item" as const,
	optionIndex: 1,
	item: { id: "item-id" },
	destinations: ["mainHand"],
	requiresEquipmentSlotSelection: true,
};

describe("RewardModal", () => {
	it("requires a selection before confirmation", () => {
		render(
			<RewardModal
				rewardChoice={{ options: [gold] }}
				isPending={false}
				onConfirm={vi.fn()}
				onChooseReplacement={vi.fn()}
			/>,
		);

		expect(screen.getByRole("button", { name: "Confirm" })).toBeDisabled();
	});

	it("submits ordinary rewards by option index", () => {
		const onConfirm = vi.fn();
		render(
			<RewardModal
				rewardChoice={{ options: [gold] }}
				isPending={false}
				onConfirm={onConfirm}
				onChooseReplacement={vi.fn()}
			/>,
		);

		fireEvent.click(screen.getByRole("button", { name: "Select 0" }));
		fireEvent.click(screen.getByRole("button", { name: "Confirm" }));

		expect(onConfirm).toHaveBeenCalledWith({ optionIndex: 0 });
	});

	it("routes replacement items to destination selection", () => {
		const onChooseReplacement = vi.fn();
		render(
			<RewardModal
				rewardChoice={{ options: [replacement] } as never}
				isPending={false}
				onConfirm={vi.fn()}
				onChooseReplacement={onChooseReplacement}
			/>,
		);

		fireEvent.click(screen.getByRole("button", { name: "Select 0" }));
		fireEvent.click(screen.getByRole("button", { name: "Confirm" }));

		expect(onChooseReplacement).toHaveBeenCalledWith(replacement);
	});

	it("disables selection and confirmation while pending", () => {
		render(
			<RewardModal
				rewardChoice={{ options: [gold] }}
				isPending
				onConfirm={vi.fn()}
				onChooseReplacement={vi.fn()}
			/>,
		);

		expect(screen.getByRole("button", { name: "Select 0" })).toBeDisabled();
		expect(screen.getByRole("button", { name: "Confirm" })).toBeDisabled();
	});
});
