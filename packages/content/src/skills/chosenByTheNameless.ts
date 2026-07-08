import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "chosen_by_the_nameless",
	name: "Chosen by the Nameless",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OCIzZAWoMILIUtWYjFz?alt=media&token=f1801eb6-8e78-4236-8901-428e63164c4e",
	pool: "unique",
	category: "buff",
	maxUses: 1,
	effects: [
		{
			type: "modifyStat",
			target: "self",
			stat: "wisdom",
			operation: "add",
			value: 8,
			durationTurns: 6,
		},
		{
			type: "modifyStat",
			target: "self",
			stat: "constitution",
			operation: "add",
			value: 8,
			durationTurns: 6,
		},
	],
	tags: [],
});
