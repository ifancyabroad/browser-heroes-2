import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "bonebreaker",
	name: "Bonebreaker",
	description:
		"Increase your crushing damage dealt and deal additional crushing damage on hit, but become vulnerable to piercing damage.",
	icon: "feats/skill_200_noBG.png",
	kind: "martial",
	category: "offensive",
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "crushing",
			operation: "multiply",
			value: 1.5,
		},
		{
			type: "modifyDamageAffinity",
			affinity: "vulnerability",
			operation: "add",
			damageType: "piercing",
		},
	],
	attackRiders: [
		{
			timing: "onHit",
			effects: [
				{
					type: "damage",
					target: "enemy",
					damageType: "crushing",
					damageClass: "physical",
					dice: "1d8",
				},
			],
		},
	],
	tags: [],
});
