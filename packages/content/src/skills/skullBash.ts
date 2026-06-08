import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "skull_bash",
	name: "Skull Bash",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OCUDaUsTx_tLKhlQzc6?alt=media&token=65159a77-f38c-4e64-be8f-589968f22505",
	pool: "common",
	category: "spell",
	maxUses: 5,
	ranks: [
		{
			rank: 1,
			effects: [
				{
					type: "modifyDamage",
					target: "enemy",
					damageType: "crushing",
					operation: "add",
					value: 25,
					durationTurns: 5,
				},
				{
					type: "damage",
					target: "enemy",
					damageType: "crushing",
					dice: "1d8+3",
					requiresAttackRoll: false,
					save: {
						attribute: "constitution",
						onSuccess: "noEffect",
						dc: {
							base: 8,
							attribute: "constitution",
							includeProficiency: true,
							bonus: 2,
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
					damageType: "crushing",
					operation: "add",
					value: 38,
					durationTurns: 6,
				},
				{
					type: "damage",
					target: "enemy",
					damageType: "crushing",
					dice: "2d8+1",
					requiresAttackRoll: false,
					save: {
						attribute: "constitution",
						onSuccess: "noEffect",
						dc: {
							base: 8,
							attribute: "constitution",
							includeProficiency: true,
							bonus: 2,
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
					damageType: "crushing",
					operation: "add",
					value: 50,
					durationTurns: 7,
				},
				{
					type: "damage",
					target: "enemy",
					damageType: "crushing",
					dice: "2d8+4",
					requiresAttackRoll: false,
					save: {
						attribute: "constitution",
						onSuccess: "noEffect",
						dc: {
							base: 8,
							attribute: "constitution",
							includeProficiency: true,
							bonus: 2,
						},
					},
				},
			],
		},
	],
	tags: [],
});
