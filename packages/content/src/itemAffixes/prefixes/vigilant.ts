import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "vigilant",
	name: "Vigilant",
	position: "prefix",
	rarity: "rare",
	weight: 1,
	appliesTo: [
		{
			itemTypes: ["armour"],
			armourSlots: ["helmet", "amulet", "ring", "shield"],
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
			stat: "savingThrowBonus",
			value: 1,
		},
	],
});
