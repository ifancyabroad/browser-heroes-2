import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "cripple",
	name: "Cripple",
	description:
		"Make a weapon attack. On hit, a failed Constitution saving throw reduces the enemy's Initiative.",
	icon: "skills/common/cripple.png",
	pool: "common",
	kind: "weaponAttack",
	category: "debuff",
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
							type: "modifyStat",
							target: "enemy",
							stat: "initiative",
							value: -3,
							duration: { unit: "turns", value: 3 },
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
