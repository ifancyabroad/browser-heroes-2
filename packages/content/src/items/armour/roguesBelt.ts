import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "rogues_belt",
	name: "Rogue's Belt",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-OD1Xb8TKDjBkVCnDn9A?alt=media&token=8ad9a0a2-610c-4a9e-8275-223ac8342698",
	price: 260,
	rarity: "uncommon",
	type: "armour",
	slot: "belt",
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "slashing",
			operation: "add",
			value: 25,
		},
	],
	tags: [],
});
