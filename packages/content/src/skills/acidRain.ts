import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "mage",
	description: "Summon corrosive acid from the skies.",
	effects: [
		{
			accuracy: 100,
			difficulty: 12,
			duration: 5,
			modifier: "dexterity",
			properties: [
				{
					name: "armourClass",
					type: "auxiliaryStat",
					value: -4,
				},
			],
			target: "enemy",
			type: "status",
		},
		{
			damageType: "acid",
			max: 10,
			min: 1,
			modifier: "intelligence",
			target: "enemy",
			type: "damage",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-Nc3z5D4In6VQLtKZxrV?alt=media&token=88adbc86-f012-43b3-b304-45ba2281e9fe",
	level: 1,
	maxUses: 12,
	name: "Acid Rain",
	price: 350,
	id: "acid_rain",
});
