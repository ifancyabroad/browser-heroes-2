import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "sparks",
	name: "Sparks",
	description: "Snap a precise arc of lightning from your fingertips.",
	icon: "skills/mage/sparks.png",
	pool: "mage",
	kind: "spellAttack",
	category: "damage",
	rarity: "common",
	maxUses: 12,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "lightning",
			dice: "1d8",
			attribute: "intelligence",
			requiresAttackRoll: true,
		},
	],
	tags: [],
});
