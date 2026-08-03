import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "rend",
	name: "Rend",
	description: "Strike the enemy to pierce the skin and cause them to bleed.",
	icon: "skills/warrior/rend.png",
	pool: "warrior",
	kind: "weaponAttack",
	category: "damage",
	rarity: "common",
	maxUses: 4,
	effects: [
		{
			type: "attackDamage",
			target: "enemy",
			multiplier: 1,
			attackRiders: [
				{
					timing: "onHit",
					save: {
						attribute: "constitution",
						onSuccess: "noEffect",
						dc: { attribute: "strength" },
					},
					effects: [
						{
							type: "damageOverTime",
							target: "enemy",
							damageType: "slashing",
							dice: "1d6",
							durationTurns: 3,
						},
					],
				},
			],
		},
	],
	tags: [],
});
