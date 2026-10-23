import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "inflict_wounds",
	name: "Inflict Wounds",
	description:
		"Deal necrotic damage to the enemy. A failed Constitution saving throw also causes necrotic damage over time.",
	icon: "skills/occultist/inflict_wounds.png",
	pool: "occultist",
	kind: "spell",
	category: "damage",
	rarity: "common",
	maxUses: 6,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "necrotic",
			damageClass: "magical",
			attackRange: "melee",
			dice: "1d10",
			attribute: "wisdom",
			requiresAttackRoll: false,
		},
		{
			type: "damageOverTime",
			target: "enemy",
			damageType: "necrotic",
			damageClass: "magical",
			dice: "1d6",
			duration: { unit: "turns", value: 3 },
			save: {
				attribute: "constitution",
				onSuccess: "noEffect",
				dc: { attribute: "wisdom" },
			},
		},
	],
	tags: [],
});
