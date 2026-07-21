import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "dragon_breath",
	name: "Dragon Breath",
	description: "Unleash a cone of fiery devastation, scorching everything in its path.",
	icon: "skills/warlock/dragon_breath.png",
	pool: "warlock",
	category: "spell",
	maxUses: 3,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "fire",
			dice: "2d12+8",
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
