import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "corrupted_arm",
	name: "Corrupted Arm",
	description:
		"Smash the enemy with a corrupted limb that spreads necrosis and tears open their defences.",
	icon: "skills/unique/corrupted_arm.png",
	pool: "unique",
	kind: "weaponAttack",
	category: "damage",
	rarity: "rare",
	maxUses: 2,
	effects: [
		{
			type: "attackDamage",
			target: "enemy",
			multiplier: 1.5,
			attackRiders: [
				{
					timing: "onHit",
					effects: [
						{
							type: "damage",
							target: "enemy",
							damageType: "necrotic",
							dice: "2d8",
						},
						{
							type: "modifyStat",
							target: "enemy",
							stat: "armourClass",
							value: -4,
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
