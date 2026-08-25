import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "poison_shot",
	name: "Poison Shot",
	description: "Fire a poisoned projectile that delivers a persistent toxin on impact.",
	icon: "skills/common/poison_shot.png",
	pool: "common",
	kind: "weaponAttack",
	category: "damage",
	rarity: "uncommon",
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
							damageClass: "magical",
							dice: "2d4",
							duration: { unit: "turns", value: 4 },
							save: {
								attribute: "constitution",
								onSuccess: "noEffect",
								dc: { attribute: "dexterity" },
							},
						},
					],
				},
			],
		},
	],
	tags: [],
});
