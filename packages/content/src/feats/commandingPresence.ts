import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "commanding_presence",
	name: "Commanding Presence",
	description:
		"Increase your Charisma. On hit, a failed Wisdom saving throw gives the enemy disadvantage on saving throws.",
	icon: "feats/Skill_Commander_nb.png",
	kind: "utility",
	category: "utility",
	modifiers: [
		{
			type: "modifyStat",
			stat: "charisma",
			value: 6,
		},
	],
	attackRiders: [
		{
			timing: "onHit",
			save: {
				attribute: "wisdom",
				dc: { attribute: "charisma" },
				onSuccess: "noEffect",
			},
			effects: [
				{
					type: "modifyRoll",
					target: "enemy",
					roll: "savingThrow",
					mode: "disadvantage",
					duration: { unit: "turns", value: 2 },
				},
			],
		},
	],
	tags: [],
});
