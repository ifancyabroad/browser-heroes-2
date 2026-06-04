import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "common",
	description:
		"Stand resolute with Shield Wall, shielding yourself from harm and repelling enemy assaults with unwavering defense.",
	effects: [
		{
			duration: 6,
			properties: [
				{
					name: "armourClass",
					type: "auxiliaryStat",
					value: 3,
				},
			],
			target: "self",
			type: "status",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-Nhgx8gnKSMnxB7h9F60?alt=media&token=eb3b73bb-3dd1-4891-9ce8-94920b18ee74",
	level: 2,
	maxUses: 5,
	name: "Shield Wall",
	price: 0,
	id: "shield_wall",
});
