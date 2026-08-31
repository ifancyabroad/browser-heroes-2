import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "deep_freeze",
	name: "Deep Freeze",
	description:
		"A concentrated frost spell that encases the target in solid ice, dealing damage and rendering them unable to act.",
	icon: "skills/wizard/deep_freeze.png",
	pool: "wizard",
	kind: "spell",
	category: "damage",
	rarity: "epic",
	maxUses: 2,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "cold",
			damageClass: "magical",
			dice: "6d8",
			attribute: "intelligence",
			requiresAttackRoll: false,
			save: {
				attribute: "constitution",
				onSuccess: "halfDamage",
				dc: { attribute: "intelligence" },
			},
		},
		{
			type: "applyStatus",
			target: "enemy",
			statusId: "stunned",
			duration: { unit: "turns", value: 1 },
			save: {
				attribute: "constitution",
				onSuccess: "noEffect",
				dc: { attribute: "intelligence" },
			},
		},
	],
	tags: [],
});
