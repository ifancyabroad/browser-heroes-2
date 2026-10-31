import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "precision_shot",
	name: "Precision Shot",
	description: "Make a precise weapon shot with increased damage.",
	icon: "skills/common/precision_shot.png",
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
