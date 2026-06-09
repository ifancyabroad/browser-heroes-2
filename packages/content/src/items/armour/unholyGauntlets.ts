import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "unholy_gauntlets",
	name: "Unholy Gauntlets",
	description: "Wreathed in darkness, these gauntlets embody the essence of the shadow.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-NzDTm9T7VzIuKsvXgM6?alt=media&token=1fd3056f-d5b4-4296-9258-91b4070ac56f",
	price: 1600,
	rarity: "common",
	type: "armour",
	slot: "gloves",
	category: "accessory",
	modifiers: [
		{
			type: "modifyStat",
			stat: "attackRollBonus",
			operation: "add",
			value: 4,
		},
		{
			type: "modifyDamage",
			damageType: "slashing",
			operation: "add",
			value: 40,
		},
	],
	tags: [],
});
