import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "deathstalker_boots",
	name: "Deathstalker Boots",
	icon: "items/armour/sets/leather/Leather13_boots.png",
	price: 2900,
	rarity: "legendary",
	restrictedToClassIds: ["rogue"],
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
			damageType: "slashing",
			operation: "add",
			value: 5,
		},
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "slashing",
		},
	],
	tags: [],
});
