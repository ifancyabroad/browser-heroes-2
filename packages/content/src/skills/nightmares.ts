import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "common",
	description: "",
	effects: [
		{
			damageType: "necrotic",
			max: 40,
			min: 16,
			target: "enemy",
			type: "damage",
		},
		{
			difficulty: 18,
			duration: 2,
			modifier: "wisdom",
			properties: [
				{
					name: "necrotic",
					type: "resistance",
					value: -50,
				},
			],
			target: "enemy",
			type: "status",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OCJnc4CZuCdQbrJEZKt?alt=media&token=5c261baf-e530-4851-872c-883aa686cee5",
	level: 4,
	maxUses: 2,
	name: "Nightmares",
	price: 0,
	id: "nightmares",
});
