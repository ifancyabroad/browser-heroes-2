import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "of_impact",
	name: "of Impact",
	position: "suffix",
	rarity: "rare",
	weight: 1,
	appliesTo: {
		itemTypes: ["weapon"],
	},
	modifiers: [
		{
			type: "modifyStat",
			stat: "criticalDiceMultiplierBonus",
			operation: "add",
			value: 1,
		},
	],
});
