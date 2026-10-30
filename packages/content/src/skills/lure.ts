import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "lure",
	name: "Lure",
	description:
		"Make the enemy's next attack roll an automatic miss and your next attack roll an automatic critical hit. Each effect lasts until consumed or the battle ends.",
	icon: "skills/unique/lure.png",
	pool: "unique",
	kind: "technique",
	category: "buff",
	rarity: "rare",
	maxUses: 1,
	effects: [
		{
			type: "modifyRoll",
			target: "enemy",
			roll: "attack",
			mode: "automaticFailure",
			charges: 1,
			duration: { unit: "turns", value: 2 },
		},
		{
			type: "modifyRoll",
			target: "self",
			roll: "attack",
			mode: "automaticCritical",
			charges: 1,
			duration: { unit: "turns", value: 2 },
		},
	],
	tags: [],
});
