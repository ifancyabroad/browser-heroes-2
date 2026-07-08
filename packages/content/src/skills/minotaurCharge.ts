import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "minotaur_charge",
	name: "Minotaur Charge",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-O9eSRJIY86RZLdUWrd8?alt=media&token=dd7c5e27-3d52-4755-b538-5c7c5b4bb164",
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
