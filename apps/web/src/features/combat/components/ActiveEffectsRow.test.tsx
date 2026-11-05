import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { ReactNode } from "react";
import type { ActiveCombatEffect } from "@app/engine";
import { ActiveEffectsRow } from "./ActiveEffectsRow";

vi.mock("../../../components/Tooltip", () => ({
	Tooltip: ({ children, content }: { children: ReactNode; content: ReactNode }) => (
		<>
			{children}
			{content}
		</>
	),
}));

const rollEffect: ActiveCombatEffect = {
	id: "roll",
	type: "modifyRoll",
	sourceCombatantId: "player",
	sourceSide: "player",
	source: {
		type: "skill",
		skillId: "focus_energy",
		sourceName: "Focus Energy",
		sourceEffectKey: "effect:0",
	},
	duration: { unit: "turns", remaining: 3 },
	roll: "attack",
	mode: "advantage",
	remainingCharges: 1,
};

const statEffect: ActiveCombatEffect = {
	...rollEffect,
	id: "stat",
	type: "modifyStat",
	stat: "criticalRangeBonus",
	value: 2,
};

describe("ActiveEffectsRow", () => {
	it("shows matching durations once below all effects and keeps charges with their effect", () => {
		render(<ActiveEffectsRow label="Active effects" effects={[rollEffect, statEffect]} />);

		expect(screen.getAllByText("3 turns remaining")).toHaveLength(1);
		const duration = screen.getByText("3 turns remaining");
		expect(duration.tagName).toBe("FOOTER");
		expect(screen.getByRole("list").nextElementSibling).toBe(duration);
		const rows = screen.getAllByRole("listitem");
		expect(within(rows[0]).getByText("1 charge remaining")).toBeInTheDocument();
		expect(rows[1]).not.toHaveTextContent("charge");
	});

	it("preserves different duration counts on their respective effects", () => {
		render(
			<ActiveEffectsRow
				label="Active effects"
				effects={[rollEffect, { ...statEffect, duration: { unit: "turns", remaining: 1 } }]}
			/>,
		);

		const rows = screen.getAllByRole("listitem");
		const charge = within(rows[0]).getByText("1 charge remaining");
		expect(charge.nextElementSibling).toBe(within(rows[0]).getByText("3 turns remaining"));
		expect(rows[1]).toHaveTextContent("1 turn remaining");
	});

	it("keeps turns and battles distinct even when their counts match", () => {
		render(
			<ActiveEffectsRow
				label="Active effects"
				effects={[
					{ ...rollEffect, remainingCharges: 2 },
					{ ...statEffect, duration: { unit: "battles", remaining: 3 } },
				]}
			/>,
		);

		const rows = screen.getAllByRole("listitem");
		expect(within(rows[0]).getByText("2 charges remaining")).toBeInTheDocument();
		expect(within(rows[0]).getByText("3 turns remaining")).toBeInTheDocument();
		expect(rows[1]).toHaveTextContent("3 battles remaining");
	});

	it("omits charge metadata for unlimited roll effects", () => {
		render(
			<ActiveEffectsRow
				label="Active effects"
				effects={[
					{
						...rollEffect,
						remainingCharges: undefined,
						duration: { unit: "battles", remaining: 1 },
					},
				]}
			/>,
		);

		expect(screen.getByText("1 battle remaining")).toBeInTheDocument();
		expect(screen.getByRole("listitem")).not.toHaveTextContent("charge");
	});

	it("shows charges beneath a single effect and duration in the footer", () => {
		render(<ActiveEffectsRow label="Active effects" effects={[rollEffect]} />);

		const row = screen.getByRole("listitem");
		expect(within(row).getByText("1 charge remaining")).toBeInTheDocument();
		expect(row).not.toHaveTextContent("turns remaining");
		expect(screen.getByRole("list").nextElementSibling).toBe(
			screen.getByText("3 turns remaining"),
		);
		expect(screen.getByText("Focus Energy").closest("header")).not.toHaveTextContent(
			"remaining",
		);
	});
});
