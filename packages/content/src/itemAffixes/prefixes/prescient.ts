import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "prescient",
	name: "Prescient",
	position: "prefix",
	rarity: "epic",
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
			value: 2,
		},
		{
			type: "modifyStat",
			stat: "savingThrowBonus",
			value: 2,
		},
	],
});
