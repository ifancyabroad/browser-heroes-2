import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "death_touched",
	name: "Death-Touched",
	description:
		"Increase your necrotic damage dealt and deal additional necrotic damage over time on hit, but become vulnerable to radiant damage.",
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
