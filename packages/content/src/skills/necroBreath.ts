import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "necro_breath",
	name: "Necro Breath",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OCFAqXAhK7qK26RFFWx?alt=media&token=fd22e91b-e0b6-48a3-866c-72b3668c03b1",
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
