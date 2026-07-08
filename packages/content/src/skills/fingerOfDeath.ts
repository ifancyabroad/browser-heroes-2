import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "finger_of_death",
	name: "Finger of Death",
	description:
		"Unleashes a deathly beam of necrotic power that corrupts the target's soul, causing immense pain and destruction.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-Nc40XqHNv0vjMrSUhRM?alt=media&token=dabb826c-2381-4766-92e9-36c52dcda625",
	pool: "warlock",
	category: "spell",
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
