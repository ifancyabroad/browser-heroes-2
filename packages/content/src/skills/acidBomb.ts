import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "acid_bomb",
	name: "Acid Bomb",
	description:
		"Throw a volatile acid bomb that bursts across the enemy and corrodes their armour.",
	icon: "skills/rogue/acid_bomb.png",
	pool: "rogue",
	kind: "technique",
	category: "damage",
	maxUses: 3,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "acid",
			dice: "3d8",
			requiresAttackRoll: false,
			save: {
				attribute: "dexterity",
				onSuccess: "halfDamage",
				dc: { attribute: "dexterity" },
			},
		},
		{
			type: "modifyStat",
			target: "enemy",
			stat: "armourClass",
			value: -3,
			durationTurns: 3,
		},
	],
	tags: [],
});
