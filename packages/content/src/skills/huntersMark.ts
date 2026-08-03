import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "hunterss_mark",
	name: "Hunter's Mark",
	description:
		"Mark the enemy as quarry, sharpening attacks and exposing them to piercing strikes.",
	icon: "skills/common/hunterss_mark.png",
	pool: "common",
	kind: "technique",
	category: "buff",
	rarity: "rare",
	maxUses: 2,
	effects: [
		{
			type: "modifyRoll",
			target: "self",
			roll: "attack",
			mode: "advantage",
			durationTurns: 4,
		},
		{
			type: "modifyDamageAffinity",
			target: "enemy",
			affinity: "vulnerability",
			operation: "add",
			damageType: "piercing",
			durationTurns: 4,
			save: {
				attribute: "dexterity",
				onSuccess: "noEffect",
				dc: { attribute: "dexterity" },
			},
		},
	],
	tags: [],
});
