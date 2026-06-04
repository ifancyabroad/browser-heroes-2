import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "warlock",
	description: "Harden the skin to greatly increase physical resistance.",
	effects: [
		{
			accuracy: 100,
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
			],
			target: "self",
			type: "status",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-Nc3yE_BOq5Xmhy4LvbI?alt=media&token=7098ab93-e0ec-486f-9f9b-2715b57815b6",
	level: 2,
	maxUses: 4,
	name: "Iron Skin",
	price: 900,
	id: "iron_skin",
});
