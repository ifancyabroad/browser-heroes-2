import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "take_aim",
	name: "Take Aim",
	description: "Gain advantage on a limited number of attack rolls before the effect expires.",
	icon: "skills/common/take_aim.png",
	pool: "common",
	kind: "technique",
	category: "buff",
	rarity: "common",
	maxUses: 4,
	effects: [
		{
			type: "modifyRoll",
			target: "self",
			roll: "attack",
			mode: "advantage",
			charges: 3,
			duration: { unit: "turns", value: 4 },
		},
	],
	tags: [],
});
