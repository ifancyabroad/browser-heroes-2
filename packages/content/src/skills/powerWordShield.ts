import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "occultist",
	description:
		"Enchant yourself with a powerful shield, significantly increasing your armor class.",
	effects: [
		{
			duration: 8,
			properties: [
				{
					name: "armourClass",
					type: "auxiliaryStat",
					value: 4,
				},
			],
			target: "self",
			type: "status",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NgTRA6CoAdH4tX5ht_3?alt=media&token=47263956-7149-46fd-9133-8a7827a6b68c",
	level: 1,
	maxUses: 8,
	name: "Power Word: Shield",
	price: 0,
	id: "power_word_shield",
});
