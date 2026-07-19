import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "unholy_girdle",
	name: "Unholy Girdle",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-OD66llU12DgMI5qRhS2?alt=media&token=6a24f3b5-7c3b-498e-9cb9-410b212cf9ed",
	price: 1600,
	rarity: "legendary",
	type: "armour",
	slot: "belt",
	modifiers: [
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "piercing",
		},
		{
			type: "modifyDamage",
			damageType: "piercing",
			operation: "add",
			value: 40,
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
