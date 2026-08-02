import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "unwavering_lies",
	name: "Unwavering Lies",
	description:
		"Speak lies with such conviction that the enemy may doubt their strength and judgement.",
	icon: "skills/unique/unwavering_lies.png",
	pool: "unique",
	kind: "spell",
	category: "debuff",
	maxUses: 2,
	effects: [
		{
			type: "modifyDamage",
			target: "enemy",
			operation: "multiply",
			value: 0.5,
			durationTurns: 4,
			save: {
				attribute: "wisdom",
				onSuccess: "noEffect",
				dc: { attribute: "charisma" },
			},
		},
		{
			type: "modifyRoll",
			target: "enemy",
			roll: "savingThrow",
			mode: "disadvantage",
			durationTurns: 4,
			save: {
				attribute: "wisdom",
				onSuccess: "noEffect",
				dc: { attribute: "charisma" },
			},
		},
	],
	tags: [],
});
