import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "sunforged_plate",
	name: "Sunforged Plate",
	icon: "items/armour/sets/mail/Mail13_Chest.png",
	price: 1800,
	rarity: "legendary",
	type: "armour",
	slot: "body",
	category: "heavy",
	armourClass: 22,
	modifiers: [
		{
			type: "modifyStat",
			stat: "constitution",
			value: 4,
		},
		{
			type: "modifyStat",
			stat: "maxHpBonus",
			value: 25,
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
