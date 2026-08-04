import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "frost_trap",
	name: "Frost Trap",
	description:
		"Spring a freezing trap whose spikes pierce the enemy as its cold hampers their attacks.",
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
			dice: "2d8",
			requiresAttackRoll: false,
			save: {
				attribute: "dexterity",
				onSuccess: "halfDamage",
				dc: { attribute: "dexterity" },
			},
		},
		{
			type: "modifyRoll",
			target: "enemy",
			roll: "attack",
			mode: "disadvantage",
			durationTurns: 3,
			save: {
				attribute: "constitution",
				onSuccess: "noEffect",
				dc: { attribute: "dexterity" },
			},
		},
	],
	tags: [],
});
