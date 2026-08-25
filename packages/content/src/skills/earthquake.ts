import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "earthquake",
	name: "Earthquake",
	description: "Rupture the ground beneath the enemy, crushing and potentially toppling them.",
	icon: "skills/common/earthquake.png",
	pool: "common",
	kind: "spell",
	category: "damage",
	rarity: "legendary",
	maxUses: 1,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "crushing",
			damageClass: "magical",
			dice: "3d12",
			requiresAttackRoll: false,
			save: {
				attribute: "dexterity",
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
