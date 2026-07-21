import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "sunburst",
	name: "Sunburst",
	description:
		"Unleash a blinding burst of radiant energy, dealing significant damage with a chance to blind your enemies.",
	icon: "skills/cleric/sunburst.png",
	pool: "cleric",
	category: "spell",
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
			type: "modifyDamage",
			target: "enemy",
			operation: "multiply",
			value: 0.75,
			durationTurns: 4,
		},
	],
	tags: [],
});
