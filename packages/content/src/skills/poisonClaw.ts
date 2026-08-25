import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "poison_claw",
	name: "Poison Claw",
	description: "Rake the enemy with a venomous claw that delivers an immediate dose of poison.",
	icon: "skills/common/poison_claw.png",
	pool: "common",
	kind: "weaponAttack",
	category: "damage",
	rarity: "common",
	maxUses: 6,
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
							damageType: "poison",
							damageClass: "magical",
							dice: "1d4",
							save: {
								attribute: "constitution",
								onSuccess: "halfDamage",
								dc: { attribute: "constitution" },
							},
						},
					],
				},
			],
		},
	],
	tags: [],
});
