import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "stalwart",
	name: "Stalwart",
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
			stat: "strength",
			value: 1,
		},
		{
			type: "modifyStat",
			stat: "constitution",
			value: 1,
		},
	],
});
