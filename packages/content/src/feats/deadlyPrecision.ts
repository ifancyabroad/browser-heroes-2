import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "deadly_precision",
	name: "Deadly Precision",
	description:
		"Piercing damage is multiplied by 1.5. Hits deal an additional 1d6 piercing damage. Critical hits expose a weak point, making the enemy vulnerable to piercing damage until the end of your next turn, but you are vulnerable to slashing damage.",
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
