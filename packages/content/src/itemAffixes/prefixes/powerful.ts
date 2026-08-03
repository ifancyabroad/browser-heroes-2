import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "powerful",
	name: "Powerful",
	position: "prefix",
	rarity: "rare",
	appliesTo: {
		itemTypes: ["weapon", "armour"],
	},
	modifiers: [
		{
			type: "modifyStat",
			stat: "strength",
			value: 2,
		},
	],
});
