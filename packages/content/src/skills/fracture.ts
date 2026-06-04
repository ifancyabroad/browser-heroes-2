import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "assassin",
	description:
		"Deliver a precise and devastating strike that disrupts the enemy's defenses, reducing their resistance to physical attacks.",
	effects: [
		{
			difficulty: 22,
			duration: 4,
			modifier: "constitution",
			properties: [
				{
					name: "slashing",
					type: "resistance",
					value: -40,
				},
				{
					name: "piercing",
					type: "resistance",
					value: -40,
				},
				{
					name: "crushing",
					type: "resistance",
					value: -40,
				},
			],
			target: "enemy",
			type: "status",
		},
		{
			damageType: "crushing",
			max: 30,
			min: 18,
			target: "enemy",
			type: "damage",
		},
		{
			difficulty: 22,
			duration: 4,
			effect: "cripple",
			modifier: "constitution",
			target: "enemy",
			type: "auxiliary",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NKt5eqAEIJYZFNbvK8f?alt=media&token=ec2639b6-7611-42a2-b954-f6bd5a35962c",
	level: 4,
	maxUses: 3,
	name: "Fracture",
	price: 1300,
	target: "enemy",
	id: "fracture",
});
