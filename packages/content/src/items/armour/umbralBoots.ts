import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "umbral_boots",
	name: "Umbral Boots",
	icon: "items/armour/sets/leather/Leather8_boots.png",
	price: 1600,
	rarity: "legendary",
	type: "armour",
	slot: "boots",
	modifiers: [
		{
			type: "modifyStat",
			stat: "dexterity",
			value: 4,
		},
		{
			type: "modifyDamage",
			damageType: "necrotic",
			operation: "add",
			value: 5,
		},
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "necrotic",
		},
	],
	tags: [],
});
