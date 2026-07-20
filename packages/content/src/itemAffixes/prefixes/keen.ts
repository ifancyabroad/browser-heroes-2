import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "keen",
	name: "Keen",
	position: "prefix",
	rarity: "rare",
	weight: 1,
	appliesTo: {
		itemTypes: ["weapon"],
	},
	modifiers: [
		{
			type: "modifyStat",
			stat: "critChance",
			operation: "add",
			value: 2,
		},
	],
});
