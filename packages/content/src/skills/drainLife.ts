import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "drain_life",
	name: "Drain Life",
	description:
		"Unleash necrotic energy to damage your enemy while siphoning their life force to restore your own health.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NgTbEHpokQy-0H5xsHh?alt=media&token=e978b5e3-acb5-417a-b99d-377658894756",
	pool: "occultist",
	category: "heal",
	maxUses: 2,
	ranks: [
		{
			rank: 1,
			effects: [
				{
					type: "damage",
					target: "enemy",
					damageType: "necrotic",
					dice: "1d10+5",
					attribute: "wisdom",
					requiresAttackRoll: false,
				},
				{
					type: "heal",
					target: "self",
					dice: "1d10+5",
					attribute: "wisdom",
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
					dice: "2d10+4",
					attribute: "wisdom",
					requiresAttackRoll: false,
				},
				{
					type: "heal",
					target: "self",
					dice: "2d10+4",
					attribute: "wisdom",
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
					dice: "2d10+9",
					attribute: "wisdom",
					requiresAttackRoll: false,
				},
				{
					type: "heal",
					target: "self",
					dice: "2d10+9",
					attribute: "wisdom",
				},
			],
		},
	],
	tags: [],
});
