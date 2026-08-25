import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "disease_shot",
	name: "Disease Shot",
	description: "Fire a diseased projectile that infects its target with lingering poison.",
	icon: "skills/common/disease_shot.png",
	pool: "common",
	kind: "weaponAttack",
	category: "damage",
	rarity: "rare",
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
							damageType: "poison",
							damageClass: "magical",
							dice: "3d4",
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
