import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "dawn_blessed",
	name: "Dawn-Blessed",
	description:
		"Radiant damage is multiplied by 1.5. Hits deal an additional 1d6 radiant damage and critical hits grant a 15-point shield for 2 turns, but you are vulnerable to necrotic damage.",
	icon: "feats/Skill_HolyMagic_nb.png",
	kind: "elemental",
	category: "offensive",
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "radiant",
			operation: "multiply",
			value: 1.5,
		},
		{
			type: "modifyDamageAffinity",
			affinity: "vulnerability",
			operation: "add",
			damageType: "necrotic",
		},
	],
	attackRiders: [
		{
			timing: "onHit",
			effects: [
				{
					type: "damage",
					target: "enemy",
					damageType: "radiant",
					dice: "1d6",
				},
			],
		},
		{
			timing: "onCrit",
			effects: [
				{
					type: "shield",
					target: "self",
					amount: 15,
					duration: { unit: "turns", value: 2 },
				},
			],
		},
	],
	tags: [],
});
