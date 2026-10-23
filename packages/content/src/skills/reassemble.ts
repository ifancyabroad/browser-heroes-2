import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "reassemble",
	name: "Reassemble",
	description: "Restore your HP.",
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
