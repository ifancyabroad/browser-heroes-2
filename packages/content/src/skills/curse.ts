import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "curse",
	name: "Curse",
	description: "Lay a malignant curse that leaves the enemy vulnerable to further afflictions.",
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
