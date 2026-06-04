import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "mage",
	description: "Conjure a thin layer of physical protection.",
	effects: [
		{
			accuracy: 100,
			duration: 10,
			properties: [
				{
					name: "armourClass",
					type: "auxiliaryStat",
					value: 6,
				},
			],
			target: "self",
			type: "status",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-Nc3xhpxzM4iz55_jXYj?alt=media&token=671e90b7-e472-4ad0-b5aa-47febe8bf8bb",
	level: 2,
	maxUses: 8,
	name: "Armour",
	price: 90,
	id: "armour",
});
