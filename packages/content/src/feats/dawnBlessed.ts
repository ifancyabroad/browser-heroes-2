import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "dawn_blessed",
	name: "Dawn-Blessed",
	description:
		"Increase your radiant damage dealt and deal additional radiant damage on hit, but become vulnerable to necrotic damage. Critical hits grant a shield that absorbs incoming damage.",
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
					damageClass: "magical",
					dice: "1d6",
					requiresAttackRoll: false,
				},
			],
		},
		{
			timing: "onCrit",
			effects: [
				{
					type: "shield",
					target: "self",
					amount: 10,
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
