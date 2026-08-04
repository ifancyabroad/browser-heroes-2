import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { StructuredEditor } from "./StructuredEditor";

describe("StructuredEditor affix applicability", () => {
	it("edits damage type rules and adds grouped applicability rules", () => {
		const onChange = vi.fn();
		render(
			<StructuredEditor
				value={[{ itemTypes: ["weapon"], damageTypes: ["piercing"] }]}
				path="appliesTo"
				field="appliesTo"
				category="affixes"
				issues={[]}
				onChange={onChange}
			/>,
		);

		const damageType = screen.getByRole("combobox", { name: "Damage Types 1" });
		expect(damageType).toHaveValue("piercing");
		fireEvent.change(damageType, { target: { value: "slashing" } });
		expect(onChange).toHaveBeenLastCalledWith([
			{ itemTypes: ["weapon"], damageTypes: ["slashing"] },
		]);

		fireEvent.click(screen.getByRole("button", { name: "Add Applies To" }));
		expect(onChange).toHaveBeenLastCalledWith([
			{ itemTypes: ["weapon"], damageTypes: ["piercing"] },
			{},
		]);
	});
});

describe("StructuredEditor skill rarity", () => {
	it("edits rarity using the supported rarity values", () => {
		const onChange = vi.fn();
		render(
			<StructuredEditor
				value="rare"
				path="rarity"
				field="rarity"
				category="skills"
				issues={[]}
				onChange={onChange}
			/>,
		);

		const rarity = screen.getByRole("combobox", { name: "Rarity" });
		expect(rarity).toHaveValue("rare");
		expect(Array.from(rarity.querySelectorAll("option"), (option) => option.value)).toEqual([
			"common",
			"uncommon",
			"rare",
			"epic",
			"legendary",
		]);

		fireEvent.change(rarity, { target: { value: "legendary" } });
		expect(onChange).toHaveBeenCalledWith("legendary");
	});
});
