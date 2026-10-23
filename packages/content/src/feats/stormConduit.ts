import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "storm_conduit",
	name: "Storm Conduit",
	description:
		"Increase your lightning damage dealt, but become vulnerable to lightning damage. Critical hits deal additional lightning damage and grant advantage on your next attack roll.",
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
					damageClass: "magical",
					dice: "2d8",
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
