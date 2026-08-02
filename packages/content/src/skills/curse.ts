import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "curse",
	name: "Curse",
	description: "Inflict a debilitating curse that hinders the enemy's saving throws.",
	icon: "skills/occultist/curse.png",
	pool: "occultist",
	category: "debuff",
	maxUses: 8,
	effects: [
		{
			type: "modifyRoll",
			target: "enemy",
			roll: "savingThrow",
			mode: "disadvantage",
			durationTurns: 6,
		},
	],
	tags: [],
});
