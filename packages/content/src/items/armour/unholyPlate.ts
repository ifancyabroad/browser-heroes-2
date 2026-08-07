import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "unholy_plate",
	name: "Unholy Plate",
	icon: "items/armour/sets/mail/Mail16_Chest.png",
	price: 1800,
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
			value: 2,
		},
		{
			type: "modifyStat",
			stat: "strength",
			value: 2,
		},
	],
	tags: [],
});
