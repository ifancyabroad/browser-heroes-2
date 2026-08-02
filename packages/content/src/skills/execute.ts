import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "execute",
	name: "Execute",
	description: "Commit to a single overwhelming executioner's blow.",
	icon: "skills/unique/execute.png",
	pool: "unique",
	kind: "weaponAttack",
	category: "damage",
	maxUses: 1,
	effects: [
		{
			type: "attackDamage",
			target: "enemy",
			multiplier: 2.5,
			attackRiders: [],
		},
	],
	tags: [],
});
