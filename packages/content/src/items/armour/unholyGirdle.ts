import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "unholy_girdle",
	name: "Unholy Girdle",
	icon: "items/armour/sets/mail/Mail16_belt.png",
	price: 2700,
	rarity: "legendary",
	restrictedToClassIds: ["warrior"],
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
