import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "frost_breath",
	name: "Frost Breath",
	icon: "skills/common/frost_breath.png",
	pool: "common",
	category: "spell",
	maxUses: 2,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "cold",
			dice: "3d12+16",
			requiresAttackRoll: false,
		},
	],
	tags: [],
});
