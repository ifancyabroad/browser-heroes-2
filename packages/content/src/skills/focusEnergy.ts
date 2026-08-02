import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "focus_energy",
	name: "Focus Energy",
	description: "Channel your concentration to sharpen precision and increase hit accuracy.",
	icon: "skills/warrior/focus_energy.png",
	pool: "warrior",
	category: "buff",
	maxUses: 6,
	effects: [
		{
			type: "modifyStat",
			target: "self",
			stat: "attackRollBonus",
			value: 2,
			durationTurns: 8,
		},
	],
	tags: [],
});
