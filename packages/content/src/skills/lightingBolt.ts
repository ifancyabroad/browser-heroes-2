import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "lighting_bolt",
	name: "Lighting Bolt",
	description: "Conjure a lightning bolt.",
	icon: "skills/mage/lighting_bolt.png",
	pool: "mage",
	kind: "spell",
	category: "damage",
	maxUses: 7,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "lightning",
			dice: "1d10+5",
			attribute: "intelligence",
			requiresAttackRoll: false,
		},
	],
	tags: [],
});
