import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "deadly",
	name: "Deadly",
	position: "prefix",
	rarity: "epic",
	weight: 1,
	appliesTo: {
		itemTypes: ["weapon"],
	},
	modifiers: [
		{
			type: "modifyStat",
			stat: "critChance",
			operation: "add",
			value: 4,
		},
	],
});
