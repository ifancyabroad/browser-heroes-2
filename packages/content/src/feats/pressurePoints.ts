import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "pressure_points",
	name: "Pressure Points",
	description:
		"Attack rolls increase by 2 and hits can impose disadvantage on enemy saving throws for 2 turns.",
	icon: "feats/Assassinskill_48_nobg.png",
	kind: "martial",
	category: "utility",
	modifiers: [
		{
			type: "modifyStat",
			stat: "attackRollBonus",
			value: 2,
		},
	],
	attackRiders: [
		{
			timing: "onHit",
			save: {
				attribute: "constitution",
				dc: {
					base: 14,
					attribute: "dexterity",
					includeProficiency: false,
					bonus: 0,
				},
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
