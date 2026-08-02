import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "elemental_shield",
	name: "Elemental Shield",
	description:
		"Summon a protective barrier infused with elemental energy to guard against attacks.",
	icon: "skills/warrior/elemental_shield.png",
	pool: "warrior",
	category: "buff",
	maxUses: 4,
	effects: [
		{
			type: "modifyDamageAffinity",
			target: "self",
			affinity: "resistance",
			operation: "add",
			damageType: "fire",
			durationTurns: 8,
		},
		{
			type: "modifyDamageAffinity",
			target: "self",
			affinity: "resistance",
			operation: "add",
			damageType: "cold",
			durationTurns: 8,
		},
		{
			type: "modifyDamageAffinity",
			target: "self",
			affinity: "resistance",
			operation: "add",
			damageType: "lightning",
			durationTurns: 8,
		},
	],
	tags: [],
});
