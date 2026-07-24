import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "umbral_strap",
	name: "Umbral Strap",
	icon: "items/armour/sets/leather/Leather8_belt.png",
	price: 1600,
	rarity: "legendary",
	type: "armour",
	slot: "belt",
	modifiers: [
		{
			type: "modifyStat",
			stat: "wisdom",
			value: 2,
		},
		{
			type: "modifyStat",
			stat: "constitution",
			value: 2,
		},
		{
			type: "modifyDamage",
			damageType: "piercing",
			operation: "add",
			value: 40,
		},
	],
	tags: [],
});
