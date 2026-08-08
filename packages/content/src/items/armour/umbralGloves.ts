import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "umbral_gloves",
	name: "Umbral Gloves",
	icon: "items/armour/sets/leather/Leather8_gloves.png",
	price: 2600,
	rarity: "legendary",
	type: "armour",
	slot: "gloves",
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "poison",
			operation: "add",
			value: 5,
		},
		{
			type: "modifyStat",
			stat: "attackRollBonus",
			value: 4,
		},
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "poison",
		},
	],
	tags: [],
});
