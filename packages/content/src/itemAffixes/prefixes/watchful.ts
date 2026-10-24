import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "watchful",
	name: "Watchful",
	position: "prefix",
	rarity: "rare",
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
			value: 1,
		},
		{
			type: "modifyStat",
			stat: "savingThrowBonus",
			value: 1,
		},
	],
});
