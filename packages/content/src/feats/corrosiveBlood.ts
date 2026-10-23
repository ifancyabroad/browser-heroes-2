import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "corrosive_blood",
	name: "Corrosive Blood",
	description:
		"Increase your acid damage dealt and deal additional acid damage on hit at the cost of Armour Class. On hit, a failed Constitution saving throw also reduces the enemy's Armour Class.",
	icon: "feats/skill_376_noBG.png",
	kind: "elemental",
	category: "offensive",
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "acid",
			operation: "multiply",
			value: 1.5,
		},
		{
			type: "modifyStat",
			stat: "armourClass",
			value: -3,
		},
	],
	attackRiders: [
		{
			timing: "onHit",
			effects: [
				{
					type: "damage",
					target: "enemy",
					damageType: "acid",
					damageClass: "magical",
					dice: "2d4",
				},
				{
					type: "modifyStat",
					target: "enemy",
					stat: "armourClass",
					value: -2,
					duration: {
						unit: "turns",
						value: 2,
					},
					save: {
						attribute: "constitution",
						dc: {
							attribute: "constitution",
						},
						onSuccess: "noEffect",
					},
				},
			],
		},
	],
	tags: [],
});
