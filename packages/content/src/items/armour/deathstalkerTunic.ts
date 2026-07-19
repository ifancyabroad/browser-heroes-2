import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "deathstalker_tunic",
	name: "Deathstalker Tunic",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-O8D90nWC6JFNgVjhehj?alt=media&token=8b65ce52-7f33-4fe9-a94f-9df6d74fdf8f",
	price: 1800,
	rarity: "legendary",
	type: "armour",
	slot: "body",
	category: "light",
	armourClass: 12,
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
			stat: "dexterity",
			operation: "add",
			value: 2,
		},
		{
			type: "modifyStat",
			stat: "constitution",
			operation: "add",
			value: 2,
		},
	],
	tags: [],
});
