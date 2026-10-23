import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "plaguebearer",
	name: "Plaguebearer",
	description:
		"Increase your poison damage dealt and deal additional poison damage over time on hit at the cost of healing.",
	icon: "feats/Aura_Infection_nb.png",
	kind: "elemental",
	category: "offensive",
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "poison",
			operation: "multiply",
			value: 1.5,
		},
		{
			type: "modifyHealing",
			multiplier: 0.5,
		},
	],
	attackRiders: [
		{
			timing: "onHit",
			effects: [
				{
					type: "damageOverTime",
					target: "enemy",
					damageType: "poison",
					damageClass: "magical",
					dice: "2d4",
					duration: { unit: "turns", value: 2 },
				},
			],
		},
	],
	tags: [],
});
