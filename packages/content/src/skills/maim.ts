import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "maim",
	name: "Maim",
	description: "Deliver a vicious cut that can leave the enemy bleeding and weakened.",
	icon: "skills/assassin/maim.png",
	pool: "assassin",
	kind: "weaponAttack",
	category: "damage",
	rarity: "epic",
	maxUses: 2,
	effects: [
		{
			type: "attackDamage",
			target: "enemy",
			multiplier: 2,
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
							type: "modifyDamage",
							target: "enemy",
							operation: "multiply",
							value: 0.75,
							duration: { unit: "turns", value: 2 },
						},
						{
							type: "damageOverTime",
							target: "enemy",
							damageType: "slashing",
							dice: "2d4",
							duration: { unit: "turns", value: 3 },
						},
					],
				},
			],
		},
	],
	tags: [],
});
