import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "lightning_masters_ring",
	name: "Lightning Master's Ring",
	description:
		"A ring crackling with electric energy, empowering the wearer with mastery over lightning.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-NzEhK5Irt3URTvs3ztw?alt=media&token=ffc28e5f-85d6-4e07-9856-9ec1333fd136",
	price: 710,
	rarity: "rare",
	type: "armour",
	slot: "ring",
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "lightning",
			operation: "add",
			value: 40,
		},
	],
	tags: [],
});
