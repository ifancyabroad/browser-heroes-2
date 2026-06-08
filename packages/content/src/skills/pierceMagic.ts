import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "pierce_magic",
	name: "Pierce Magic",
	description: "Reduce the opponents magic resistance.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-Nc404KHFQ3zZaHpCbe2?alt=media&token=b2a650c7-b8ae-4b7a-93e7-fb8f090a1e85",
	pool: "mage",
	category: "debuff",
	maxUses: 4,
	ranks: [
		{
			rank: 1,
			effects: [
				{
					type: "modifyDamage",
					target: "enemy",
					damageType: "cold",
					operation: "add",
					value: 25,
					durationTurns: 6,
				},
				{
					type: "modifyDamage",
					target: "enemy",
					damageType: "fire",
					operation: "add",
					value: 25,
					durationTurns: 6,
				},
				{
					type: "modifyDamage",
					target: "enemy",
					damageType: "lightning",
					operation: "add",
					value: 25,
					durationTurns: 6,
				},
			],
		},
		{
			rank: 2,
			effects: [
				{
					type: "modifyDamage",
					target: "enemy",
					damageType: "cold",
					operation: "add",
					value: 38,
					durationTurns: 7,
				},
				{
					type: "modifyDamage",
					target: "enemy",
					damageType: "fire",
					operation: "add",
					value: 38,
					durationTurns: 7,
				},
				{
					type: "modifyDamage",
					target: "enemy",
					damageType: "lightning",
					operation: "add",
					value: 38,
					durationTurns: 7,
				},
			],
		},
		{
			rank: 3,
			effects: [
				{
					type: "modifyDamage",
					target: "enemy",
					damageType: "cold",
					operation: "add",
					value: 50,
					durationTurns: 8,
				},
				{
					type: "modifyDamage",
					target: "enemy",
					damageType: "fire",
					operation: "add",
					value: 50,
					durationTurns: 8,
				},
				{
					type: "modifyDamage",
					target: "enemy",
					damageType: "lightning",
					operation: "add",
					value: 50,
					durationTurns: 8,
				},
			],
		},
	],
	tags: [],
});
