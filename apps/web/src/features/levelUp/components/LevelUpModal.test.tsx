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
vi.mock("./LevelUpOptionList", () => ({
	LevelUpOptionList: ({
		disabled,
		onSelect,
	}: {
		disabled: boolean;
		onSelect: (selection: unknown) => void;
	}) => (
		<button
			disabled={disabled}
			onClick={() => onSelect({ type: "skill", skillId: "heavy_strike" })}
		>
			Select option
		</button>
	),
}));

import { LevelUpModal } from "./LevelUpModal";

describe("LevelUpModal", () => {
	it("continues immediately when the level has no selection options", () => {
		const onConfirm = vi.fn();
		render(
			<LevelUpModal
				pendingLevelUp={{ level: 2, hpGain: 5, options: [] }}
				isPending={false}
				onConfirm={onConfirm}
			/>,
		);

		fireEvent.click(screen.getByRole("button", { name: "Continue" }));

		expect(onConfirm).toHaveBeenCalledWith(null);
	});

	it("requires a choice when options are available", () => {
		render(
			<LevelUpModal
				pendingLevelUp={
					{
						level: 2,
						hpGain: 5,
						options: [{ type: "skill", skillId: "heavy_strike" }],
					} as never
				}
				isPending={false}
				onConfirm={vi.fn()}
			/>,
		);

		expect(screen.getByRole("button", { name: "Confirm" })).toBeDisabled();
		expect(screen.getByText("Select a skill to learn before continuing.")).toBeInTheDocument();
	});

	it("submits the selected level-up choice", () => {
		const onConfirm = vi.fn();
		render(
			<LevelUpModal
				pendingLevelUp={
					{
						level: 2,
						hpGain: 5,
						options: [{ type: "skill", skillId: "heavy_strike" }],
					} as never
				}
				isPending={false}
				onConfirm={onConfirm}
			/>,
		);

		fireEvent.click(screen.getByRole("button", { name: "Select option" }));
		fireEvent.click(screen.getByRole("button", { name: "Confirm" }));

		expect(onConfirm).toHaveBeenCalledWith({ type: "skill", skillId: "heavy_strike" });
	});

	it("blocks selection and confirmation while pending", () => {
		render(
			<LevelUpModal
				pendingLevelUp={
					{
						level: 2,
						hpGain: 5,
						options: [{ type: "skill", skillId: "heavy_strike" }],
					} as never
				}
				isPending
				onConfirm={vi.fn()}
			/>,
		);

		expect(screen.getByRole("button", { name: "Select option" })).toBeDisabled();
		expect(screen.getByRole("button", { name: "Confirm" })).toBeDisabled();
	});
});
