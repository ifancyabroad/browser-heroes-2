import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "mind_duel",
	name: "Mind Duel",
	description:
		"You and the enemy each make an Intelligence saving throw. On a failed save, that combatant is stunned for 2 turns.",
	icon: "skills/unique/mind_duel.png",
	pool: "unique",
	kind: "spell",
	category: "debuff",
	rarity: "rare",
	maxUses: 2,
	effects: [
		{
			type: "applyStatus",
			target: "enemy",
			statusId: "stunned",
			duration: { unit: "turns", value: 2 },
			save: {
				attribute: "intelligence",
				onSuccess: "noEffect",
				dc: { attribute: "intelligence" },
			},
		},
		{
			type: "applyStatus",
			target: "self",
			statusId: "stunned",
			duration: { unit: "turns", value: 2 },
			save: {
				attribute: "intelligence",
				onSuccess: "noEffect",
				dc: { base: 13, includeProficiency: false },
			},
		},
	],
	tags: [],
});
