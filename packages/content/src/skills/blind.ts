import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "blind",
	name: "Blind",
	description:
		"Temporarily obscure your enemy’s vision, with a chance to cause their attacks to miss.",
	icon: "skills/warlock/blind.png",
	pool: "warlock",
	category: "debuff",
	maxUses: 8,
	effects: [
		{
			type: "modifyDamage",
			target: "enemy",
			operation: "multiply",
			value: 0.75,
			durationTurns: 8,
		},
	],
	tags: [],
});
