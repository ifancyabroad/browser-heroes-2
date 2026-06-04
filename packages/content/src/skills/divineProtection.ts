import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "cleric",
	description: "Invoke celestial safeguard, shielding yourself from harm and dark forces.",
	effects: [
		{
			duration: 6,
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
					name: "radiant",
					type: "resistance",
					value: 50,
				},
				{
					name: "necrotic",
					type: "resistance",
					value: 50,
				},
			],
			target: "self",
			type: "status",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NhkR-olGXWxxR9Poqo3?alt=media&token=2aa203c7-fff6-4998-b777-bd847ae0773e",
	level: 3,
	maxUses: 6,
	name: "Divine Protection",
	price: 0,
	id: "divine_protection",
});
