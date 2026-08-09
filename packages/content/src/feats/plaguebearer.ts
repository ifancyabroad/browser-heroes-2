import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "plaguebearer",
	name: "Plaguebearer",
	description:
		"Poison damage is multiplied by 1.5. Hits poison the enemy for 2d4 damage over 2 turns, but all healing received is halved.",
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
					dice: "2d4",
					duration: { unit: "turns", value: 2 },
				},
			],
		},
	],
	tags: [],
});
