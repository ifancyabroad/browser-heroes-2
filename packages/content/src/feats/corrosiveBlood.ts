import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "corrosive_blood",
	name: "Corrosive Blood",
	description:
		"Acid damage is multiplied by 1.5. Hits deal an additional 1d8 acid damage and can reduce enemy Armour Class by 2 for 2 turns, but your Armour Class is reduced by 3.",
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
					dice: "1d8",
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
