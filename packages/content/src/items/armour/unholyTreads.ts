import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "unholy_treads",
	name: "Unholy Treads",
	icon: "items/armour/sets/mail/Mail16_Boots.png",
	price: 2900,
	rarity: "legendary",
	restrictedToClassIds: ["warrior"],
	type: "armour",
	slot: "boots",
	modifiers: [
		{
			type: "modifyStat",
			stat: "savingThrowBonus",
			value: 4,
		},
		{
			type: "modifyDamage",
			damageType: "fire",
			operation: "add",
			value: 5,
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
