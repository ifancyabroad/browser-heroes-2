import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { skills } from "@app/content";
import { StructuredValue } from "./StructuredValue";

describe("structured mechanics", () => {
	it("uses the behaviour view for riders nested inside generic combat data", () => {
		const ravage = skills.find((skill) => skill.id === "ravage")!;
		const weapon = ravage.effects.find((effect) => effect.type === "attackDamage")!;
		render(
			<StructuredValue
				value={{ combat: { attack: { attackRiders: weapon.attackRiders } } }}
			/>,
		);
		const trigger = screen.getByRole("region", { name: "On hit" });
		const save = within(trigger).getByRole("region", { name: "Constitution saving throw" });
		const failed = within(save).getByRole("group", { name: "On failed save" });
		expect(within(failed).getByText("Slashing vulnerability")).toBeInTheDocument();
		expect(within(failed).getByText("Slashing damage over time")).toBeInTheDocument();
		expect(screen.getAllByText("2 turns")).toHaveLength(2);
	});

	it("preserves unknown fields, zero values, false values, and non-string discriminators", () => {
		render(
			<StructuredValue
				value={{ type: 0, customData: { enabled: false, amount: 0 }, extra: [] }}
			/>,
		);
		expect(screen.getAllByText("0")).toHaveLength(2);
		expect(screen.getByText("No")).toBeInTheDocument();
		expect(screen.getByText("None")).toBeInTheDocument();
		expect(screen.getByRole("region", { name: "Custom Data" })).toBeInTheDocument();
	});

	it("does not omit additional properties on duration-like objects", () => {
		render(
			<StructuredValue
				value={{ duration: { unit: "turns", value: 2, customNote: "Preserve this" } }}
			/>,
		);
		expect(screen.getByText("Preserve this")).toBeInTheDocument();
		expect(screen.getByText("turns")).toBeInTheDocument();
	});
});
