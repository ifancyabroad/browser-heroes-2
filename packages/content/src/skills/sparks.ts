import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "sparks",
	name: "Sparks",
	description: "Snap a precise arc of lightning from your fingertips.",
	icon: "skills/wizard/sparks.png",
	pool: "wizard",
	kind: "spellAttack",
	category: "damage",
	rarity: "common",
	maxUses: 20,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "lightning",
			dice: "1d10",
			attribute: "intelligence",
			requiresAttackRoll: true,
		},
	],
	tags: [],
});
