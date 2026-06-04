import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "occultist",
	description:
		"Unleash a swarm of biting insects that deal piercing damage and erode enemy defenses.",
	effects: [
		{
			damageType: "piercing",
			max: 15,
			min: 6,
			modifier: "wisdom",
			target: "enemy",
			type: "damage",
		},
		{
			difficulty: 17,
			duration: 4,
			modifier: "constitution",
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
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OHmFdmEfDy-KwSu7E7r?alt=media&token=daa6345a-26b7-446a-b518-0ae67fd60830",
	level: 2,
	maxUses: 7,
	name: "Insect Plague",
	price: 0,
	id: "insect_plague",
});
