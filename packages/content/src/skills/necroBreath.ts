import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "necro_breath",
	name: "Necro Breath",
	description: "Exhale necrotic death that withers the enemy and impedes recovery.",
	icon: "skills/common/necro_breath.png",
	pool: "common",
	kind: "spell",
	category: "damage",
	rarity: "epic",
	maxUses: 2,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "necrotic",
			damageClass: "magical",
			dice: "10d6",
			requiresAttackRoll: false,
			save: {
				attribute: "constitution",
				onSuccess: "halfDamage",
				dc: { attribute: "constitution" },
			},
		},
		{
			type: "modifyHealing",
			target: "enemy",
			multiplier: 0.5,
			duration: { unit: "turns", value: 4 },
			save: {
				attribute: "constitution",
				onSuccess: "noEffect",
				dc: { attribute: "constitution" },
			},
		},
	],
	tags: [],
});
