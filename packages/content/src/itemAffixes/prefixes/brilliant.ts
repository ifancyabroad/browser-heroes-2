import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "brilliant",
	name: "Brilliant",
	position: "prefix",
	rarity: "epic",
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
			value: 2,
		},
		{
			type: "modifyStat",
			stat: "saveDcBonus",
			value: 2,
		},
	],
});
