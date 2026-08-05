import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "stand_ground",
	name: "Stand Ground",
	description: "Stand your ground to greatly increase defenses but reduce mobility.",
	icon: "skills/fighter/stand_ground.png",
	pool: "fighter",
	kind: "technique",
	category: "defensive",
	rarity: "common",
	maxUses: 3,
	effects: [
		{
			type: "modifyDamageAffinity",
			target: "self",
			affinity: "resistance",
			operation: "add",
			damageType: "slashing",
			duration: { unit: "battles", value: 1 },
		},
		{
			type: "modifyDamageAffinity",
			target: "self",
			affinity: "resistance",
			operation: "add",
			damageType: "crushing",
			duration: { unit: "battles", value: 1 },
		},
		{
			type: "modifyDamageAffinity",
			target: "self",
			affinity: "resistance",
			operation: "add",
			damageType: "piercing",
			duration: { unit: "battles", value: 1 },
		},
		{
			type: "modifyRoll",
			target: "self",
			roll: "savingThrow",
			mode: "disadvantage",
			attribute: "dexterity",
			duration: { unit: "battles", value: 1 },
		},
	],
	tags: [],
});
