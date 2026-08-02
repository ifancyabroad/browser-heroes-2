import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "stoke_the_flames",
	name: "Stoke the Flames",
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
			operation: "add",
			value: 40,
			durationTurns: 4,
		},
	],
	tags: [],
});
