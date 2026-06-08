import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "nightmares",
	name: "Nightmares",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OCJnc4CZuCdQbrJEZKt?alt=media&token=5c261baf-e530-4851-872c-883aa686cee5",
	pool: "common",
	category: "spell",
	maxUses: 2,
	ranks: [
		{
			rank: 1,
			effects: [
				{
					type: "damage",
					target: "enemy",
					damageType: "necrotic",
					dice: "2d12+15",
					requiresAttackRoll: false,
					save: {
						attribute: "wisdom",
						onSuccess: "noEffect",
						dc: {
							base: 8,
							attribute: "wisdom",
							includeProficiency: true,
							bonus: 2,
						},
					},
				},
				{
					type: "modifyDamage",
					target: "enemy",
					damageType: "necrotic",
					operation: "add",
					value: 25,
					durationTurns: 2,
				},
			],
		},
		{
			rank: 2,
			effects: [
				{
					type: "damage",
					target: "enemy",
					damageType: "necrotic",
					dice: "3d12+21",
					requiresAttackRoll: false,
					save: {
						attribute: "wisdom",
						onSuccess: "noEffect",
						dc: {
							base: 8,
							attribute: "wisdom",
							includeProficiency: true,
							bonus: 2,
						},
					},
				},
				{
					type: "modifyDamage",
					target: "enemy",
					damageType: "necrotic",
					operation: "add",
					value: 38,
					durationTurns: 3,
				},
			],
		},
		{
			rank: 3,
			effects: [
				{
					type: "damage",
					target: "enemy",
					damageType: "necrotic",
					dice: "4d12+27",
					requiresAttackRoll: false,
					save: {
						attribute: "wisdom",
						onSuccess: "noEffect",
						dc: {
							base: 8,
							attribute: "wisdom",
							includeProficiency: true,
							bonus: 2,
						},
					},
				},
				{
					type: "modifyDamage",
					target: "enemy",
					damageType: "necrotic",
					operation: "add",
					value: 50,
					durationTurns: 4,
				},
			],
		},
	],
	tags: [],
});
