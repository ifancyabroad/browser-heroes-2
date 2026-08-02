import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "cloak_of_shadows",
	name: "Cloak Of Shadows",
	description:
		"Shroud yourself in living shadow, obscuring your movements and warding off darkness.",
	icon: "skills/assassin/cloak_of_shadows.png",
	pool: "assassin",
	kind: "technique",
	category: "defensive",
	maxUses: 4,
	effects: [
		{
			type: "modifyDamageAffinity",
			target: "self",
			affinity: "resistance",
			operation: "add",
			damageType: "necrotic",
			durationTurns: 3,
		},
		{
			type: "modifyRoll",
			target: "enemy",
			roll: "attack",
			mode: "disadvantage",
			durationTurns: 2,
		},
	],
	tags: [],
});
