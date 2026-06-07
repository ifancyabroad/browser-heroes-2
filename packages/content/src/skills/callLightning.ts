import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "call_lightning",
	name: "Call Lightning",
	description:
		"Summon a bolt of lightning from the heavens to strike your target with electrifying force.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OI6F5twLiJIL3ZO7bdu?alt=media&token=c2458ca7-b772-4e17-bbdc-ee5b2c56413c",
	pool: "occultist",
	category: "spell",
	usage: {
		target: "enemy",
		requiresAttackRoll: false,
		maxUses: 4,
	},
	ranks: [
		{
			rank: 1,
			effects: [
				{
					type: "damage",
					target: "enemy",
					damageType: "lightning",
					dice: "1d12+8",
					attribute: "wisdom",
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
					dice: "2d12+7",
					attribute: "wisdom",
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
					dice: "2d12+14",
					attribute: "wisdom",
				},
			],
		},
	],
	tags: [],
});
