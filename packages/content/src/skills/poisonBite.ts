import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "poison_bite",
	name: "Poison Bite",
	description: "Sink poisoned fangs into the enemy and infect them with a lingering toxin.",
	icon: "skills/common/poison_bite.png",
	pool: "common",
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
					effects: [
						{
							type: "damageOverTime",
							target: "enemy",
							damageType: "poison",
							dice: "1d4",
							duration: { unit: "turns", value: 4 },
							save: {
								attribute: "constitution",
								onSuccess: "noEffect",
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
