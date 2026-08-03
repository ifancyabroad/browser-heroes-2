import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "hardy",
	name: "Hardy",
	position: "prefix",
	rarity: "rare",
	appliesTo: [
		{
			itemTypes: ["weapon", "armour"],
		},
	],
	modifiers: [
		{
			type: "modifyStat",
			stat: "constitution",
			value: 2,
		},
	],
});
