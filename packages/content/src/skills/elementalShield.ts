import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "elemental_shield",
	name: "Elemental Shield",
	description:
		"Summon a protective barrier infused with elemental energy to guard against attacks.",
	icon: "skills/warrior/elemental_shield.png",
	pool: "warrior",
	kind: "technique",
	category: "defensive",
	maxUses: 3,
	effects: [
		{
			type: "modifyDamageAffinity",
			target: "self",
			affinity: "resistance",
			operation: "add",
			damageType: "fire",
			durationTurns: 4,
		},
		{
			type: "modifyDamageAffinity",
			target: "self",
			affinity: "resistance",
			operation: "add",
			damageType: "cold",
			durationTurns: 4,
		},
		{
			type: "modifyDamageAffinity",
			target: "self",
			affinity: "resistance",
			operation: "add",
			damageType: "lightning",
			durationTurns: 4,
		},
	],
	tags: [],
});
