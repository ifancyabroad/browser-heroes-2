import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "cloak_of_shadows",
	name: "Cloak Of Shadows",
	description: "Shroud yourself in dark energy, enhancing resistance to elemental attacks.",
	icon: "skills/assassin/cloak_of_shadows.png",
	pool: "assassin",
	category: "buff",
	maxUses: 3,
	effects: [
		{
			type: "modifyDamageAffinity",
			target: "self",
			affinity: "resistance",
			operation: "add",
			damageType: "fire",
			durationTurns: 5,
		},
		{
			type: "modifyDamageAffinity",
			target: "self",
			affinity: "resistance",
			operation: "add",
			damageType: "cold",
			durationTurns: 5,
		},
		{
			type: "modifyDamageAffinity",
			target: "self",
			affinity: "resistance",
			operation: "add",
			damageType: "lightning",
			durationTurns: 5,
		},
	],
	tags: [],
});
