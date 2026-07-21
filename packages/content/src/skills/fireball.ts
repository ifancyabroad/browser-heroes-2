import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "fireball",
	name: "Fireball",
	description: "Conjure a ball of fire.",
	icon: "skills/warlock/fireball.png",
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
