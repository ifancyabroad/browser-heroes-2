import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "corrupting_touch",
	name: "Corrupting Touch",
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
			dice: "1d12+8",
			requiresAttackRoll: false,
			save: {
				attribute: "wisdom",
				onSuccess: "noEffect",
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
			durationTurns: 2,
		},
	],
	tags: [],
});
