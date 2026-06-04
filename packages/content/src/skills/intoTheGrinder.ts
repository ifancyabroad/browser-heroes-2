import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "unique",
	description: "",
	effects: [
		{
			damageType: "acid",
			max: 12,
			min: 6,
			target: "enemy",
			type: "damage",
		},
		{
			damageType: "crushing",
			max: 12,
			min: 6,
			target: "enemy",
			type: "damage",
		},
		{
			difficulty: 16,
			duration: 4,
			modifier: "strength",
			properties: [
				{
					name: "armourClass",
					type: "auxiliaryStat",
					value: -3,
				},
			],
			target: "enemy",
			type: "status",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OAc58blrXjj8BuSCn6r?alt=media&token=4bcc1ca7-a2a9-4b6c-ad2c-17cd91337f6d",
	level: 3,
	maxUses: 2,
	name: "Into the Grinder",
	price: 0,
	id: "into_the_grinder",
});
