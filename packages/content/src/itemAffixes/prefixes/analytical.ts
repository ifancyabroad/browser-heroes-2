import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "analytical",
	name: "Analytical",
	position: "prefix",
	rarity: "rare",
	weight: 1,
	appliesTo: [
		{
			itemTypes: ["weapon"],
			weaponTypes: ["staff", "wand"],
			damageTypes: ["fire", "cold", "lightning"],
			damageClasses: ["magical"],
		},
		{
			itemTypes: ["armour"],
			armourSlots: ["helmet", "gloves", "amulet", "ring"],
		},
		{
			itemTypes: ["armour"],
			armourSlots: ["body"],
			armourCategories: ["cloth"],
		},
	],
	modifiers: [
		{
			type: "modifyStat",
			stat: "intelligence",
			value: 1,
		},
		{
			type: "modifyStat",
			stat: "saveDcBonus",
			value: 1,
		},
	],
});
