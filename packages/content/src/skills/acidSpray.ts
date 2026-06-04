import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "common",
	description: "",
	effects: [
		{
			damageType: "acid",
			max: 15,
			min: 6,
			target: "enemy",
			type: "damage",
		},
		{
			difficulty: 17,
			duration: 6,
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
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NgTn5gefrbm_w1g4ocL?alt=media&token=d2280b22-36b1-4e96-a969-c667322ebc91",
	level: 2,
	maxUses: 2,
	name: "Acid Spray",
	price: 0,
	id: "acid_spray",
});
