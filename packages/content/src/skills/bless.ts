import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "bless",
	name: "Bless",
	description: "Gain advantage on saving throws for the current battle.",
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
			duration: { unit: "battles", value: 1 },
		},
	],
	tags: [],
});
