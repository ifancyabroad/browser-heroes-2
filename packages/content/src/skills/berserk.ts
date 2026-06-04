import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "common",
	description: "Become enraged, greatly increasing strength but lowering defenses.",
	effects: [
		{
			accuracy: 100,
			duration: 4,
			properties: [
				{
					name: "strength",
					type: "stat",
					value: 8,
				},
				{
					name: "armourClass",
					type: "auxiliaryStat",
					value: -4,
				},
			],
			target: "self",
			type: "status",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NZqTywT0RDubTou99c2?alt=media&token=9ea978e7-bc94-4343-b045-7054eaea6455",
	level: 3,
	maxUses: 4,
	name: "Berserk",
	price: 550,
	id: "berserk",
});
