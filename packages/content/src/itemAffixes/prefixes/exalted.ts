import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "exalted",
	name: "Exalted",
	position: "prefix",
	rarity: "epic",
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
			value: 2,
		},
		{
			type: "modifyStat",
			stat: "charisma",
			value: 2,
		},
	],
});
