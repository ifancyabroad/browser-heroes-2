import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "spook",
	name: "Spook",
	icon: "skills/common/spook.png",
	pool: "common",
	category: "spell",
	maxUses: 4,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "necrotic",
			dice: "1d6",
			requiresAttackRoll: false,
		},
	],
	tags: [],
});
