import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "go_for_the_eyes",
	name: "Go For The Eyes",
	description:
		"Make a weapon attack. On hit, a failed Constitution saving throw gives the enemy disadvantage on attack rolls.",
	icon: "skills/thief/go_for_the_eyes.png",
	pool: "thief",
	kind: "weaponAttack",
	category: "debuff",
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
					save: {
						attribute: "constitution",
						onSuccess: "noEffect",
						dc: { attribute: "dexterity" },
					},
					effects: [
						{
							type: "modifyRoll",
							target: "enemy",
							roll: "attack",
							mode: "disadvantage",
							duration: { unit: "turns", value: 4 },
						},
					],
				},
			],
		},
	],
	tags: [],
});
