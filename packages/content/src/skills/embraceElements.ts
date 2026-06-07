import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "embrace_elements",
	name: "Embrace Elements",
	description: "Fuse with elements, amplifying prowess in elemental warfare.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-Nhh3D7-ihgBpi0AbfB5?alt=media&token=7a3eb5c6-1571-4e5d-8945-9efb3875f991",
	pool: "mage",
	category: "buff",
	usage: {
		target: "self",
		requiresAttackRoll: false,
		maxUses: 4,
	},
	ranks: [
		{
			rank: 1,
			effects: [
				{
					type: "modifyDamage",
					target: "self",
					damageType: "cold",
					operation: "add",
					value: 50,
					durationTurns: 8,
				},
				{
					type: "modifyDamage",
					target: "self",
					damageType: "fire",
					operation: "add",
					value: 50,
					durationTurns: 8,
				},
				{
					type: "modifyDamage",
					target: "self",
					damageType: "lightning",
					operation: "add",
					value: 50,
					durationTurns: 8,
				},
			],
		},
		{
			rank: 2,
			effects: [
				{
					type: "modifyDamage",
					target: "self",
					damageType: "cold",
					operation: "add",
					value: 75,
					durationTurns: 9,
				},
				{
					type: "modifyDamage",
					target: "self",
					damageType: "fire",
					operation: "add",
					value: 75,
					durationTurns: 9,
				},
				{
					type: "modifyDamage",
					target: "self",
					damageType: "lightning",
					operation: "add",
					value: 75,
					durationTurns: 9,
				},
			],
		},
		{
			rank: 3,
			effects: [
				{
					type: "modifyDamage",
					target: "self",
					damageType: "cold",
					operation: "add",
					value: 100,
					durationTurns: 10,
				},
				{
					type: "modifyDamage",
					target: "self",
					damageType: "fire",
					operation: "add",
					value: 100,
					durationTurns: 10,
				},
				{
					type: "modifyDamage",
					target: "self",
					damageType: "lightning",
					operation: "add",
					value: 100,
					durationTurns: 10,
				},
			],
		},
	],
	tags: [],
});
