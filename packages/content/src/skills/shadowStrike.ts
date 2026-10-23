import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "shadow_strike",
	name: "Shadow Strike",
	description: "Make a weapon attack that deals additional necrotic damage on hit.",
	icon: "skills/assassin/shadow_strike.png",
	pool: "assassin",
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
							damageType: "necrotic",
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
