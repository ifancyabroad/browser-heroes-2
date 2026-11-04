import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "frost_trap",
	name: "Frost Trap",
	description:
		"Deal piercing and cold damage to the enemy. A failed Constitution saving throw also reduces their Initiative.",
	icon: "skills/thief/frost_trap.png",
	pool: "thief",
	kind: "technique",
	category: "damage",
	rarity: "uncommon",
	maxUses: 4,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "piercing",
			damageClass: "physical",
			dice: "2d8",
			requiresAttackRoll: false,
			save: {
				attribute: "dexterity",
				onSuccess: "halfDamage",
				dc: { attribute: "dexterity" },
			},
		},
		{
			type: "damage",
			target: "enemy",
			damageType: "cold",
			damageClass: "other",
			dice: "2d8",
			requiresAttackRoll: false,
			save: {
				attribute: "dexterity",
				onSuccess: "halfDamage",
				dc: { attribute: "dexterity" },
			},
		},
		{
			type: "modifyStat",
			target: "enemy",
			stat: "initiative",
			value: -3,
			duration: { unit: "turns", value: 3 },
			save: {
				attribute: "constitution",
				onSuccess: "noEffect",
				dc: { attribute: "dexterity" },
			},
		},
	],
	tags: [],
});
