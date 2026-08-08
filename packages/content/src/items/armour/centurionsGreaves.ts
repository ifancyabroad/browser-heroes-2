import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "centurions_greaves",
	name: "Centurion's Greaves",
	icon: "items/armour/sets/mail/Mail17_Boots.png",
	price: 2900,
	rarity: "legendary",
	restrictedToClassIds: ["battlemage"],
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
