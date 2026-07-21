import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "regeneration",
	name: "Regeneration",
	icon: "skills/common/regeneration.png",
	pool: "common",
	category: "heal",
	maxUses: 2,
	effects: [
		{
			type: "heal",
			target: "self",
			dice: "1d8+3",
		},
	],
	tags: [],
});
