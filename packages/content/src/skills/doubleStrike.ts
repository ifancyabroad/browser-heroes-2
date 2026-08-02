import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "double_strike",
	name: "Double Strike",
	description: "Execute two rapid attacks in quick succession against a single target.",
	icon: "skills/warrior/double_strike.png",
	pool: "warrior",
	kind: "weaponAttack",
	category: "damage",
	maxUses: 3,
	effects: [
		{
			type: "attackDamage",
			target: "enemy",
			multiplier: 1,
			attackRiders: [],
		},
		{
			type: "attackDamage",
			target: "enemy",
			multiplier: 1,
			attackRiders: [],
		},
	],
	tags: [],
});
