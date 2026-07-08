import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "maim",
	name: "Maim",
	description: "Strike with brutal force, causing bleeding and a chance to disarm your opponent.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-Nhh1jOIoeiE7yvBATmT?alt=media&token=dc543036-974a-4187-9dd1-c2a6fced5ef0",
	pool: "assassin",
	category: "attack",
	maxUses: 2,
	effects: [
		{
			type: "attackDamage",
			target: "enemy",
			multiplier: 2,
			attackRiders: [
				{
					timing: "onHit",
					effects: [
						{
							type: "modifyDamage",
							target: "enemy",
							operation: "multiply",
							value: 0.75,
							durationTurns: 3,
						},
						{
							type: "damageOverTime",
							target: "enemy",
							damageType: "slashing",
							dice: "1d4",
							durationTurns: 3,
						},
					],
				},
			],
		},
	],
	tags: [],
});
