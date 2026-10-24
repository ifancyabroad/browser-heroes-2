import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "inspiring",
	name: "Inspiring",
	position: "prefix",
	rarity: "rare",
	weight: 1,
	appliesTo: [
		{
			itemTypes: ["weapon", "armour"],
		},
	],
	modifiers: [
		{
			type: "modifyStat",
			stat: "wisdom",
			value: 1,
		},
		{
			type: "modifyStat",
			stat: "charisma",
			value: 1,
		},
	],
});
