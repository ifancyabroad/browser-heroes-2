import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "lighting_bolt",
	name: "Lighting Bolt",
	description: "Conjure a lightning bolt.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-Nc3zPER2-voArWHwNy9?alt=media&token=6edea4db-a6d1-4951-8d0a-a67acfb4e788",
	pool: "mage",
	category: "spell",
	maxUses: 7,
	ranks: [
		{
			rank: 1,
			effects: [
				{
					type: "damage",
					target: "enemy",
					damageType: "lightning",
					dice: "1d10+5",
					attribute: "intelligence",
					requiresAttackRoll: false,
				},
			],
		},
		{
			rank: 2,
			effects: [
				{
					type: "damage",
					target: "enemy",
					damageType: "lightning",
					dice: "2d10+4",
					attribute: "intelligence",
					requiresAttackRoll: false,
				},
			],
		},
		{
			rank: 3,
			effects: [
				{
					type: "damage",
					target: "enemy",
					damageType: "lightning",
					dice: "2d10+9",
					attribute: "intelligence",
					requiresAttackRoll: false,
				},
			],
		},
	],
	tags: [],
});
