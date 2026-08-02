import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "corruption",
	name: "Corruption",
	description: "Corrupt the enemy's body, leaving them profoundly vulnerable to necrotic power.",
	icon: "skills/warlock/corruption.png",
	pool: "warlock",
	kind: "spell",
	category: "debuff",
	maxUses: 3,
	effects: [
		{
			type: "modifyDamageAffinity",
			target: "enemy",
			affinity: "vulnerability",
			operation: "add",
			damageType: "necrotic",
			durationTurns: 4,
			save: {
				attribute: "constitution",
				onSuccess: "noEffect",
				dc: { attribute: "intelligence" },
			},
		},
	],
	tags: [],
});
