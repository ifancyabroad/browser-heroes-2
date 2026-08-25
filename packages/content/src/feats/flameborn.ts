import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "flameborn",
	name: "Flameborn",
	description:
		"Fire damage is multiplied by 1.5. Hits deal an additional 1d8 fire damage, but you are vulnerable to cold damage.",
	icon: "feats/Skill_FireMaster_nb.png",
	kind: "elemental",
	category: "offensive",
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "fire",
			operation: "multiply",
			value: 1.5,
		},
		{
			type: "modifyDamageAffinity",
			affinity: "vulnerability",
			operation: "add",
			damageType: "cold",
		},
	],
	attackRiders: [
		{
			timing: "onHit",
			effects: [
				{
					type: "damage",
					target: "enemy",
					damageType: "fire",
					damageClass: "magical",
					dice: "1d8",
				},
			],
		},
	],
	tags: [],
});
