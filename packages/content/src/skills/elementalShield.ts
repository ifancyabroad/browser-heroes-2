import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "elemental_shield",
	name: "Elemental Shield",
	description: "Become impervious to fire, cold, and lightning for a short time.",
	icon: "skills/warrior/elemental_shield.png",
	pool: "warrior",
	kind: "technique",
	category: "defensive",
	rarity: "uncommon",
	maxUses: 2,
	effects: [
		{
			type: "modifyDamageAffinity",
			target: "self",
			affinity: "immunity",
			operation: "add",
			damageType: "fire",
			durationTurns: 4,
		},
		{
			type: "modifyDamageAffinity",
			target: "self",
			affinity: "immunity",
			operation: "add",
			damageType: "cold",
			durationTurns: 4,
		},
		{
			type: "modifyDamageAffinity",
			target: "self",
			affinity: "immunity",
			operation: "add",
			damageType: "lightning",
			durationTurns: 4,
		},
	],
	tags: [],
});
