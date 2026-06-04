import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "common",
	description: "",
	effects: [
		{
			difficulty: 17,
			duration: 4,
			modifier: "wisdom",
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
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OBGO_dOy08BrKDH_l3L?alt=media&token=c0825b48-2dc2-4d61-ae5d-8a16b4a4a13c",
	level: 2,
	maxUses: 6,
	name: "Deafening Screech",
	price: 0,
	id: "deafening_screech",
});
