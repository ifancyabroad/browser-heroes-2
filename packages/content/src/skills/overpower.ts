import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "common",
	description: "",
	effects: [
		{
			difficulty: 19,
			duration: 3,
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
			max: 20,
			min: 8,
			target: "enemy",
			type: "damage",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OC0BnBNFGwHwz1CugLe?alt=media&token=814a1aa1-3f7b-4bcc-bd73-eec753a24932",
	level: 3,
	maxUses: 1,
	name: "Overpower",
	price: 0,
	id: "overpower",
});
