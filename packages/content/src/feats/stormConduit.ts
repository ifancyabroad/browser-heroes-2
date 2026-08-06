import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "storm_conduit",
	name: "Storm Conduit",
	description:
		"Lightning damage is multiplied by 1.5. Hits deal an additional 1d6 lightning damage and critical hits deal a further 1d8, but you are vulnerable to lightning damage.",
	icon: "feats/Skill_LightningUltimate_nb.png",
	kind: "elemental",
	category: "offensive",
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "lightning",
			operation: "multiply",
			value: 1.5,
		},
		{
			type: "modifyDamageAffinity",
			affinity: "vulnerability",
			operation: "add",
			damageType: "lightning",
		},
	],
	attackRiders: [
		{
			timing: "onHit",
			effects: [
				{
					type: "damage",
					target: "enemy",
					damageType: "lightning",
					dice: "1d6",
				},
			],
		},
		{
			timing: "onCrit",
			effects: [
				{
					type: "damage",
					target: "enemy",
					damageType: "lightning",
					dice: "1d8",
				},
			],
		},
	],
	tags: [],
});
