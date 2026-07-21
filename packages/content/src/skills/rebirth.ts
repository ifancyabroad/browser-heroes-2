import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "rebirth",
	name: "Rebirth",
	icon: "skills/unique/rebirth.png",
	pool: "unique",
	category: "heal",
	maxUses: 1,
	effects: [
		{
			type: "heal",
			target: "self",
			dice: "25d6+13",
		},
	],
	tags: [],
});
