import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "sunburst",
	name: "Sunburst",
	description: "Unleash overwhelming sunlight that sears the enemy and may leave them blinded.",
	icon: "skills/cleric/sunburst.png",
	pool: "cleric",
	kind: "prayer",
	category: "damage",
	maxUses: 2,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "radiant",
			dice: "4d8",
			attribute: "wisdom",
			requiresAttackRoll: false,
			save: {
				attribute: "constitution",
				onSuccess: "halfDamage",
				dc: { attribute: "wisdom" },
			},
		},
		{
			type: "modifyRoll",
			target: "enemy",
			roll: "attack",
			mode: "disadvantage",
			durationTurns: 4,
			save: {
				attribute: "constitution",
				onSuccess: "noEffect",
				dc: { attribute: "wisdom" },
			},
		},
	],
	tags: [],
});
