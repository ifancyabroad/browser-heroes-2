import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "flamestrike",
	name: "Flamestrike",
	description:
		"Call down a powerful strike of both fire and radiant energy, burning and searing enemies in its path.",
	icon: "skills/cleric/flamestrike.png",
	pool: "cleric",
	category: "spell",
	maxUses: 3,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "fire",
			dice: "1d8+3",
			attribute: "wisdom",
			requiresAttackRoll: false,
		},
		{
			type: "damage",
			target: "enemy",
			damageType: "radiant",
			dice: "1d8+3",
			attribute: "wisdom",
			requiresAttackRoll: false,
		},
	],
	tags: [],
});
