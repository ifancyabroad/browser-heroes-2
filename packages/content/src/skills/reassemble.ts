import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "reassemble",
	name: "Reassemble",
	icon: "skills/common/reassemble.png",
	pool: "common",
	kind: "technique",
	category: "heal",
	maxUses: 1,
	effects: [
		{
			type: "heal",
			target: "self",
			dice: "3d12+16",
		},
	],
	tags: [],
});
