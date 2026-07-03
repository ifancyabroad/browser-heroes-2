import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "cursing_bolt",
	name: "Cursing Bolt",
	description:
		"Fire a bolt of necrotic energy that deals damage and may curse your enemy, forcing them to fail any saving throws.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OI67rREICWMb5bjvOvp?alt=media&token=eded7969-71c0-4b48-b823-6be559332758",
	pool: "warlock",
	category: "spell",
	maxUses: 4,
	ranks: [
		{
			rank: 1,
			effects: [
				{
					type: "damage",
					target: "enemy",
					damageType: "necrotic",
					dice: "1d10+5",
					attribute: "intelligence",
					requiresAttackRoll: false,
				},
				{
					type: "modifyDamage",
					target: "enemy",
					operation: "multiply",
					value: 0.75,
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
					damageType: "necrotic",
					dice: "2d10+4",
					attribute: "intelligence",
					requiresAttackRoll: false,
				},
				{
					type: "modifyDamage",
					target: "enemy",
					operation: "multiply",
					value: 0.75,
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
					damageType: "necrotic",
					dice: "2d10+9",
					attribute: "intelligence",
					requiresAttackRoll: false,
				},
				{
					type: "modifyDamage",
					target: "enemy",
					operation: "multiply",
					value: 0.75,
					durationTurns: 6,
				},
			],
		},
	],
	tags: [],
});
