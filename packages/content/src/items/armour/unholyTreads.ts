import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "unholy_treads",
	name: "Unholy Treads",
	icon: "items/armour/sets/mail/Mail16_Boots.png",
	price: 1600,
	rarity: "legendary",
	type: "armour",
	slot: "boots",
	modifiers: [
		{
			type: "modifyStat",
			stat: "dexterity",
			value: 2,
		},
		{
			type: "modifyStat",
			stat: "strength",
			value: 2,
		},
		{
			type: "modifyDamage",
			damageType: "fire",
			operation: "add",
			value: 5,
		},
	],
	tags: [],
});
