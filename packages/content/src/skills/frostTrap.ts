import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "frost_trap",
	name: "Frost Trap",
	description:
		"Set a hidden trap that delivers piercing and cold damage, with a chance to cripple the target.",
	icon: "skills/rogue/frost_trap.png",
	pool: "rogue",
	category: "spell",
	maxUses: 4,
	effects: [
		{
			type: "modifyDamage",
			target: "enemy",
			operation: "multiply",
			value: 0.75,
			durationTurns: 4,
		},
		{
			type: "damage",
			target: "enemy",
			damageType: "piercing",
			dice: "1d8+3",
			requiresAttackRoll: false,
			save: {
				attribute: "dexterity",
				onSuccess: "noEffect",
				dc: {
					base: 8,
					attribute: "constitution",
					includeProficiency: true,
					bonus: 1,
				},
			},
		},
		{
			type: "damage",
			target: "enemy",
			damageType: "cold",
			dice: "1d8+3",
			requiresAttackRoll: false,
			save: {
				attribute: "dexterity",
				onSuccess: "noEffect",
				dc: {
					base: 8,
					attribute: "constitution",
					includeProficiency: true,
					bonus: 1,
				},
			},
		},
	],
	tags: [],
});
