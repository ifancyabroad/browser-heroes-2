import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "reassemble",
	name: "Reassemble",
	description: "Pull a shattered form back together and restore a large amount of health.",
	icon: "skills/common/reassemble.png",
	pool: "common",
	kind: "technique",
	category: "heal",
	rarity: "epic",
	maxUses: 1,
	effects: [
		{
			type: "heal",
			target: "self",
			dice: "10d6",
		},
	],
	tags: [],
});
