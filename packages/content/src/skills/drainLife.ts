import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "drain_life",
	name: "Drain Life",
	description:
		"Unleash necrotic energy to damage your enemy while siphoning their life force to restore your own health.",
	icon: "skills/occultist/drain_life.png",
	pool: "occultist",
	kind: "spell",
	category: "heal",
	maxUses: 2,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "necrotic",
			dice: "1d10+5",
			attribute: "wisdom",
			requiresAttackRoll: false,
		},
		{
			type: "heal",
			target: "self",
			dice: "1d10+5",
			attribute: "wisdom",
		},
	],
	tags: [],
});
