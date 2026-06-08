import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "knock_down",
	name: "Knock Down",
	description:
		"Topple adversaries with the forceful Knock Down skill, sending enemies crashing to the ground in a stunning display of power.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NhgrvvBiejH010EI8ME?alt=media&token=562118d9-90e1-4dc3-91fc-3a3ca57c6ea5",
	pool: "common",
	category: "spell",
	maxUses: 1,
	ranks: [
		{
			rank: 1,
			effects: [
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "stunned",
					durationTurns: 2,
				},
				{
					type: "damage",
					target: "enemy",
					damageType: "crushing",
					dice: "1d12+8",
					requiresAttackRoll: false,
					save: {
						attribute: "constitution",
						onSuccess: "noEffect",
						dc: {
							base: 8,
							attribute: "strength",
							includeProficiency: true,
							bonus: 0,
						},
					},
				},
			],
		},
		{
			rank: 2,
			effects: [
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "stunned",
					durationTurns: 3,
				},
				{
					type: "damage",
					target: "enemy",
					damageType: "crushing",
					dice: "2d12+7",
					requiresAttackRoll: false,
					save: {
						attribute: "constitution",
						onSuccess: "noEffect",
						dc: {
							base: 8,
							attribute: "strength",
							includeProficiency: true,
							bonus: 0,
						},
					},
				},
			],
		},
		{
			rank: 3,
			effects: [
				{
					type: "applyStatus",
					target: "enemy",
					statusId: "stunned",
					durationTurns: 4,
				},
				{
					type: "damage",
					target: "enemy",
					damageType: "crushing",
					dice: "2d12+14",
					requiresAttackRoll: false,
					save: {
						attribute: "constitution",
						onSuccess: "noEffect",
						dc: {
							base: 8,
							attribute: "strength",
							includeProficiency: true,
							bonus: 0,
						},
					},
				},
			],
		},
	],
	tags: [],
});
