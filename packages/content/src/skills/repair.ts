import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "repair",
	name: "Repair",
	description: "Restore your HP over time.",
	icon: "skills/common/repair.png",
	pool: "common",
	kind: "technique",
	category: "heal",
	rarity: "rare",
	maxUses: 1,
	effects: [
		{
			type: "healOverTime",
			target: "self",
			dice: "3d8",
			duration: { unit: "turns", value: 4 },
		},
	],
	tags: [],
});
