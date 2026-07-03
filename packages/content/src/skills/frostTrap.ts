import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "frost_trap",
	name: "Frost Trap",
	description:
		"Set a hidden trap that delivers piercing and cold damage, with a chance to cripple the target.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OI1VwY0fN4xIxu8QMC2?alt=media&token=d4634e0e-8f48-49ca-9503-0a1550c5e99c",
	pool: "rogue",
	category: "spell",
	maxUses: 4,
	ranks: [
		{
			rank: 1,
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
		},
		{
			rank: 2,
			effects: [
				{
					type: "modifyDamage",
					target: "enemy",
					operation: "multiply",
					value: 0.75,
					durationTurns: 5,
				},
				{
					type: "damage",
					target: "enemy",
					damageType: "piercing",
					dice: "2d8+1",
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
					dice: "2d8+1",
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
		},
		{
			rank: 3,
			effects: [
				{
					type: "modifyDamage",
					target: "enemy",
					operation: "multiply",
					value: 0.75,
					durationTurns: 6,
				},
				{
					type: "damage",
					target: "enemy",
					damageType: "piercing",
					dice: "2d8+4",
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
					dice: "2d8+4",
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
		},
	],
	tags: [],
});
