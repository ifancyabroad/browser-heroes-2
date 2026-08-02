import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "renew",
	name: "Renew",
	description: "Invoke sustained divine restoration that steadily mends wounds over time.",
	icon: "skills/cleric/renew.png",
	pool: "cleric",
	kind: "prayer",
	category: "heal",
	maxUses: 3,
	effects: [
		{
			type: "healOverTime",
			target: "self",
			dice: "2d6",
			durationTurns: 4,
		},
	],
	tags: [],
});
