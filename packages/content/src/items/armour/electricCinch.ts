import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "electric_cinch",
	name: "Electric Cinch",
	description: "The Electric Cinch, crackling with the power of lightning.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-Nz9cb1_qfK3xtaJ9le1?alt=media&token=c4613651-96d1-42c2-903d-2edc5a520d09",
	price: 620,
	rarity: "common",
	type: "armour",
	slot: "belt",
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
