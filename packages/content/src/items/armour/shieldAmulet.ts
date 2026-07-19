import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "shield_amulet",
	name: "Shield Amulet",
	description: "This amulet fortifies defenses, serving as a bulwark against harm.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-Nz9Yd_qnAfg6Q5Ue1mG?alt=media&token=f9850689-b16a-4c57-9538-40aa7ab04b94",
	price: 1560,
	rarity: "legendary",
	type: "armour",
	slot: "amulet",
	modifiers: [
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "slashing",
		},
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "crushing",
		},
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "piercing",
		},
	],
	tags: [],
});
