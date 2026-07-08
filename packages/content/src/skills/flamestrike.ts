import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "flamestrike",
	name: "Flamestrike",
	description:
		"Call down a powerful strike of both fire and radiant energy, burning and searing enemies in its path.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NgTX-eKaRJ03i_t4QJ7?alt=media&token=59d4c54f-9da1-4e86-b698-c08912e3582b",
	pool: "cleric",
	category: "spell",
	maxUses: 3,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "fire",
			dice: "1d8+3",
			attribute: "wisdom",
			requiresAttackRoll: false,
		},
		{
			type: "damage",
			target: "enemy",
			damageType: "radiant",
			dice: "1d8+3",
			attribute: "wisdom",
			requiresAttackRoll: false,
		},
	],
	tags: [],
});
