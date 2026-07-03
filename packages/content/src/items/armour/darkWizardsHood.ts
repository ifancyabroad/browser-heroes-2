import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "dark_wizards_hood",
	name: "Dark Wizard's Hood",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-OAsHtAZrN7HRemqe-D2?alt=media&token=55ebc552-1fe8-400a-b8d3-103b067dd5bd",
	price: 90,
	rarity: "common",
	type: "armour",
	slot: "helmet",
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "necrotic",
			operation: "add",
			value: 20,
		},
	],
	tags: [],
});
