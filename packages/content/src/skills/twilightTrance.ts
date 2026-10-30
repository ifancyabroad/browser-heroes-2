import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "twilight_trance",
	name: "Twilight Trance",
	description: "Make your attack rolls automatic hits for 4 turns.",
	icon: "skills/unique/twilight_trance.png",
	pool: "unique",
	kind: "technique",
	category: "buff",
	rarity: "rare",
	maxUses: 1,
	effects: [
		{
			type: "modifyRoll",
			target: "self",
			roll: "attack",
			mode: "automaticSuccess",
			duration: { unit: "turns", value: 4 },
		},
	],
	tags: [],
});
