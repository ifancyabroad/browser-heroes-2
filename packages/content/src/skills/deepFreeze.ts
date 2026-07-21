import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "deep_freeze",
	name: "Deep Freeze",
	description:
		"A concentrated frost spell that encases the target in solid ice, dealing damage and rendering them unable to act.",
	icon: "skills/mage/deep_freeze.png",
	pool: "mage",
	category: "spell",
	maxUses: 2,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "cold",
			dice: "2d12+8",
			attribute: "intelligence",
			requiresAttackRoll: false,
		},
		{
			type: "applyStatus",
			target: "enemy",
			statusId: "stunned",
			durationTurns: 2,
		},
	],
	tags: [],
});
