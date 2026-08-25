import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "whelm",
	name: "Whelm",
	description:
		"Overwhelm the enemy beneath a freezing, crushing mass of water that may leave them unable to act.",
	icon: "skills/unique/whelm.png",
	pool: "unique",
	kind: "spell",
	category: "damage",
	rarity: "legendary",
	maxUses: 1,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "crushing",
			damageClass: "physical",
			dice: "4d8",
			requiresAttackRoll: false,
			save: {
				attribute: "strength",
				onSuccess: "halfDamage",
				dc: { attribute: "constitution" },
			},
		},
		{
			type: "damage",
			target: "enemy",
			damageType: "cold",
			damageClass: "magical",
			dice: "4d8",
			requiresAttackRoll: false,
			save: {
				attribute: "strength",
				onSuccess: "halfDamage",
				dc: { attribute: "constitution" },
			},
		},
		{
			type: "applyStatus",
			target: "enemy",
			statusId: "stunned",
			duration: { unit: "turns", value: 2 },
			save: {
				attribute: "strength",
				onSuccess: "noEffect",
				dc: { attribute: "constitution" },
			},
		},
	],
	tags: [],
});
