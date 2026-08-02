import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "blind",
	name: "Blind",
	description:
		"Temporarily obscure your enemy’s vision, with a chance to cause their attacks to miss.",
	icon: "skills/warlock/blind.png",
	pool: "warlock",
	kind: "spell",
	category: "debuff",
	maxUses: 8,
	effects: [
		{
			type: "modifyRoll",
			target: "enemy",
			roll: "attack",
			mode: "disadvantage",
			durationTurns: 8,
		},
	],
	tags: [],
});
