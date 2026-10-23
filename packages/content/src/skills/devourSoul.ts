import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "devour_soul",
	name: "Devour Soul",
	description:
		"Deal necrotic damage to the enemy. A failed Wisdom saving throw also reduces their maximum HP.",
	icon: "skills/common/devour_soul.png",
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
			damageClass: "magical",
			dice: "5d10",
			requiresAttackRoll: false,
			save: {
				attribute: "wisdom",
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
			type: "modifyStat",
			target: "enemy",
			stat: "maxHpBonus",
			value: -15,
			duration: { unit: "turns", value: 6 },
			save: {
				attribute: "wisdom",
				onSuccess: "noEffect",
				dc: { attribute: "wisdom" },
			},
		},
	],
	tags: [],
});
