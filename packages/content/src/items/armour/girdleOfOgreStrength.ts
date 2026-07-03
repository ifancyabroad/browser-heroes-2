import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "girdle_of_ogre_strength",
	name: "Girdle of Ogre Strength",
	description: "Woven with enchanted fibers, bestowing the strength of ogres upon the wearer.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-NgO6sAjD4s9LSirM2lr?alt=media&token=12e9a21e-abc3-4b12-820d-bc3f060ab6e0",
	price: 140,
	rarity: "common",
	type: "armour",
	slot: "belt",
	modifiers: [
		{
			type: "modifyStat",
			stat: "strength",
			operation: "add",
			value: 1,
		},
	],
	tags: [],
});
