import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "engulf",
	name: "Engulf",
	icon: "skills/unique/engulf.png",
	pool: "unique",
	category: "spell",
	maxUses: 7,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "fire",
			dice: "1d12+8",
			requiresAttackRoll: false,
			save: {
				attribute: "constitution",
				onSuccess: "noEffect",
				dc: {
					base: 8,
					attribute: "constitution",
					includeProficiency: true,
					bonus: 3,
				},
			},
		},
		{
			type: "modifyStat",
			target: "enemy",
			stat: "attackRollBonus",
			value: -2,
			durationTurns: 3,
		},
		{
			type: "modifyDamageAffinity",
			target: "enemy",
			affinity: "vulnerability",
			operation: "add",
			damageType: "fire",
			durationTurns: 3,
		},
	],
	tags: [],
});
