import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "rogue",
	description: "Fling acid at the enemy to corrode their defense.",
	effects: [
		{
			damageType: "acid",
			max: 12,
			min: 1,
			target: "enemy",
			type: "damage",
		},
		{
			accuracy: 50,
			difficulty: 19,
			duration: 4,
			modifier: "dexterity",
			properties: [
				{
					name: "armourClass",
					type: "auxiliaryStat",
					value: -5,
				},
			],
			target: "enemy",
			type: "status",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NZqaJ9QZYIpe6P1iDYy?alt=media&token=a61f4af5-9abf-4e8c-b41c-2cabd76120a1",
	level: 2,
	maxUses: 6,
	name: "Acid Burn",
	price: 120,
	id: "acid_burn",
});
