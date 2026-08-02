import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "sunburst",
	name: "Sunburst",
	description:
		"Unleash a blinding burst of radiant energy, dealing significant damage with a chance to blind your enemies.",
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
			dice: "2d12+8",
			attribute: "wisdom",
			requiresAttackRoll: false,
		},
		{
			type: "modifyRoll",
			target: "enemy",
			roll: "attack",
			mode: "disadvantage",
			durationTurns: 4,
		},
	],
	tags: [],
});
