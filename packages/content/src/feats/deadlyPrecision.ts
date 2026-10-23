import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "deadly_precision",
	name: "Deadly Precision",
	description:
		"Increase your piercing damage dealt and deal additional piercing damage on hit, but become vulnerable to slashing damage. Critical hits temporarily make the enemy vulnerable to piercing damage.",
	icon: "feats/Archerskill_50_nobg.png",
	kind: "martial",
	category: "offensive",
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "piercing",
			operation: "multiply",
			value: 1.5,
		},
		{
			type: "modifyDamageAffinity",
			affinity: "vulnerability",
			operation: "add",
			damageType: "slashing",
		},
	],
	attackRiders: [
		{
			timing: "onHit",
			effects: [
				{
					type: "damage",
					target: "enemy",
					damageType: "piercing",
					damageClass: "physical",
					dice: "1d6",
				},
			],
		},
		{
			timing: "onCrit",
			effects: [
				{
					type: "modifyDamageAffinity",
					target: "enemy",
					affinity: "vulnerability",
					operation: "add",
					damageType: "piercing",
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
