import { render, screen } from "@testing-library/react";
import { selectItemDefinition, type RewardChoiceOptionView } from "@app/engine";
import { describe, expect, it } from "vitest";
import { RadioGroup } from "radix-ui";
import { TooltipProvider } from "../../../components/Tooltip";
import { RewardOptionCard } from "./RewardOptionCard";

const item = selectItemDefinition({
	instanceId: "reward-item",
	type: "static",
	itemId: "acid_edge",
});

if (!item) {
	throw new Error("Expected test item definition");
}

const testItem = item;

const replacedItem = {
	instanceId: "equipped-item",
	type: "static",
	itemId: "acid_edge",
} as const;

function createOption(
	equipmentPlacement: Extract<RewardChoiceOptionView, { type: "item" }>["equipmentPlacement"],
): RewardChoiceOptionView {
	return {
		type: "item",
		optionIndex: 0,
		item: testItem,
		equipmentPlacement,
	};
}

describe("RewardOptionCard", () => {
	it("does not describe replacements when an empty destination can be used", () => {
		render(
			<TooltipProvider>
				<RadioGroup.Root>
					<RewardOptionCard
						option={createOption({
							destinations: [
								{ equipmentSlot: "mainHand", replacedItems: [replacedItem] },
								{ equipmentSlot: "offHand", replacedItems: [] },
							],
							automaticDestination: {
								equipmentSlot: "offHand",
								replacedItems: [],
							},
						})}
						value="0"
						selected={false}
						disabled={false}
					/>
				</RadioGroup.Root>
			</TooltipProvider>,
		);

		expect(screen.queryByText("Replaces:")).not.toBeInTheDocument();
	});

	it("describes replacements when destination selection is required", () => {
		render(
			<TooltipProvider>
				<RadioGroup.Root>
					<RewardOptionCard
						option={createOption({
							destinations: [
								{ equipmentSlot: "mainHand", replacedItems: [replacedItem] },
							],
							automaticDestination: null,
						})}
						value="0"
						selected={false}
						disabled={false}
					/>
				</RadioGroup.Root>
			</TooltipProvider>,
		);

		expect(screen.getByText("Replaces:")).toBeInTheDocument();
	});
});
