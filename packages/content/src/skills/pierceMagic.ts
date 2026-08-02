import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "pierce_magic",
	name: "Pierce Magic",
	description: "Reduce the opponents magic resistance.",
	icon: "skills/mage/pierce_magic.png",
	pool: "mage",
	category: "debuff",
	maxUses: 4,
	effects: [
		{
			type: "modifyDamageAffinity",
			target: "enemy",
			affinity: "vulnerability",
			operation: "add",
			damageType: "cold",
			durationTurns: 6,
		},
		{
			type: "modifyDamageAffinity",
			target: "enemy",
			affinity: "vulnerability",
			operation: "add",
			damageType: "fire",
			durationTurns: 6,
		},
		{
			type: "modifyDamageAffinity",
			target: "enemy",
			affinity: "vulnerability",
			operation: "add",
			damageType: "lightning",
			durationTurns: 6,
		},
	],
	tags: [],
});
