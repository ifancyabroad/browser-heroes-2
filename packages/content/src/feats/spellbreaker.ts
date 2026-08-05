import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "spellbreaker",
	name: "Spellbreaker",
	description: "Critical hits can silence the enemy for 1 turn.",
	icon: "feats/Skill_IceArmorDestroy_nb.png",
	kind: "training",
	category: "utility",
	modifiers: [],
	attackRiders: [
		{
			timing: "onCrit",
			save: {
				attribute: "wisdom",
				dc: {
					base: 14,
					attribute: "wisdom",
					includeProficiency: false,
					bonus: 0,
				},
				onSuccess: "noEffect",
			},
			effects: [
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "silenced",
					duration: { unit: "turns", value: 1 },
				},
			],
		},
	],
	tags: [],
});
