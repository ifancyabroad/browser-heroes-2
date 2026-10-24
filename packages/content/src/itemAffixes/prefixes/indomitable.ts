import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "indomitable",
	name: "Indomitable",
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
			stat: "strength",
			value: 2,
		},
		{
			type: "modifyStat",
			stat: "constitution",
			value: 2,
		},
	],
});
