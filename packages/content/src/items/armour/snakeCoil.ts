import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "snake_coil",
	name: "Snake Coil",
	description: "A ring adorned with a coiled serpent, imbued with stealth and cunning.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-NzEh4OLfUakfi5pWjf2?alt=media&token=767354c1-2018-45a0-9e08-34c9f768575c",
	price: 620,
	rarity: "common",
	type: "armour",
	slot: "ring",
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "poison",
			operation: "add",
			value: 50,
		},
	],
	tags: [],
});
