import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "cyclone",
	name: "Cyclone",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OCJhiIp9tX3XVE1ycOM?alt=media&token=050dfca8-1aca-491b-9100-48ef6800be74",
	pool: "common",
	category: "spell",
	maxUses: 2,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "lightning",
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
