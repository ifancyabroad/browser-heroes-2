import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "umbral_hood",
	name: "Umbral Hood",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-OIGEluk1ENx9rTO3Nzo?alt=media&token=8660797b-7ad9-49ba-aa35-ab349e868728",
	price: 1700,
	rarity: "epic",
	type: "armour",
	slot: "helmet",
	modifiers: [
		{
			type: "modifyStat",
			stat: "armourClass",
			operation: "add",
			value: 2,
		},
		{
			type: "modifyStat",
			stat: "critChance",
			operation: "add",
			value: 2,
		},
		{
			type: "modifyDamage",
			damageType: "slashing",
			operation: "add",
			value: 40,
		},
	],
	tags: [],
});
