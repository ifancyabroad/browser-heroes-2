import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "constrict",
	name: "Constrict",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OC0KVp8uW27MHyrOLUj?alt=media&token=d7857ebc-fff4-4729-a859-0b359f9af9ea",
	pool: "common",
	category: "spell",
	maxUses: 5,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "crushing",
			dice: "1d12+8",
			requiresAttackRoll: false,
			save: {
				attribute: "strength",
				onSuccess: "noEffect",
				dc: {
					base: 8,
					attribute: "strength",
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
			value: -4,
			durationTurns: 4,
		},
	],
	tags: [],
});
