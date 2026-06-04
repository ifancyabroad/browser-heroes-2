import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "cleric",
	description:
		"Call down a powerful strike of both fire and radiant energy, burning and searing enemies in its path.",
	effects: [
		{
			damageType: "fire",
			max: 10,
			min: 4,
			modifier: "wisdom",
			target: "enemy",
			type: "damage",
		},
		{
			damageType: "radiant",
			max: 10,
			min: 4,
			modifier: "wisdom",
			target: "enemy",
			type: "damage",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NgTX-eKaRJ03i_t4QJ7?alt=media&token=59d4c54f-9da1-4e86-b698-c08912e3582b",
	level: 3,
	maxUses: 3,
	name: "Flamestrike",
	price: 0,
	id: "flamestrike",
});
