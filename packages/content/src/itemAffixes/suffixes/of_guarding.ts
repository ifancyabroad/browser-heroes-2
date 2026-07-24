import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "of_guarding",
	name: "of Guarding",
	position: "suffix",
	rarity: "epic",
	weight: 1,
	appliesTo: {
		armourSlots: ["body", "shield"],
	},
	modifiers: [
		{
			type: "modifyStat",
			stat: "armourClass",
			value: 2,
		},
	],
});
