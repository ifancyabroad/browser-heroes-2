import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "wail",
	name: "Wail",
	description:
		"Release a deathly wail that damages the soul and may leave the enemy paralysed with terror.",
	icon: "skills/unique/wail.png",
	pool: "unique",
	kind: "spell",
	category: "damage",
	rarity: "epic",
	maxUses: 1,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "necrotic",
			dice: "6d6",
			requiresAttackRoll: false,
			save: {
				attribute: "constitution",
				onSuccess: "halfDamage",
				dc: {
					base: 8,
					attribute: "wisdom",
					includeProficiency: true,
					bonus: 1,
				},
			},
		},
		{
			type: "applyStatus",
			target: "enemy",
			statusId: "stunned",
			duration: { unit: "turns", value: 2 },
			save: {
				attribute: "wisdom",
				onSuccess: "noEffect",
				dc: { attribute: "charisma" },
			},
		},
	],
	tags: [],
});
