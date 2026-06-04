import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "warrior",
	description:
		"Adopt a defensive posture that increases armor class while slightly reducing attack power.",
	effects: [
		{
			duration: 6,
			properties: [
				{
					name: "armourClass",
					type: "auxiliaryStat",
					value: 10,
				},
				{
					name: "slashing",
					type: "damage",
					value: -25,
				},
				{
					name: "crushing",
					type: "damage",
					value: -25,
				},
				{
					name: "piercing",
					type: "damage",
					value: -25,
				},
			],
			target: "self",
			type: "status",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OHyC611JJw5TvqZwBXp?alt=media&token=0bdf70e9-f832-40ca-b40b-20cc7d2eb379",
	level: 3,
	maxUses: 6,
	name: "Dueling Stance",
	price: 0,
	id: "dueling_stance",
});
