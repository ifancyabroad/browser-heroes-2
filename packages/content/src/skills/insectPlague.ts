import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "insect_plague",
	name: "Insect Plague",
	description:
		"Unleash a swarm of biting insects that deal piercing damage and erode enemy defenses.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OHmFdmEfDy-KwSu7E7r?alt=media&token=daa6345a-26b7-446a-b518-0ae67fd60830",
	pool: "occultist",
	category: "spell",
	maxUses: 7,
	ranks: [
		{
			rank: 1,
			effects: [
				{
					type: "damage",
					target: "enemy",
					damageType: "piercing",
					dice: "1d10+5",
					attribute: "wisdom",
					requiresAttackRoll: false,
				},
				{
					type: "modifyStat",
					target: "enemy",
					stat: "armourClass",
					operation: "add",
					value: -4,
					durationTurns: 4,
				},
			],
		},
		{
			rank: 2,
			effects: [
				{
					type: "damage",
					target: "enemy",
					damageType: "piercing",
					dice: "2d10+4",
					attribute: "wisdom",
					requiresAttackRoll: false,
				},
				{
					type: "modifyStat",
					target: "enemy",
					stat: "armourClass",
					operation: "add",
					value: -6,
					durationTurns: 5,
				},
			],
		},
		{
			rank: 3,
			effects: [
				{
					type: "damage",
					target: "enemy",
					damageType: "piercing",
					dice: "2d10+9",
					attribute: "wisdom",
					requiresAttackRoll: false,
				},
				{
					type: "modifyStat",
					target: "enemy",
					stat: "armourClass",
					operation: "add",
					value: -8,
					durationTurns: 6,
				},
			],
		},
	],
	tags: [],
});
