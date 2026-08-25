import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "cyclone",
	name: "Cyclone",
	description: "Engulf the enemy in a violent storm that shocks and may leave them reeling.",
	icon: "skills/common/cyclone.png",
	pool: "common",
	kind: "spell",
	category: "damage",
	rarity: "epic",
	maxUses: 2,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "lightning",
			damageClass: "magical",
			dice: "3d10",
			requiresAttackRoll: false,
			save: {
				attribute: "constitution",
				onSuccess: "halfDamage",
				dc: {
					base: 8,
					attribute: "constitution",
					includeProficiency: true,
					bonus: 0,
				},
			},
		},
		{
			type: "damage",
			target: "enemy",
			damageType: "crushing",
			damageClass: "physical",
			dice: "3d10",
			requiresAttackRoll: false,
			save: {
				attribute: "constitution",
				onSuccess: "halfDamage",
				dc: {
					base: 8,
					attribute: "constitution",
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
				attribute: "strength",
				onSuccess: "noEffect",
				dc: { attribute: "constitution" },
			},
		},
	],
	tags: [],
});
