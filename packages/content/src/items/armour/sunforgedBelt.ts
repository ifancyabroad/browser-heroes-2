import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "sunforged_belt",
	name: "Sunforged Belt",
	icon: "items/armour/sets/mail/Mail13_belt.png",
	price: 1600,
	rarity: "legendary",
	type: "armour",
	slot: "belt",
	modifiers: [
		{
			type: "modifyStat",
			stat: "wisdom",
			value: 4,
		},
		{
			type: "modifyHealing",
			multiplier: 1.5,
		},
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "fire",
		},
	],
	tags: [],
});
