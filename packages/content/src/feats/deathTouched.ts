import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "death_touched",
	name: "Death-Touched",
	description:
		"Necrotic damage is multiplied by 1.5. Hits deal 2d4 necrotic damage over 2 turns, but you are vulnerable to radiant damage.",
	icon: "feats/Skill_DeathMark_nb.png",
	kind: "elemental",
	category: "offensive",
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "necrotic",
			operation: "multiply",
			value: 1.5,
		},
		{
			type: "modifyDamageAffinity",
			affinity: "vulnerability",
			operation: "add",
			damageType: "radiant",
		},
	],
	attackRiders: [
		{
			timing: "onHit",
			effects: [
				{
					type: "damageOverTime",
					target: "enemy",
					damageType: "necrotic",
					damageClass: "magical",
					dice: "2d4",
					duration: {
						unit: "turns",
						value: 2,
					},
				},
			],
		},
	],
	tags: [],
});
