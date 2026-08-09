import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "toxic_bite",
	name: "Toxic Bite",
	description:
		"Deliver a powerful venomous bite that poisons immediately and continues to ravage the target.",
	icon: "skills/common/toxic_bite.png",
	pool: "common",
	kind: "weaponAttack",
	category: "damage",
	rarity: "rare",
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
							type: "damage",
							target: "enemy",
							damageType: "poison",
							dice: "3d4",
							save: {
								attribute: "constitution",
								onSuccess: "halfDamage",
								dc: { attribute: "constitution" },
							},
						},
						{
							type: "damageOverTime",
							target: "enemy",
							damageType: "poison",
							dice: "2d4",
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
