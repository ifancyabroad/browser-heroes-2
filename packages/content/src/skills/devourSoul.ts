import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "devour_soul",
	name: "Devour Soul",
	description:
		"Tear at the enemy's soul, dealing necrotic damage and diminishing their capacity for life.",
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
			dice: "4d10",
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
