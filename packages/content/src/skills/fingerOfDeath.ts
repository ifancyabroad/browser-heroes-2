import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "finger_of_death",
	name: "Finger of Death",
	description:
		"Unleashes a deathly beam of necrotic power that corrupts the target's soul, causing immense pain and destruction.",
	icon: "skills/warlock/finger_of_death.png",
	pool: "warlock",
	kind: "spell",
	category: "damage",
	maxUses: 4,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "necrotic",
			dice: "2d12+8",
			attribute: "intelligence",
			requiresAttackRoll: false,
		},
		{
			type: "modifyDamage",
			target: "enemy",
			damageType: "slashing",
			operation: "add",
			value: -20,
			durationTurns: 4,
		},
		{
			type: "modifyDamage",
			target: "enemy",
			damageType: "crushing",
			operation: "add",
			value: -20,
			durationTurns: 4,
		},
		{
			type: "modifyDamage",
			target: "enemy",
			damageType: "piercing",
			operation: "add",
			value: -20,
			durationTurns: 4,
		},
	],
	tags: [],
});
