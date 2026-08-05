import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "drop_from_above",
	name: "Drop from Above",
	description: "Plunge onto the enemy with crushing force and potentially leave them stunned.",
	icon: "skills/common/drop_from_above.png",
	pool: "common",
	kind: "weaponAttack",
	category: "damage",
	rarity: "rare",
	maxUses: 1,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "crushing",
			dice: "5d8",
			requiresAttackRoll: false,
			save: {
				attribute: "dexterity",
				onSuccess: "halfDamage",
				dc: { attribute: "strength" },
			},
		},
		{
			type: "applyStatus",
			target: "enemy",
			statusId: "stunned",
			duration: { unit: "turns", value: 1 },
			save: {
				attribute: "strength",
				onSuccess: "noEffect",
				dc: { attribute: "strength" },
			},
		},
	],
	tags: [],
});
