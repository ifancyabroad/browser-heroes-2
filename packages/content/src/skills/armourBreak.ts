import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "warrior",
	description: "A powerful blow that weakens an enemy's defenses.",
	effects: [
		{
			accuracy: 100,
			difficulty: 22,
			duration: 4,
			modifier: "strength",
			properties: [
				{
					name: "armourClass",
					type: "auxiliaryStat",
					value: -4,
				},
			],
			target: "enemy",
			type: "status",
		},
		{
			damageType: "crushing",
			max: 8,
			min: 1,
			target: "enemy",
			type: "damage",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NZMIV5OGOr4bChwrNEE?alt=media&token=34d14684-6c64-4822-b3e6-36161dedd07a",
	level: 1,
	maxUses: 8,
	name: "Armour Break",
	price: 160,
	target: "enemy",
	id: "armour_break",
});
