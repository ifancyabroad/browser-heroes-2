import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "crown_charm",
	name: "Crown Charm",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-OHra_lSjcjIhvuICBCI?alt=media&token=4d3137df-1f06-43ec-bca4-668afbd38f11",
	price: 1400,
	rarity: "legendary",
	type: "armour",
	slot: "amulet",
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "radiant",
			operation: "add",
			value: 40,
		},
		{
			type: "modifyStat",
			stat: "strength",
			operation: "add",
			value: 4,
		},
	],
	tags: [],
});
