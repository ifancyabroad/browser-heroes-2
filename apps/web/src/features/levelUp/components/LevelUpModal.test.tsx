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
				pendingLevelUp={{ level: 2, hpGain: 5, rerollIndex: 0, options: [] }}
				isPending={false}
				levelUpRerolls={5}
				canReroll={false}
				onConfirm={onConfirm}
				onReroll={vi.fn()}
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
				levelUpRerolls={5}
				canReroll
				onConfirm={vi.fn()}
				onReroll={vi.fn()}
			/>,
		);

		expect(screen.getByRole("button", { name: "Confirm" })).toBeDisabled();
		expect(screen.getByText("Choose a skill to learn.")).toBeInTheDocument();
	});

	it("identifies feat choices as passive", () => {
		render(
			<LevelUpModal
				pendingLevelUp={
					{
						level: 3,
						hpGain: 5,
						options: [{ type: "feat", featId: "juggernaut" }],
					} as never
				}
				isPending={false}
				levelUpRerolls={5}
				canReroll
				onConfirm={vi.fn()}
				onReroll={vi.fn()}
			/>,
		);

		expect(screen.getByText("Choose a passive feat.")).toBeInTheDocument();
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
				levelUpRerolls={5}
				canReroll
				onConfirm={onConfirm}
				onReroll={vi.fn()}
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
				levelUpRerolls={5}
				canReroll
				onConfirm={vi.fn()}
				onReroll={vi.fn()}
			/>,
		);

		expect(screen.getByRole("button", { name: "Select option" })).toBeDisabled();
		expect(screen.getByRole("button", { name: "Confirm" })).toBeDisabled();
		expect(
			screen.getByRole("button", { name: "Reroll level-up choices. 5 remaining" }),
		).toBeDisabled();
	});

	it("submits an available reroll", () => {
		const onReroll = vi.fn();
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
				levelUpRerolls={5}
				canReroll
				onConfirm={vi.fn()}
				onReroll={onReroll}
			/>,
		);

		fireEvent.click(
			screen.getByRole("button", { name: "Reroll level-up choices. 5 remaining" }),
		);

		expect(onReroll).toHaveBeenCalledOnce();
	});

	it("clears the selected choice when a reroll replaces the options", () => {
		const props = {
			isPending: false,
			levelUpRerolls: 5,
			canReroll: true,
			onConfirm: vi.fn(),
			onReroll: vi.fn(),
		};
		const { rerender } = render(
			<LevelUpModal
				{...props}
				pendingLevelUp={
					{
						level: 2,
						hpGain: 5,
						options: [{ type: "skill", skillId: "heavy_strike" }],
					} as never
				}
			/>,
		);

		fireEvent.click(screen.getByRole("button", { name: "Select option" }));
		expect(screen.getByRole("button", { name: "Confirm" })).toBeEnabled();

		rerender(
			<LevelUpModal
				{...props}
				levelUpRerolls={4}
				pendingLevelUp={
					{
						level: 2,
						hpGain: 5,
						options: [{ type: "skill", skillId: "fireball" }],
					} as never
				}
			/>,
		);

		expect(screen.getByRole("button", { name: "Confirm" })).toBeDisabled();
	});
});
