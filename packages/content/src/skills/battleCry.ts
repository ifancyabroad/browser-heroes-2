import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "battle_cry",
	name: "Battle Cry",
	description: "Amplify your strength with a resounding Battle Cry.",
	icon: "skills/barbarian/battle_cry.png",
	pool: "barbarian",
	category: "buff",
	maxUses: 8,
	effects: [
		{
			type: "modifyStat",
			target: "self",
			stat: "attackRollBonus",
			value: 3,
			durationTurns: 8,
		},
	],
	tags: [],
});
