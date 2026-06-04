import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "warlock",
	description:
		"Unleashes a deathly beam of necrotic power that corrupts the target's soul, causing immense pain and destruction.",
	effects: [
		{
			damageType: "necrotic",
			max: 30,
			min: 12,
			modifier: "intelligence",
			target: "enemy",
			type: "damage",
		},
		{
			difficulty: 18,
			duration: 4,
			modifier: "wisdom",
			properties: [
				{
					name: "slashing",
					type: "damage",
					value: -20,
				},
				{
					name: "crushing",
					type: "damage",
					value: -20,
				},
				{
					name: "piercing",
					type: "damage",
					value: -20,
				},
			],
			target: "enemy",
			type: "status",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-Nc40XqHNv0vjMrSUhRM?alt=media&token=dabb826c-2381-4766-92e9-36c52dcda625",
	level: 4,
	maxUses: 4,
	name: "Finger of Death",
	price: 1450,
	id: "finger_of_death",
});
