import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "go_for_the_eyes",
	name: "Go For The Eyes",
	description: "Aim for the opponent's eyes, impairing their attacks if the blow lands true.",
	icon: "skills/rogue/go_for_the_eyes.png",
	pool: "rogue",
	kind: "weaponAttack",
	category: "debuff",
	maxUses: 4,
	effects: [
		{
			type: "attackDamage",
			target: "enemy",
			multiplier: 1,
			attackRiders: [
				{
					timing: "onHit",
					save: {
						attribute: "constitution",
						onSuccess: "noEffect",
						dc: { attribute: "dexterity" },
					},
					effects: [
						{
							type: "modifyRoll",
							target: "enemy",
							roll: "attack",
							mode: "disadvantage",
							durationTurns: 2,
						},
					],
				},
			],
		},
	],
	tags: [],
});
