import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "fireball",
	name: "Fireball",
	description: "Conjure a ball of fire.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-Nc4-UVARP8jFmsiuXC9?alt=media&token=07349932-ea92-4da5-abf5-892cb4b16ba4",
	pool: "warlock",
	category: "spell",
	maxUses: 4,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "fire",
			dice: "1d12+8",
			attribute: "intelligence",
			requiresAttackRoll: false,
		},
		{
			type: "modifyDamageAffinity",
			target: "enemy",
			affinity: "vulnerability",
			operation: "add",
			damageType: "fire",
			durationTurns: 4,
		},
	],
	tags: [],
});
