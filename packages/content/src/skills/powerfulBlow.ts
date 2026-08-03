import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "powerful_blow",
	name: "Powerful Blow",
	description: "Commit fully to a crushing weapon strike that deals twice normal damage.",
	icon: "skills/common/powerful_blow.png",
	pool: "common",
	kind: "weaponAttack",
	category: "damage",
	rarity: "rare",
	maxUses: 2,
	effects: [
		{
			type: "attackDamage",
			target: "enemy",
			multiplier: 2,
			attackRiders: [],
		},
	],
	tags: [],
});
