import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "focus_energy",
	name: "Focus Energy",
	description: "Channel your concentration to sharpen precision and increase hit accuracy.",
	icon: "skills/warrior/focus_energy.png",
	pool: "warrior",
	kind: "technique",
	category: "buff",
	maxUses: 6,
	effects: [
		{
			type: "modifyRoll",
			target: "self",
			roll: "attack",
			mode: "advantage",
			durationTurns: 4,
		},
	],
	tags: [],
});
