import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "burning_shot",
	name: "Burning Shot",
	description: "Loose an incendiary projectile that ignites its target on impact.",
	icon: "skills/common/burning_shot.png",
	pool: "common",
	kind: "weaponAttack",
	category: "damage",
	rarity: "uncommon",
	maxUses: 2,
	effects: [
		{
			type: "attackDamage",
			target: "enemy",
			multiplier: 1,
			attackRiders: [
				{
					timing: "onHit",
					effects: [
						{
							type: "damageOverTime",
							target: "enemy",
							damageType: "fire",
							damageClass: "magical",
							dice: "1d6",
							duration: { unit: "turns", value: 3 },
						},
					],
				},
			],
		},
	],
	tags: [],
});
