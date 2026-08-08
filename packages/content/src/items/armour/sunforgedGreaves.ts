import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "sunforged_greaves",
	name: "Sunforged Greaves",
	icon: "items/armour/sets/mail/Mail13_Boots.png",
	price: 2900,
	rarity: "legendary",
	restrictedToClassIds: ["paladin"],
	type: "armour",
	slot: "boots",
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "crushing",
			operation: "add",
			value: 5,
		},
		{
			type: "modifyStat",
			stat: "savingThrowBonus",
			value: 4,
		},
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "crushing",
		},
	],
	tags: [],
});
