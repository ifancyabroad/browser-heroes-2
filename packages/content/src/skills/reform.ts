import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "reform",
	name: "Reform",
	description: "Restore your HP over time.",
	icon: "skills/unique/reform.png",
	pool: "unique",
	kind: "spell",
	category: "heal",
	rarity: "epic",
	maxUses: 1,
	effects: [
		{
			type: "healOverTime",
			target: "self",
			dice: "6d8",
			duration: { unit: "turns", value: 4 },
		},
	],
	tags: [],
});
