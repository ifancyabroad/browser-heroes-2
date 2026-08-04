import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "kick",
	name: "Kick",
	description: "Drive a swift kick into the enemy, potentially knocking them off balance.",
	icon: "skills/thief/kick.png",
	pool: "thief",
	kind: "technique",
	category: "debuff",
	rarity: "common",
	maxUses: 3,
	effects: [
		{
			type: "attackDamage",
			target: "enemy",
			multiplier: 0.5,
			damageTypeOverride: "crushing",
			attackRiders: [
				{
					timing: "onHit",
					save: {
						attribute: "strength",
						onSuccess: "noEffect",
						dc: { attribute: "dexterity" },
					},
					effects: [
						{
							type: "applyStatus",
							target: "enemy",
							statusId: "stunned",
							durationTurns: 1,
						},
					],
				},
			],
		},
	],
	tags: [],
});
