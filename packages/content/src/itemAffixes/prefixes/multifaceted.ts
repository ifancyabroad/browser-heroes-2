import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "multifaceted",
	name: "Multifaceted",
	position: "prefix",
	rarity: "epic",
	weight: 1,
	appliesTo: [
		{
			itemTypes: ["weapon"],
			weaponTypes: ["staff", "wand"],
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
			stat: "saveDcBonus",
			value: 2,
		},
	],
});
