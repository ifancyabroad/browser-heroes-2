import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "deep_wounds",
	name: "Deep Wounds",
	description:
		"Slashing damage is multiplied by 1.5. Hits inflict 2d4 slashing damage over 2 turns, but you are vulnerable to crushing damage.",
	icon: "feats/skill_24_pierce.png",
	kind: "martial",
	category: "offensive",
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "slashing",
			operation: "multiply",
			value: 1.5,
		},
		{
			type: "modifyDamageAffinity",
			affinity: "vulnerability",
			operation: "add",
			damageType: "crushing",
		},
	],
	attackRiders: [
		{
			timing: "onHit",
			effects: [
				{
					type: "damageOverTime",
					target: "enemy",
					damageType: "slashing",
					damageClass: "physical",
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
