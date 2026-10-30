import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "explosive_shot",
	name: "Explosive Shot",
	description:
		"Make a weapon attack, then deal additional crushing damage even if the attack misses. A failed Constitution saving throw also causes fire damage over time.",
	icon: "skills/unique/explosive_shot.png",
	pool: "unique",
	kind: "weaponAttack",
	category: "damage",
	rarity: "rare",
	maxUses: 2,
	effects: [
		{
			type: "attackDamage",
			target: "enemy",
			multiplier: 1,
		},
		{
			type: "damage",
			target: "enemy",
			damageType: "crushing",
			damageClass: "physical",
			attackRange: "ranged",
			dice: "6d6",
			requiresAttackRoll: false,
			save: {
				attribute: "dexterity",
				onSuccess: "halfDamage",
				dc: { attribute: "dexterity" },
			},
		},
		{
			type: "damageOverTime",
			target: "enemy",
			damageType: "fire",
			damageClass: "other",
			dice: "2d6",
			duration: { unit: "turns", value: 3 },
			save: {
				attribute: "constitution",
				onSuccess: "noEffect",
				dc: { attribute: "dexterity" },
			},
		},
	],
	tags: [],
});
