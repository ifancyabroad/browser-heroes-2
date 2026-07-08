import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "make_it_rain",
	name: "Make it Rain",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-O9_bwdIr8BegxbOjPip?alt=media&token=9ac6a519-98ab-479d-9c80-e2d90fafb13a",
	pool: "unique",
	category: "spell",
	maxUses: 2,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "fire",
			dice: "1d8+3",
			requiresAttackRoll: false,
		},
		{
			type: "damage",
			target: "enemy",
			damageType: "fire",
			dice: "1d8+3",
			requiresAttackRoll: false,
		},
		{
			type: "damage",
			target: "enemy",
			damageType: "fire",
			dice: "1d8+3",
			requiresAttackRoll: false,
		},
	],
	tags: [],
});
