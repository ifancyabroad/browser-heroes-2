import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "deep_freeze",
	name: "Deep Freeze",
	description:
		"A concentrated frost spell that encases the target in solid ice, dealing damage and rendering them unable to act.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-Nc43Ea3uk2s6Flfxpga?alt=media&token=595b97e4-435b-4750-a958-e1980de2946f",
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
