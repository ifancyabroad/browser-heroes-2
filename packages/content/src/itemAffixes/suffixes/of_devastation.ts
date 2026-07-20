import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "of_devastation",
	name: "of Devastation",
	position: "suffix",
	rarity: "epic",
	weight: 1,
	appliesTo: {
		itemTypes: ["weapon"],
	},
	modifiers: [
		{
			type: "modifyStat",
			stat: "critMultiplier",
			operation: "add",
			value: 0.5,
		},
	],
});
