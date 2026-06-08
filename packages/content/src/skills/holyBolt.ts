import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "holy_bolt",
	name: "Holy Bolt",
	description: "Fire a burst of radiant energy that sears enemies with divine power.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NgTRbewhOgSp1zw1Uu7?alt=media&token=dca7c698-b44a-4c75-932c-b2291934e4cf",
	pool: "cleric",
	category: "spell",
	maxUses: 12,
	ranks: [
		{
			rank: 1,
			effects: [
				{
					type: "damage",
					target: "enemy",
					damageType: "radiant",
					dice: "1d10",
					attribute: "wisdom",
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
					damageType: "radiant",
					dice: "2d10-3",
					attribute: "wisdom",
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
					damageType: "radiant",
					dice: "2d10-1",
					attribute: "wisdom",
					requiresAttackRoll: false,
				},
			],
		},
	],
	tags: [],
});
