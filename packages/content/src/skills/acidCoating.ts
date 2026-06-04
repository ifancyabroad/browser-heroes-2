import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "rogue",
	description: "Coat your weapon in corrosive acid to increase acid type damage.",
	effects: [
		{
			accuracy: 100,
			duration: 8,
			properties: [
				{
					name: "acid",
					type: "damage",
					value: 80,
				},
			],
			target: "self",
			type: "status",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NZq_nhusxIdvv9LFwJZ?alt=media&token=aa5812ba-62fc-4ec5-a1cc-de61023e265c",
	level: 3,
	maxUses: 6,
	name: "Acid Coating",
	price: 260,
	id: "acid_coating",
});
