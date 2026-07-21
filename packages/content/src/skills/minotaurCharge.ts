import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "minotaur_charge",
	name: "Minotaur Charge",
	icon: "skills/unique/minotaur_charge.png",
	pool: "unique",
	category: "spell",
	maxUses: 1,
	effects: [
		{
			type: "applyStatus",
			target: "enemy",
			statusId: "stunned",
			durationTurns: 1,
		},
		{
			type: "damage",
			target: "enemy",
			damageType: "piercing",
			dice: "1d8+3",
			requiresAttackRoll: false,
			save: {
				attribute: "constitution",
				onSuccess: "noEffect",
				dc: {
					base: 8,
					attribute: "dexterity",
					includeProficiency: true,
					bonus: 0,
				},
			},
		},
	],
	tags: [],
});
