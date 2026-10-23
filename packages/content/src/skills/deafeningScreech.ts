import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "deafening_screech",
	name: "Deafening Screech",
	description: "Silence the enemy on a failed Constitution saving throw, preventing skill use.",
	icon: "skills/common/deafening_screech.png",
	pool: "common",
	kind: "technique",
	category: "debuff",
	rarity: "uncommon",
	maxUses: 4,
	effects: [
		{
			type: "applyStatus",
			target: "enemy",
			statusId: "silenced",
			duration: { unit: "turns", value: 3 },
			save: {
				attribute: "constitution",
				onSuccess: "noEffect",
				dc: { attribute: "constitution" },
			},
		},
	],
	tags: [],
});
