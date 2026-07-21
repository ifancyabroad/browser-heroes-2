import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "fire_breath",
	name: "Fire Breath",
	icon: "skills/common/fire_breath.png",
	pool: "common",
	category: "spell",
	maxUses: 2,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "fire",
			dice: "3d12+16",
			requiresAttackRoll: false,
		},
	],
	tags: [],
});
