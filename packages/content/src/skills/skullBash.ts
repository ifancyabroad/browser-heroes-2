import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "skull_bash",
	name: "Skull Bash",
	icon: "skills/common/skull_bash.png",
	pool: "common",
	category: "spell",
	maxUses: 5,
	effects: [
		{
			type: "modifyDamageAffinity",
			target: "enemy",
			affinity: "vulnerability",
			operation: "add",
			damageType: "crushing",
			durationTurns: 5,
		},
		{
			type: "damage",
			target: "enemy",
			damageType: "crushing",
			dice: "1d8+3",
			requiresAttackRoll: false,
			save: {
				attribute: "constitution",
				onSuccess: "noEffect",
				dc: {
					base: 8,
					attribute: "constitution",
					includeProficiency: true,
					bonus: 2,
				},
			},
		},
	],
	tags: [],
});
