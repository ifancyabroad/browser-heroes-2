import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "shadow_strike",
	name: "Shadow Strike",
	description:
		"Deliver a swift strike imbued with shadowy energy, dealing necrotic damage to your target.",
	icon: "skills/assassin/shadow_strike.png",
	pool: "assassin",
	kind: "weaponAttack",
	category: "damage",
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
							dice: "2d6",
						},
					],
				},
			],
		},
	],
	tags: [],
});
