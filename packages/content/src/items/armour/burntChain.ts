import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "burnt_chain",
	name: "Burnt Chain",
	description: "The Burning Amulet, channeling the essence of raging flames.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-Nz9Y9q53Z1Bfpt1UeVf?alt=media&token=6ebf052d-76d4-4bd0-8848-42209f28f097",
	price: 600,
	rarity: "rare",
	type: "armour",
	slot: "amulet",
	modifiers: [
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "fire",
		},
		{
			type: "modifyDamage",
			damageType: "fire",
			operation: "add",
			value: 100,
		},
	],
	tags: [],
});
