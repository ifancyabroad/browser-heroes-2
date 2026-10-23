import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "spellbreaker",
	name: "Spellbreaker",
	description:
		"Increase your saving throw bonus at the cost of your saving throw DCs. On hit, a failed Wisdom saving throw silences the enemy.",
	icon: "feats/Skill_IceArmorDestroy_nb.png",
	kind: "martial",
	category: "utility",
	modifiers: [
		{
			type: "modifyStat",
			stat: "savingThrowBonus",
			value: 4,
		},
		{
			type: "modifyStat",
			stat: "saveDcBonus",
			value: -4,
		},
	],
	attackRiders: [
		{
			timing: "onHit",
			save: {
				attribute: "wisdom",
				dc: {
					attribute: "wisdom",
					bonus: 4,
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
