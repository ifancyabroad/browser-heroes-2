import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "unholy_helm",
	name: "Unholy Helm",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-OD61bPEClUCCVjF3_yK?alt=media&token=3bf2c6d6-f39d-4c9b-9181-87fe49ef7dd9",
	price: 1700,
	rarity: "epic",
	type: "armour",
	slot: "helmet",
	modifiers: [
		{
			type: "modifyStat",
			stat: "constitution",
			operation: "add",
			value: 2,
		},
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "slashing",
		},
		{
			type: "modifyStat",
			stat: "armourClass",
			operation: "add",
			value: 2,
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
