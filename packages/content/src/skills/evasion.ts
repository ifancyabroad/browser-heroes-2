import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "evasion",
	name: "Evasion",
	description: "Swiftly dodge incoming attacks, greatly reducing the chance of being hit.",
	icon: "skills/rogue/evasion.png",
	pool: "rogue",
	kind: "technique",
	category: "defensive",
	maxUses: 3,
	effects: [
		{
			type: "modifyStat",
			target: "self",
			stat: "armourClass",
			value: 10,
			durationTurns: 3,
		},
	],
	tags: [],
});
