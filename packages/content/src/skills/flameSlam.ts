import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "flame_slam",
	name: "Flame Slam",
	icon: "skills/common/flame_slam.png",
	pool: "common",
	category: "spell",
	maxUses: 4,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "crushing",
			dice: "2d12+8",
			requiresAttackRoll: false,
		},
		{
			type: "damage",
			target: "enemy",
			damageType: "fire",
			dice: "2d12+8",
			requiresAttackRoll: false,
		},
	],
	tags: [],
});
