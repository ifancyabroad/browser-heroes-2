import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "fire_breath",
	name: "Fire Breath",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-O9ePhvfJJr-bhi0Iial?alt=media&token=e696471d-3bbd-45a5-a596-e9c20de5956f",
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
