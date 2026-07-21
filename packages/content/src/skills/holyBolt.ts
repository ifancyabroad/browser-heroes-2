import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "holy_bolt",
	name: "Holy Bolt",
	description: "Fire a burst of radiant energy that sears enemies with divine power.",
	icon: "skills/cleric/holy_bolt.png",
	pool: "cleric",
	category: "spell",
	maxUses: 12,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "radiant",
			dice: "1d10",
			attribute: "wisdom",
			requiresAttackRoll: false,
		},
	],
	tags: [],
});
