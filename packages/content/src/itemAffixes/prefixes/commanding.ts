import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "commanding",
	name: "Commanding",
	position: "prefix",
	rarity: "rare",
	appliesTo: {
		itemTypes: ["weapon", "armour"],
	},
	modifiers: [
		{
			type: "modifyStat",
			stat: "charisma",
			value: 2,
		},
	],
});
