import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "skull_bash",
	name: "Skull Bash",
	description:
		"Bash the enemy with crushing force and potentially leave them vulnerable to further impacts.",
	icon: "skills/common/skull_bash.png",
	pool: "common",
	kind: "weaponAttack",
	category: "damage",
	maxUses: 5,
	effects: [
		{
			type: "attackDamage",
			target: "enemy",
			multiplier: 1,
			attackRiders: [
				{
					timing: "onHit",
					effects: [
						{
							type: "modifyDamageAffinity",
							target: "enemy",
							affinity: "vulnerability",
							operation: "add",
							damageType: "crushing",
							durationTurns: 4,
							save: {
								attribute: "constitution",
								onSuccess: "noEffect",
								dc: { attribute: "strength" },
							},
						},
					],
				},
			],
		},
	],
	tags: [],
});
