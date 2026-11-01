import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "power_word_decay",
	name: "Power Word: Decay",
	description:
		"Make the enemy vulnerable to necrotic damage and deal necrotic damage over time, each requiring a separate failed Constitution saving throw.",
	icon: "skills/common/power_word_decay.png",
	pool: "common",
	kind: "spell",
	category: "debuff",
	rarity: "epic",
	maxUses: 3,
	effects: [
		{
			type: "modifyDamageAffinity",
			target: "enemy",
			affinity: "vulnerability",
			operation: "add",
			damageType: "necrotic",
			duration: { unit: "battles", value: 1 },
			save: {
				attribute: "constitution",
				onSuccess: "noEffect",
				dc: { attribute: "wisdom" },
			},
		},
		{
			type: "damageOverTime",
			target: "enemy",
			damageType: "necrotic",
			damageClass: "magical",
			dice: "2d4",
			duration: { unit: "turns", value: 4 },
			save: {
				attribute: "constitution",
				onSuccess: "noEffect",
				dc: { attribute: "wisdom" },
			},
		},
	],
	tags: [],
});
