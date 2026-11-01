import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "drag_down_under",
	name: "Drag Down Under",
	description:
		"Deal cold damage over time to the enemy. A failed Constitution saving throw also silences them, preventing skill use.",
	icon: "skills/common/drag_down_under.png",
	pool: "common",
	kind: "technique",
	category: "damage",
	rarity: "rare",
	maxUses: 3,
	effects: [
		{
			type: "damageOverTime",
			target: "enemy",
			damageType: "cold",
			damageClass: "other",
			dice: "4d6",
			duration: { unit: "turns", value: 3 },
		},
		{
			type: "applyStatus",
			target: "enemy",
			statusId: "silenced",
			duration: { unit: "turns", value: 3 },
			save: {
				attribute: "constitution",
				onSuccess: "noEffect",
				dc: { attribute: "strength" },
			},
		},
	],
	tags: [],
});
