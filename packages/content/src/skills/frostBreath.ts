import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "frost_breath",
	name: "Frost Breath",
	description: "Exhale killing frost that damages and may numb the enemy's attacks.",
	icon: "skills/common/frost_breath.png",
	pool: "common",
	kind: "technique",
	category: "damage",
	rarity: "epic",
	maxUses: 2,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "cold",
			damageClass: "other",
			dice: "10d6",
			requiresAttackRoll: false,
			save: {
				attribute: "constitution",
				onSuccess: "halfDamage",
				dc: { attribute: "constitution" },
			},
		},
		{
			type: "modifyRoll",
			target: "enemy",
			roll: "attack",
			mode: "disadvantage",
			duration: { unit: "turns", value: 3 },
			save: {
				attribute: "constitution",
				onSuccess: "noEffect",
				dc: { attribute: "constitution" },
			},
		},
	],
	tags: [],
});
