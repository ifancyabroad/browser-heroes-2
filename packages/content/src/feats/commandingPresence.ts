import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "commanding_presence",
	name: "Commanding Presence",
	description:
		"Charisma increases by 6. Hits can impose disadvantage on enemy saving throws for 2 turns using your Charisma.",
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
