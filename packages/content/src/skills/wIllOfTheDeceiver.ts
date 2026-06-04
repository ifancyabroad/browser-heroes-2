import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "unique",
	description: "",
	effects: [
		{
			duration: 4,
			properties: [
				{
					name: "slashing",
					type: "resistance",
					value: 50,
				},
				{
					name: "crushing",
					type: "resistance",
					value: 50,
				},
				{
					name: "piercing",
					type: "resistance",
					value: 50,
				},
				{
					name: "poison",
					type: "resistance",
					value: 50,
				},
				{
					name: "acid",
					type: "resistance",
					value: 50,
				},
			],
			target: "self",
			type: "status",
		},
		{
			difficulty: 14,
			duration: 3,
			effect: "charm",
			modifier: "wisdom",
			target: "enemy",
			type: "auxiliary",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OC8YYxJjpDUyJWCV-HR?alt=media&token=c5c03231-3bea-416e-8360-4a096d032e89",
	level: 4,
	maxUses: 2,
	name: "WIll of the Deceiver",
	price: 0,
	id: "will_of_the_deceiver",
});
