import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "spellbreaker",
	name: "Spellbreaker",
	description:
		"Saving throws increase by 4 and hits can silence the enemy for 1 turn, but skill save DC is reduced by 2.",
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
			value: -2,
		},
	],
	attackRiders: [
		{
			timing: "onHit",
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
