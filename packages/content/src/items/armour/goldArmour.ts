import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "gold_armour",
	name: "Gold Armour",
	description:
		"Incorruptible enchantments suffuse this golden plate, turning aside corrosive forces and reflecting even the fiercest radiance.",
	icon: "items/armour/chest/Chest_17.png",
	price: 1760,
	rarity: "legendary",
	type: "armour",
	slot: "body",
	category: "heavy",
	armourClass: 22,
	modifiers: [
		{
			type: "modifyDamageAffinity",
			affinity: "immunity",
			operation: "add",
			damageType: "acid",
		},
		{
			type: "modifyDamageAffinity",
			affinity: "immunity",
			operation: "add",
			damageType: "radiant",
		},
		{
			type: "modifyStat",
			stat: "savingThrowBonus",
			value: 4,
		},
	],
	tags: [],
});
