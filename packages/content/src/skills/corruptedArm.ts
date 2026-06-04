import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "unique",
	description: "",
	effects: [
		{
			damageType: "necrotic",
			max: 12,
			min: 6,
			target: "enemy",
			type: "damage",
		},
		{
			difficulty: 19,
			duration: 4,
			modifier: "constitution",
			properties: [
				{
					name: "armourClass",
					type: "auxiliaryStat",
					value: -6,
				},
			],
			target: "enemy",
			type: "status",
		},
		{
			damageType: "crushing",
			max: 12,
			min: 6,
			target: "enemy",
			type: "damage",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OAbsKzhDKZyqRhK5IJZ?alt=media&token=5c3048c0-b15a-4e5e-9179-723d025c206f",
	level: 3,
	maxUses: 2,
	name: "Corrupted Arm",
	price: 0,
	id: "corrupted_arm",
});
