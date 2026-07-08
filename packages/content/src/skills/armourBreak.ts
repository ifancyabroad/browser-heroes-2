import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "armour_break",
	name: "Armour Break",
	description: "A powerful blow that weakens an enemy's defenses.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NZMIV5OGOr4bChwrNEE?alt=media&token=34d14684-6c64-4822-b3e6-36161dedd07a",
	pool: "warrior",
	category: "spell",
	maxUses: 8,
	effects: [
		{
			type: "modifyStat",
			target: "enemy",
			stat: "armourClass",
			operation: "add",
			value: -4,
			durationTurns: 4,
		},
		{
			type: "damage",
			target: "enemy",
			damageType: "crushing",
			dice: "1d8",
			requiresAttackRoll: false,
			save: {
				attribute: "strength",
				onSuccess: "noEffect",
				dc: {
					base: 8,
					attribute: "strength",
					includeProficiency: true,
					bonus: 6,
				},
			},
		},
	],
	tags: [],
});
