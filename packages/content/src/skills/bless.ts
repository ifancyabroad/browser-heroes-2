import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "bless",
	name: "Bless",
	description: "Invoke a sacred boon that grants divine favour against harmful effects.",
	icon: "skills/common/bless.png",
	pool: "common",
	kind: "prayer",
	category: "buff",
	rarity: "common",
	maxUses: 4,
	effects: [
		{
			type: "modifyRoll",
			target: "self",
			roll: "savingThrow",
			mode: "advantage",
			durationTurns: 6,
		},
	],
	tags: [],
});
