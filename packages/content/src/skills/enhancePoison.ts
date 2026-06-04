import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "assassin",
	description:
		"Amplify the potency of your poison, causing it to inflict greater, lingering damage.",
	effects: [
		{
			duration: 8,
			properties: [
				{
					name: "poison",
					type: "damage",
					value: 50,
				},
			],
			target: "self",
			type: "status",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-Nhh16M9sVTTOKw5g6rO?alt=media&token=c934a0ad-5942-45c9-ada7-02516b04aa9b",
	level: 2,
	maxUses: 6,
	name: "Enhance Poison",
	price: 0,
	id: "enhance_poison",
});
