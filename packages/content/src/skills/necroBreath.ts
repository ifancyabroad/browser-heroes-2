import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "necro_breath",
	name: "Necro Breath",
	icon: "skills/common/necro_breath.png",
	pool: "common",
	category: "spell",
	maxUses: 2,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "necrotic",
			dice: "3d12+16",
			requiresAttackRoll: false,
		},
	],
	tags: [],
});
