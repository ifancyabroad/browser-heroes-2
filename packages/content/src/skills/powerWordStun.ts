import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "power_word_stun",
	name: "Power Word: Stun",
	description:
		"Utter a commanding word that has a chance to stun your enemy, leaving them momentarily helpless.",
	icon: "skills/occultist/power_word_stun.png",
	pool: "occultist",
	kind: "spell",
	category: "debuff",
	maxUses: 2,
	effects: [
		{
			type: "applyStatus",
			target: "enemy",
			statusId: "stunned",
			durationTurns: 2,
		},
	],
	tags: [],
});
