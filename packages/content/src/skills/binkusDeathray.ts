import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "binkus_deathray",
	name: "Binkus' Deathray",
	icon: "skills/unique/binkus_deathray.png",
	pool: "unique",
	kind: "spell",
	category: "damage",
	maxUses: 1,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "necrotic",
			dice: "10d6",
			requiresAttackRoll: false,
		},
		{
			type: "damage",
			target: "enemy",
			damageType: "fire",
			dice: "10d6",
			requiresAttackRoll: false,
		},
	],
	tags: [],
});
