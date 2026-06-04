import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "common",
	description: "",
	effects: [
		{
			duration: 5,
			properties: [
				{
					name: "strength",
					type: "stat",
					value: 2,
				},
				{
					name: "constitution",
					type: "stat",
					value: 2,
				},
			],
			target: "self",
			type: "status",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-O8D3hp6-sDMDNT122yT?alt=media&token=4901860c-7d53-4de3-b85a-7d90ffc81233",
	level: 1,
	maxUses: 4,
	name: "Growth",
	price: 0,
	id: "growth",
});
