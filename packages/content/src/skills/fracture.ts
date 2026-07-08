import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "fracture",
	name: "Fracture",
	description:
		"Deliver a precise and devastating strike that disrupts the enemy's defenses, reducing their resistance to physical attacks.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NKt5eqAEIJYZFNbvK8f?alt=media&token=ec2639b6-7611-42a2-b954-f6bd5a35962c",
	pool: "assassin",
	category: "spell",
	maxUses: 3,
	effects: [
		{
			type: "modifyDamageAffinity",
			target: "enemy",
			affinity: "vulnerability",
			operation: "add",
			damageType: "slashing",
			durationTurns: 4,
		},
		{
			type: "modifyDamageAffinity",
			target: "enemy",
			affinity: "vulnerability",
			operation: "add",
			damageType: "piercing",
			durationTurns: 4,
		},
		{
			type: "modifyDamageAffinity",
			target: "enemy",
			affinity: "vulnerability",
			operation: "add",
			damageType: "crushing",
			durationTurns: 4,
		},
		{
			type: "damage",
			target: "enemy",
			damageType: "crushing",
			dice: "2d12+11",
			requiresAttackRoll: false,
			save: {
				attribute: "constitution",
				onSuccess: "noEffect",
				dc: {
					base: 8,
					attribute: "constitution",
					includeProficiency: true,
					bonus: 6,
				},
			},
		},
		{
			type: "modifyDamage",
			target: "enemy",
			operation: "multiply",
			value: 0.75,
			durationTurns: 4,
		},
	],
	tags: [],
});
