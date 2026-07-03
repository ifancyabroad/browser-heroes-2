import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "fortified_strap",
	name: "Fortified Strap",
	description: "Sturdy leather belt, offering durability and style for rugged adventurers.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-Nz9_mMbYto-jb_Yxxmx?alt=media&token=45c7eab4-6c56-4db3-883f-f05eb9400c8e",
	price: 70,
	rarity: "common",
	type: "armour",
	slot: "belt",
	modifiers: [
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "piercing",
		},
	],
	tags: [],
});
