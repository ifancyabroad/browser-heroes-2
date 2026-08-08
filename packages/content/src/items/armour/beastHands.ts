import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "beast_hands",
	name: "Beast Hands",
	description: "Gloves imbued with the untamed fury of beasts, enhancing combat prowess.",
	icon: "items/armour/gloves/HandsS2.png",
	price: 2900,
	rarity: "legendary",
	type: "armour",
	slot: "gloves",
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "slashing",
			operation: "add",
			value: 5,
		},
		{
			type: "modifyDamage",
			damageType: "piercing",
			operation: "add",
			value: 5,
		},
		{
			type: "modifyStat",
			stat: "dexterity",
			value: 4,
		},
	],
	tags: [],
});
