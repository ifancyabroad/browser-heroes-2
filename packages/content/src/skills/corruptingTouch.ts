import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "corrupting_touch",
	name: "Corrupting Touch",
	description:
		"Flood the enemy with necrotic corruption that may leave them vulnerable to deathly power.",
	icon: "skills/common/corrupting_touch.png",
	pool: "common",
	kind: "spell",
	category: "damage",
	maxUses: 6,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "necrotic",
			dice: "4d6",
			requiresAttackRoll: false,
			save: {
				attribute: "wisdom",
				onSuccess: "halfDamage",
				dc: {
					base: 8,
					attribute: "wisdom",
					includeProficiency: true,
					bonus: 0,
				},
			},
		},
		{
			type: "modifyDamageAffinity",
			target: "enemy",
			affinity: "vulnerability",
			operation: "add",
			damageType: "necrotic",
			durationTurns: 3,
			save: {
				attribute: "constitution",
				onSuccess: "noEffect",
				dc: { attribute: "wisdom" },
			},
		},
	],
	tags: [],
});
