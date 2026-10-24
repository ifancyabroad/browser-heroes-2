import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "versatile",
	name: "Versatile",
	position: "prefix",
	rarity: "rare",
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
			value: 1,
		},
		{
			type: "modifyStat",
			stat: "saveDcBonus",
			value: 1,
		},
	],
});
