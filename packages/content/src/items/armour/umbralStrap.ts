import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "umbral_strap",
	name: "Umbral Strap",
	icon: "items/armour/sets/leather/Leather8_belt.png",
	price: 2700,
	rarity: "legendary",
	restrictedToClassIds: ["shadowblade"],
	type: "armour",
	slot: "belt",
	modifiers: [
		{
			type: "modifyStat",
			stat: "wisdom",
			value: 4,
		},
		{
			type: "modifyStat",
			stat: "saveDcBonus",
			value: 4,
		},
		{
			type: "modifyDamage",
			damageType: "piercing",
			operation: "add",
			value: 5,
		},
	],
	tags: [],
});
