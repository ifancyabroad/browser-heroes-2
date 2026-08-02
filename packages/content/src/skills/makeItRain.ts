import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "make_it_rain",
	name: "Make it Rain",
	icon: "skills/unique/make_it_rain.png",
	pool: "unique",
	kind: "spell",
	category: "damage",
	maxUses: 2,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "fire",
			dice: "2d6",
			requiresAttackRoll: false,
		},
		{
			type: "damage",
			target: "enemy",
			damageType: "fire",
			dice: "2d6",
			requiresAttackRoll: false,
		},
		{
			type: "damage",
			target: "enemy",
			damageType: "fire",
			dice: "2d6",
			requiresAttackRoll: false,
		},
	],
	tags: [],
});
