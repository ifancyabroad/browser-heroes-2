import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "leap_attack",
	name: "Leap Attack",
	icon: "skills/common/leap_attack.png",
	pool: "common",
	kind: "weaponAttack",
	category: "damage",
	maxUses: 4,
	effects: [
		{
			type: "attackDamage",
			target: "enemy",
			multiplier: 1.75,
			attackRiders: [],
		},
	],
	tags: [],
});
