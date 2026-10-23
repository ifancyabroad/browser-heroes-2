import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "winters_heart",
	name: "Winter's Heart",
	description:
		"Increase your cold damage dealt and deal additional cold damage on hit, but become vulnerable to fire damage.",
	icon: "feats/Skill_FrostSpirit_nb.png",
	kind: "elemental",
	category: "offensive",
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "cold",
			operation: "multiply",
			value: 1.5,
		},
		{
			type: "modifyDamageAffinity",
			affinity: "vulnerability",
			operation: "add",
			damageType: "fire",
		},
	],
	attackRiders: [
		{
			timing: "onHit",
			effects: [
				{
					type: "damage",
					target: "enemy",
					damageType: "cold",
					damageClass: "magical",
					dice: "1d8",
				},
			],
		},
	],
	tags: [],
});
