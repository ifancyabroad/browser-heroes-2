import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "acquire_target",
	name: "Acquire Target",
	description: "Lock onto the enemy to guarantee a critical hit with the next attack.",
	icon: "skills/unique/acquire_target.png",
	pool: "unique",
	kind: "technique",
	category: "buff",
	rarity: "uncommon",
	maxUses: 3,
	effects: [
		{
			type: "modifyRoll",
			target: "self",
			roll: "attack",
			mode: "automaticCritical",
			charges: 1,
			durationTurns: 4,
		},
	],
	tags: [],
});
