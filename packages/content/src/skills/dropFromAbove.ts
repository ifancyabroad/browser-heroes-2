import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "drop_from_above",
	name: "Drop from Above",
	icon: "skills/common/drop_from_above.png",
	pool: "common",
	kind: "technique",
	category: "damage",
	maxUses: 1,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "crushing",
			dice: "2d12+8",
			requiresAttackRoll: false,
			save: {
				attribute: "constitution",
				onSuccess: "noEffect",
				dc: {
					base: 8,
					attribute: "constitution",
					includeProficiency: true,
					bonus: 0,
				},
			},
		},
		{
			type: "applyStatus",
			target: "enemy",
			statusId: "stunned",
			durationTurns: 1,
		},
	],
	tags: [],
});
