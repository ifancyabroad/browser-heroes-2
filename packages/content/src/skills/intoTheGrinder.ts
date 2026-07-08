import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "into_the_grinder",
	name: "Into the Grinder",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OAc58blrXjj8BuSCn6r?alt=media&token=4bcc1ca7-a2a9-4b6c-ad2c-17cd91337f6d",
	pool: "unique",
	category: "spell",
	maxUses: 2,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "acid",
			dice: "1d8+5",
			requiresAttackRoll: false,
			save: {
				attribute: "strength",
				onSuccess: "noEffect",
				dc: {
					base: 8,
					attribute: "strength",
					includeProficiency: true,
					bonus: 0,
				},
			},
		},
		{
			type: "damage",
			target: "enemy",
			damageType: "crushing",
			dice: "1d8+5",
			requiresAttackRoll: false,
			save: {
				attribute: "strength",
				onSuccess: "noEffect",
				dc: {
					base: 8,
					attribute: "strength",
					includeProficiency: true,
					bonus: 0,
				},
			},
		},
		{
			type: "modifyStat",
			target: "enemy",
			stat: "armourClass",
			operation: "add",
			value: -3,
			durationTurns: 4,
		},
	],
	tags: [],
});
