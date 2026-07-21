import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "corrupted_arm",
	name: "Corrupted Arm",
	icon: "skills/unique/corrupted_arm.png",
	pool: "unique",
	category: "spell",
	maxUses: 2,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "necrotic",
			dice: "1d8+5",
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
			stat: "armourClass",
			operation: "add",
			value: -6,
			durationTurns: 4,
		},
		{
			type: "damage",
			target: "enemy",
			damageType: "crushing",
			dice: "1d8+5",
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
	],
	tags: [],
});
