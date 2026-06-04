import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "common",
	description: "",
	effects: [
		{
			duration: 6,
			properties: [
				{
					name: "poison",
					type: "damage",
					value: 75,
				},
			],
			target: "self",
			type: "status",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OCJm2T4y5k9f0MN-4kj?alt=media&token=d0857ca6-b8ff-4b20-b107-967bc65dcc87",
	level: 3,
	maxUses: 3,
	name: "Nature's Blessing",
	price: 0,
	id: "natures_blessing",
});
