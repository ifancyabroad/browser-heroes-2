import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "barbarian",
	description:
		"Provoke enemies into reckless attacks, lowering your armor class but greatly boosting your critical strike chance.",
	effects: [
		{
			duration: 2,
			properties: [
				{
					name: "armourClass",
					type: "auxiliaryStat",
					value: -4,
				},
				{
					name: "critChance",
					type: "auxiliaryStat",
					value: 15,
				},
			],
			target: "self",
			type: "status",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OHyOBLC1CXRvTaWkjeL?alt=media&token=d9a63a20-849d-4002-b9b6-06e9ea2a9c4e",
	level: 2,
	maxUses: 4,
	name: "Taunt",
	price: 0,
	id: "taunt",
});
