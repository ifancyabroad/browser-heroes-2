import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "dragon_breath",
	name: "Dragon Breath",
	description: "Unleash a cone of fiery devastation, scorching everything in its path.",
	icon: "skills/warlock/dragon_breath.png",
	pool: "warlock",
	kind: "spell",
	category: "damage",
	maxUses: 3,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "fire",
			dice: "5d6",
			attribute: "intelligence",
			requiresAttackRoll: false,
			save: {
				attribute: "dexterity",
				onSuccess: "halfDamage",
				dc: { attribute: "intelligence" },
			},
		},
		{
			type: "damageOverTime",
			target: "enemy",
			damageType: "fire",
			dice: "2d6",
			durationTurns: 2,
			save: {
				attribute: "constitution",
				onSuccess: "noEffect",
				dc: { attribute: "intelligence" },
			},
		},
	],
	tags: [],
});
