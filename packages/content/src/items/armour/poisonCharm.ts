import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "poison_charm",
	name: "Poison Charm",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-OAsTzrNjIZxmo7LLkrz?alt=media&token=55301e83-5f15-4d7c-8433-77b0a3a4e4ac",
	price: 240,
	rarity: "uncommon",
	type: "armour",
	slot: "amulet",
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "poison",
			operation: "add",
			value: 25,
		},
	],
	tags: [],
});
