import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "sparks",
	name: "Sparks",
	description: "Shoot lightning from your fingers.",
	icon: "skills/mage/sparks.png",
	pool: "mage",
	kind: "spell",
	category: "damage",
	maxUses: 12,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "lightning",
			dice: "1d8",
			attribute: "intelligence",
			requiresAttackRoll: false,
		},
	],
	tags: [],
});
