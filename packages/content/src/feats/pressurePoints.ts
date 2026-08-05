import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "pressure_points",
	name: "Pressure Points",
	description: "Hits can impose disadvantage on the enemy's saving throws for 2 turns.",
	icon: "feats/Assassinskill_48_nobg.png",
	kind: "training",
	category: "utility",
	modifiers: [],
	attackRiders: [
		{
			timing: "onHit",
			save: {
				attribute: "constitution",
				dc: {
					base: 12,
					attribute: "constitution",
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
