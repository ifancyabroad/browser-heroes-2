import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "barbarian",
	description: "Beat the enemy into submission with a chance to lower physical resistances.",
	effects: [
		{
			accuracy: 50,
			difficulty: 22,
			duration: 5,
			modifier: "constitution",
			properties: [
				{
					name: "slashing",
					type: "resistance",
					value: -50,
				},
				{
					name: "crushing",
					type: "resistance",
					value: -50,
				},
				{
					name: "piercing",
					type: "resistance",
					value: -50,
				},
			],
			target: "enemy",
			type: "status",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NZqXb0gVgqwcQmz5Kty?alt=media&token=888faf17-25f3-4981-b1d4-34a7017ebade",
	level: 4,
	maxUses: 4,
	name: "Tenderise",
	price: 1020,
	id: "tenderise",
});
