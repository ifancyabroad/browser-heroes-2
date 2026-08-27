import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "cripple",
	name: "Cripple",
	description: "Strike with a debilitating injury that may weaken the enemy's attacks.",
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
							type: "modifyDamage",
							target: "enemy",
							damageClass: "physical",
							operation: "multiply",
							value: 0.75,
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
