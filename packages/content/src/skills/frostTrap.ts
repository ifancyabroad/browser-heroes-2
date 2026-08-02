import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "frost_trap",
	name: "Frost Trap",
	description: "Spring a freezing trap that wounds the enemy and hampers their attacks.",
	icon: "skills/rogue/frost_trap.png",
	pool: "rogue",
	kind: "technique",
	category: "damage",
	maxUses: 4,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "cold",
			dice: "3d8",
			requiresAttackRoll: false,
			save: {
				attribute: "dexterity",
				onSuccess: "halfDamage",
				dc: { attribute: "dexterity" },
			},
		},
		{
			type: "modifyRoll",
			target: "enemy",
			roll: "attack",
			mode: "disadvantage",
			durationTurns: 2,
			save: {
				attribute: "constitution",
				onSuccess: "noEffect",
				dc: { attribute: "dexterity" },
			},
		},
	],
	tags: [],
});
