import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "unholy_girdle",
	name: "Unholy Girdle",
	icon: "items/armour/sets/mail/Mail16_belt.png",
	price: 1600,
	rarity: "legendary",
	type: "armour",
	slot: "belt",
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "piercing",
			operation: "add",
			value: 5,
		},
		{
			type: "modifyStat",
			stat: "strength",
			value: 4,
		},
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "piercing",
		},
	],
	tags: [],
});
