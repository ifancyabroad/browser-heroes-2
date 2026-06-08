import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "dragon_breath",
	name: "Dragon Breath",
	description: "Unleash a cone of fiery devastation, scorching everything in its path.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-Nc41TbX58HmCh6nednT?alt=media&token=a93e95c5-514e-4268-b3b2-db3268545b35",
	pool: "warlock",
	category: "spell",
	maxUses: 3,
	ranks: [
		{
			rank: 1,
			effects: [
				{
					type: "damage",
					target: "enemy",
					damageType: "fire",
					dice: "2d12+8",
					attribute: "intelligence",
					requiresAttackRoll: false,
				},
				{
					type: "modifyDamageAffinity",
					target: "enemy",
					affinity: "vulnerability",
					operation: "add",
					damageType: "fire",
					durationTurns: 4,
				},
			],
		},
		{
			rank: 2,
			effects: [
				{
					type: "damage",
					target: "enemy",
					damageType: "fire",
					dice: "3d12+11",
					attribute: "intelligence",
					requiresAttackRoll: false,
				},
				{
					type: "modifyDamageAffinity",
					target: "enemy",
					affinity: "vulnerability",
					operation: "add",
					damageType: "fire",
					durationTurns: 5,
				},
			],
		},
		{
			rank: 3,
			effects: [
				{
					type: "damage",
					target: "enemy",
					damageType: "fire",
					dice: "4d12+14",
					attribute: "intelligence",
					requiresAttackRoll: false,
				},
				{
					type: "modifyDamageAffinity",
					target: "enemy",
					affinity: "vulnerability",
					operation: "add",
					damageType: "fire",
					durationTurns: 6,
				},
			],
		},
	],
	tags: [],
});
