import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "curse",
	name: "Curse",
	description: "Give the enemy disadvantage on saving throws for the current battle.",
	icon: "skills/occultist/curse.png",
	pool: "occultist",
	kind: "spell",
	category: "debuff",
	rarity: "common",
	maxUses: 4,
	effects: [
		{
			type: "modifyRoll",
			target: "enemy",
			roll: "savingThrow",
			mode: "disadvantage",
			duration: { unit: "battles", value: 1 },
		},
	],
	tags: [],
});
