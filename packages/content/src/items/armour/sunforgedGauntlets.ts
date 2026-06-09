import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "sunforged_gauntlets",
	name: "Sunforged Gauntlets",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-OIGBXAOwBUmfrf0GEI1?alt=media&token=d6576c96-1cfe-425f-b02a-63cfb95171b5",
	price: 1600,
	rarity: "common",
	type: "armour",
	slot: "gloves",
	category: "accessory",
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "slashing",
			operation: "add",
			value: 40,
		},
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "slashing",
		},
		{
			type: "modifyStat",
			stat: "wisdom",
			operation: "add",
			value: 2,
		},
	],
	tags: [],
});
