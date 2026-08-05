import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "psionic_blast",
	name: "Psionic Blast",
	description:
		"Assault the enemy's mind with psychic force that may leave them briefly incapacitated.",
	icon: "skills/common/psionic_blast.png",
	pool: "common",
	kind: "spell",
	category: "damage",
	rarity: "rare",
	maxUses: 2,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "necrotic",
			dice: "6d6",
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
			type: "applyStatus",
			target: "enemy",
			statusId: "stunned",
			duration: { unit: "turns", value: 1 },
			save: {
				attribute: "wisdom",
				onSuccess: "noEffect",
				dc: { attribute: "wisdom" },
			},
		},
	],
	tags: [],
});
