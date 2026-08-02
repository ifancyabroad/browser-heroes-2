import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "stoke_the_flames",
	name: "Stoke the Flames",
	description:
		"Feed the inner flame to substantially increase fire damage for the coming assault.",
	icon: "skills/unique/stoke_the_flames.png",
	pool: "unique",
	kind: "spell",
	category: "buff",
	maxUses: 1,
	effects: [
		{
			type: "modifyDamage",
			target: "self",
			damageType: "fire",
			operation: "multiply",
			value: 1.4,
			durationTurns: 4,
		},
	],
	tags: [],
});
