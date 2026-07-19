import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "dreadfathers_wraps",
	name: "Dreadfather's Wraps",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-OIG0OXwqPAwR5m2ygYs?alt=media&token=897cf442-4b9a-4ff9-bfa8-85cbc82bb890",
	price: 1600,
	rarity: "legendary",
	type: "armour",
	slot: "gloves",
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "radiant",
			operation: "add",
			value: 40,
		},
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "radiant",
		},
		{
			type: "modifyStat",
			stat: "strength",
			operation: "add",
			value: 2,
		},
	],
	tags: [],
});
