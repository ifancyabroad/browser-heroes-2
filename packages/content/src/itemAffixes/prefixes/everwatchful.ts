import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "everwatchful",
	name: "Everwatchful",
	position: "prefix",
	rarity: "epic",
	weight: 1,
	appliesTo: [
		{
			itemTypes: ["weapon"],
		},
		{
			itemTypes: ["armour"],
			armourSlots: ["helmet", "gloves", "ring"],
		},
	],
	modifiers: [
		{
			type: "modifyStat",
			stat: "attackRollBonus",
			value: 2,
		},
		{
			type: "modifyStat",
			stat: "savingThrowBonus",
			value: 2,
		},
	],
});
