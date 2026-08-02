import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "nightmares",
	name: "Nightmares",
	icon: "skills/common/nightmares.png",
	pool: "common",
	kind: "spell",
	category: "damage",
	maxUses: 2,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "necrotic",
			dice: "2d12+15",
			requiresAttackRoll: false,
			save: {
				attribute: "wisdom",
				onSuccess: "noEffect",
				dc: {
					base: 8,
					attribute: "wisdom",
					includeProficiency: true,
					bonus: 2,
				},
			},
		},
		{
			type: "modifyDamageAffinity",
			target: "enemy",
			affinity: "vulnerability",
			operation: "add",
			damageType: "necrotic",
			durationTurns: 2,
		},
	],
	tags: [],
});
