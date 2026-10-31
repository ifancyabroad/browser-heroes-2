import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "frost_shot",
	name: "Frost Shot",
	description: "Make a weapon attack that deals additional cold damage on hit.",
	icon: "skills/common/frost_shot.png",
	pool: "common",
	kind: "weaponAttack",
	category: "damage",
	rarity: "uncommon",
	maxUses: 5,
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
							type: "damage",
							target: "enemy",
							damageType: "cold",
							damageClass: "magical",
							dice: "2d6",
						},
					],
				},
			],
		},
	],
	tags: [],
});
