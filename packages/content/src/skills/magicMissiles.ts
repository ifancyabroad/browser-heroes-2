import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "magic_missiles",
	name: "Magic Missiles",
	description: "Summon three piercing projectiles to launch at the enemy.",
	icon: "skills/mage/magic_missiles.png",
	pool: "mage",
	kind: "spell",
	category: "damage",
	maxUses: 7,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "piercing",
			dice: "1d6",
			attribute: "intelligence",
			requiresAttackRoll: false,
		},
		{
			type: "damage",
			target: "enemy",
			damageType: "piercing",
			dice: "1d6",
			attribute: "intelligence",
			requiresAttackRoll: false,
		},
		{
			type: "damage",
			target: "enemy",
			damageType: "piercing",
			dice: "1d6",
			attribute: "intelligence",
			requiresAttackRoll: false,
		},
	],
	tags: [],
});
