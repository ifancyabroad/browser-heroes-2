import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "mage",
	description: "Emit a frigid blast, freezing enemies in a wide cone.",
	effects: [
		{
			damageType: "cold",
			max: 20,
			min: 8,
			modifier: "intelligence",
			target: "enemy",
			type: "damage",
		},
		{
			difficulty: 18,
			duration: 4,
			modifier: "constitution",
			properties: [
				{
					name: "dexterity",
					type: "stat",
					value: -4,
				},
			],
			target: "enemy",
			type: "status",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-Nhh5vG7znDT-6DBan2F?alt=media&token=4bfc216a-ef3b-4f89-a987-74741a2f1d2c",
	level: 3,
	maxUses: 4,
	name: "Cone of Cold",
	price: 0,
	id: "cone_of_cold",
});
