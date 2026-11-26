import { fireEvent, render, screen, within } from "@testing-library/react";
import { skills, type Effect } from "@app/content";
import { describe, expect, it } from "vitest";
import { StructuredValue } from "./StructuredValue";

const skill = (id: string) => skills.find((entry) => entry.id === id)!;

describe("effect behaviour view", () => {
	it("groups both Ravage consequences under one shared save without gating weapon damage", () => {
		render(<StructuredValue value={skill("ravage").effects} field="effects" />);
		const trigger = screen.getByRole("region", { name: "On hit" });
		const save = within(trigger).getByRole("region", { name: "Constitution saving throw" });
		const failed = within(save).getByRole("group", { name: "On failed save" });
		expect(within(failed).getByText("Slashing vulnerability")).toBeInTheDocument();
		expect(within(failed).getByText("Slashing damage over time")).toBeInTheDocument();
		expect(within(failed).getAllByText("2 turns")).toHaveLength(2);
		expect(
			within(failed).getByText("1d4 physical slashing damage per turn."),
		).toBeInTheDocument();
		expect(within(save).getByText("One save for all consequences below.")).toBeInTheDocument();
		expect(
			within(save).getByText("No effect — prevents all consequences above."),
		).toBeInTheDocument();
		expect(
			within(save).queryByText("1× weapon damage, converted to slashing."),
		).not.toBeInTheDocument();
		expect(screen.getByText("1× weapon damage, converted to slashing.")).toBeInTheDocument();
		const details = within(save).getByText("Saving throw details");
		fireEvent.click(details);
		expect(details.closest("details")).toHaveAttribute("open");
		const raw = JSON.parse(details.closest("details")!.querySelector("pre")!.textContent!);
		expect(raw.dc).toEqual({
			base: 8,
			attribute: "strength",
			includeProficiency: true,
			bonus: 0,
		});
	});

	it("keeps separate saves separate even when their attributes and DCs match", () => {
		render(<StructuredValue value={skill("acid_trap").effects} field="effects" />);
		const saves = screen.getAllByRole("region", { name: /saving throw$/ });
		expect(saves).toHaveLength(4);
		expect(
			saves.map(
				(save) => within(save).getByRole("group", { name: "On failed save" }).textContent,
			),
		).toEqual([
			expect.stringContaining("2d8 physical piercing damage."),
			expect.stringContaining("2d8 other acid damage."),
			expect.stringContaining("Apply stunned."),
			expect.stringContaining("Grant vulnerability to acid damage."),
		]);
		expect(screen.getAllByText("Half damage.")).toHaveLength(2);
		expect(screen.getAllByText("No effect.")).toHaveLength(2);
	});

	it("keeps a consequence's own save inside the rider's shared save", () => {
		const effect: Effect = {
			type: "attackDamage",
			target: "enemy",
			multiplier: 1,
			attackRiders: [
				{
					timing: "onCrit",
					save: {
						attribute: "constitution",
						dc: { base: 8, bonus: 0, includeProficiency: true },
						onSuccess: "noEffect",
					},
					effects: [
						{
							type: "applyStatus",
							target: "enemy",
							statusId: "stunned",
							duration: { unit: "turns", value: 1 },
							save: {
								attribute: "wisdom",
								dc: { base: 8, bonus: 0, includeProficiency: false },
								onSuccess: "noEffect",
							},
						},
					],
				},
			],
		};
		render(<StructuredValue value={[effect]} field="effects" />);
		const trigger = screen.getByRole("region", { name: "On critical hit" });
		const shared = within(trigger).getByRole("region", { name: "Constitution saving throw" });
		const consequence = within(shared).getAllByRole("group", { name: "On failed save" })[0]!;
		expect(
			within(consequence).getByRole("region", { name: "Wisdom saving throw" }),
		).toBeInTheDocument();
		expect(screen.getByText("1 turn")).toBeInTheDocument();
	});

	it("retains extra authored fields alongside the behaviour summary", () => {
		const authored = [
			{ type: "heal", target: "self", percent: 0.25, reviewerNote: "Keep this" },
		];
		render(<StructuredValue value={authored} field="effects" />);
		expect(screen.getByText("Restore 25% of maximum HP.")).toBeInTheDocument();
		expect(JSON.parse(screen.getByText(/"reviewerNote"/).textContent!)).toEqual(authored[0]);
	});

	it("shows unfamiliar effect structures without hiding their fields", () => {
		render(
			<StructuredValue
				value={[{ type: "futureEffect", condition: "Keep visible", amount: 0 }]}
				field="effects"
			/>,
		);
		expect(screen.getByText("Future Effect")).toBeInTheDocument();
		expect(screen.getByText("Keep visible")).toBeInTheDocument();
		expect(screen.getByText("0")).toBeInTheDocument();
	});
});
