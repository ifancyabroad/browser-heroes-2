import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "renew",
	name: "Renew",
	description:
		"Invoke divine restoration that immediately mends wounds and continues healing over time.",
	icon: "skills/cleric/renew.png",
	pool: "cleric",
	kind: "prayer",
	category: "heal",
	maxUses: 3,
	effects: [
		{
			type: "heal",
			target: "self",
			dice: "2d6",
		},
		{
			type: "healOverTime",
			target: "self",
			dice: "1d6",
			durationTurns: 4,
		},
	],
	tags: [],
});
