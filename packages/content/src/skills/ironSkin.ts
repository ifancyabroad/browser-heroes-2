import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "iron_skin",
	name: "Iron Skin",
	description: "Harden the skin to greatly increase physical resistance.",
	icon: "skills/warlock/iron_skin.png",
	pool: "warlock",
	category: "buff",
	maxUses: 4,
	effects: [
		{
			type: "modifyDamageAffinity",
			target: "self",
			affinity: "resistance",
			operation: "add",
			damageType: "slashing",
			durationTurns: 6,
		},
		{
			type: "modifyDamageAffinity",
			target: "self",
			affinity: "resistance",
			operation: "add",
			damageType: "crushing",
			durationTurns: 6,
		},
		{
			type: "modifyDamageAffinity",
			target: "self",
			affinity: "resistance",
			operation: "add",
			damageType: "piercing",
			durationTurns: 6,
		},
	],
	tags: [],
});
