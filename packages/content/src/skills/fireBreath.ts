import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "fire_breath",
	name: "Fire Breath",
	description: "Exhale a torrent of flame that scorches and may ignite the enemy.",
	icon: "skills/common/fire_breath.png",
	pool: "common",
	kind: "spell",
	category: "damage",
	rarity: "epic",
	maxUses: 2,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "fire",
			dice: "10d6",
			requiresAttackRoll: false,
			save: {
				attribute: "dexterity",
				onSuccess: "halfDamage",
				dc: { attribute: "constitution" },
			},
		},
		{
			type: "damageOverTime",
			target: "enemy",
			damageType: "fire",
			dice: "1d6",
			duration: { unit: "turns", value: 2 },
			save: {
				attribute: "constitution",
				onSuccess: "noEffect",
				dc: { attribute: "constitution" },
			},
		},
	],
	tags: [],
});
