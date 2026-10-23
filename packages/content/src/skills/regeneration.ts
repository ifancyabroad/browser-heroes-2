import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "regeneration",
	name: "Regeneration",
	description: "Restore your HP over time.",
	icon: "skills/common/regeneration.png",
	pool: "common",
	kind: "technique",
	category: "heal",
	rarity: "uncommon",
	maxUses: 2,
	effects: [
		{
			type: "healOverTime",
			target: "self",
			dice: "1d8",
			duration: { unit: "turns", value: 4 },
		},
	],
	tags: [],
});
