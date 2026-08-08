import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "storm_conduit",
	name: "Storm Conduit",
	description:
		"Lightning damage is multiplied by 1.5. Critical hits deal an additional 2d6 lightning damage and grant advantage on your next attack, but you are vulnerable to lightning damage.",
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
			timing: "onCrit",
			effects: [
				{
					type: "damage",
					target: "enemy",
					damageType: "lightning",
					dice: "2d6",
				},
				{
					type: "modifyRoll",
					target: "self",
					roll: "attack",
					mode: "advantage",
					charges: 1,
					duration: { unit: "turns", value: 1 },
				},
			],
		},
	],
	tags: [],
});
