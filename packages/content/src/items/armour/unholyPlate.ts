import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "unholy_plate",
	name: "Unholy Plate",
	icon: "items/armour/sets/mail/Mail16_Chest.png",
	price: 5800,
	rarity: "legendary",
	type: "armour",
	slot: "body",
	category: "heavy",
	armourClass: 22,
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "crushing",
			operation: "add",
			value: 5,
		},
		{
			type: "modifyStat",
			stat: "constitution",
			value: 4,
		},
		{
			type: "modifyStat",
			stat: "maxHpBonus",
			value: 30,
		},
	],
	tags: [],
});
