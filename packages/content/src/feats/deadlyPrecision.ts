import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "deadly_precision",
	name: "Deadly Precision",
	description:
		"Piercing damage is multiplied by 1.5. Critical hits deal an additional 2d8 piercing damage and grant advantage on your next attack, but you are vulnerable to slashing damage.",
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
			timing: "onCrit",
			effects: [
				{
					type: "damage",
					target: "enemy",
					damageType: "piercing",
					dice: "2d8",
				},
				{
					type: "modifyRoll",
					target: "self",
					roll: "attack",
					mode: "advantage",
					charges: 1,
					duration: {
						unit: "turns",
						value: 1,
					},
				},
			],
		},
	],
	tags: [],
});
