import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "acquire_target",
	name: "Acquire Target",
	description: "Make your next attack roll an automatic critical hit before the effect expires.",
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
			duration: { unit: "turns", value: 4 },
		},
	],
	tags: [],
});
